<template>
  <div ref="chatContainer">
    <van-nav-bar
        :title="chatObj.username"
        left-arrow
        @click-left="onClickLeft"
        fixed

    />

    <div class="main-chat" ref="chatList">
      <div class="record-wrapper" v-for="msg in msgList" :key="msg.ID">
        <div class="time"></div>
        <div v-if="msg.from === me.userAccount" class="msg msg-right">
          <div class="img-wrapper">
            <img class="img" :src="msg.avatar"/>
          </div>
          <div class="message-wrapper message-wrapper-right">
            <div class="message">{{ msg.payload.text }}</div>
          </div>
        </div>

        <div v-else class="msg msg-left">
          <div class="img-wrapper">
            <img class="img" :src="msg.avatar"/>
          </div>
          <div class="message-wrapper message-wrapper-left">
            <div class="message">{{ msg.payload.text }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="inp_warp">
      <input
          class="inp"
          @focus="foucs"
          v-model="sendVal"
          v-on:keyup.enter="send"
          type="text"
      />
      <van-icon class="icon_inp" size="24px" color="#9a9a9a" name="smile-o"/>
      <van-icon v-if="sendVal == null || sendVal.length === 0" class="icon_inp" size="24px" color="#9a9a9a"
                name="add-o"/>
      <van-button v-else @click="sendMessage" type="primary">发送</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, onMounted, onUnmounted, ref} from "vue";
import store from "../store";
import TIM from "tim-js-sdk";
import tim from "../plugins/tim";
import myAxios from "../plugins/myAxios";
import {useRoute} from "vue-router";
import {genTestUserSig} from "../debug";

const initUser = {
  "createTime": '',
  "gender": null,
  "id": '',
  "tags": null,
  "updateTime": '',
  "userAccount": '',
  "userAvatar": '',
  "userRole": '',
  "username": ''
}
const from = ref(1);
const chatList = ref(null);
const chatContainer = ref(null);

const route = useRoute();
const toId = route.query.id;
const chatObj = ref({...initUser});
const me = ref({...initUser});
const msgList = ref([]);
const sendVal = ref('');

const sendMessage = () => {
  let message = tim.createTextMessage({
    to: chatObj.value.userAccount,
    conversationType: TIM.TYPES.CONV_C2C,
    payload: {
      text: sendVal.value
    },
    needReadReceipt: true
  });
  // 2. 发送消息
  let promise = tim.sendMessage(message);
  promise.then((imResponse) => {
    // 发送成功
    console.log(imResponse);
    msgList.value.push(imResponse.data.message);
    sendVal.value = "";
  }).catch((imError) => {
    // 发送失败
    console.warn('sendMessage error:', imError);
  });

}

let onMessageReceived = function (event: any) {
  // event.data - 存储 Message 对象的数组 - [Message]
  const messageList = event.data;
  messageList.forEach((message: any) => {
    if (message.type === TIM.TYPES.MSG_TEXT) {
      console.log('接收消息', message);

      msgList.value.push(message);
      // 文本消息 - https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html#.TextPayload
    }
  });
};
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);

function scrollToBottom() {
  if (chatList.value && chatContainer.value) {
    chatContainer.value.scrollTop = chatList.value.scrollHeight;
  }
};

onMounted(async () => {
  const loginUser = await myAxios.get("/user/get/login");
  if (loginUser.data.code === 0) {
    // console.log(loginUser.data.data,toId);
    me.value = loginUser.data.data;
    // console.log('我的资料',me.value)
  }

  const resObj = await myAxios.get("/user/list", {
    params: {
      id: toId,
    }
  });
  if (resObj.data.code === 0 && resObj.data.data.length > 0) {
    chatObj.value = resObj.data.data[0];
    console.log(chatObj.value);
  }

  const usig = await genTestUserSig({
    SDKAppID: 1400811433, secretKey: "a47d5c07b8c677f010fc32aa2c2c4b33cfd56ee43c1209424aeeba01697f05c3"
    , userID: me.value.userAccount
  });
  await tim.login({userID: me.value.userAccount, userSig: usig.userSig});

  setTimeout(() => {
    // 打开某个会话时，第一次拉取消息列表
    let promise = tim.getMessageList({conversationID: "C2C" + chatObj.value.userAccount});
    promise.then(function (imResponse: any) {
      console.log(chatObj.value.userAccount);
      const messageList = imResponse.data.messageList; // 消息列表。
      console.log('消息列表', messageList);
      msgList.value = messageList;
      const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
      const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。

      // 将某会话下所有未读消息已读上报
      let promiseRead = tim.setMessageRead({conversationID: "C2C" + chatObj.value.userAccount});
      promiseRead.then(function(imResponse) {
        // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
        console.log("已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0");
      }).catch(function(imError) {
        // 已读上报失败
        console.warn('setMessageRead error:', imError);
      });
    });

    scrollToBottom();
  }, 500);

})


const onClickLeft = () => history.back();
onMounted(() => {
  store.commit('updateNav', false);
})
onUnmounted(() => {
  store.commit('updateNav', true);
})
</script>

<style lang="scss" scoped>
.inp_warp {
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
}

.inp_warp {
  height: 5vh;
  padding: 1vh 0;
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  width: 100%;
  left: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.icon_inp {
  margin: 0px 20px;
}

.inp {
  border: none;
  margin-left: 20px;
  background-color: #ededed;
  //padding: 22px 20px;
  padding-left: 3vw;
  border-radius: 10px;
  width: 66%;
  height: 5vh;
}

.main-chat {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  //position: relative;
  margin: 8vh 0px;
}

.record-wrapper {
  margin: 4px;
  padding: 4px;
}

.time {
  text-align: center;
}

.msg {
  display: flex;
  flex-direction: row;

  .message-wrapper {
    max-width: 220px;

    margin: 0px 10px 0px 10px;

    .message {
      margin: 8px;
      word-wrap: break-word; //英文换行
    }
  }

  .message-wrapper-left {
    background-color: lightslategray;
    border-radius: 0px 12px 12px 12px;
  }

  .message-wrapper-right {
    background-color: powderblue;
    border-radius: 12px 0px 12px 12px;
  }

  .img {
    flex: auto;
    height: 36px;
    width: 36px;
    border-radius: 8px;
  }
}

.msg-right {
  flex-direction: row-reverse;
}

.msg-left {
  flex-direction: row;
}
</style>