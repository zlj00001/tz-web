<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="消息" left-arrow>
    </van-nav-bar>
    <div v-for="(cvs,index) in cList" :key="index" @click="toChatView(cvs.userProfile.userID)">
      <div class="conversation" >
          <van-badge :content="cvs.unreadCount" :show-zero="false">
            <div class="child">
              <img :src="cvs.userProfile.avatar">
            </div>
          </van-badge>
          &nbsp;&nbsp;
          <div class="name-chatMsg">
            <div class="conversation-name">{{cvs.userProfile.nick}}</div>
            <div class="conversation-content">{{ cvs.lastMessage.messageForShow}}</div>
          </div>
          <div class="conversation-time">
            {{timestampToTime(cvs.lastMessage.lastTime)}}
          </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {genTestUserSig} from "../debug";
import tim from "../plugins/tim";
import store from "../store";
import myAxios from "../plugins/myAxios";
import TIM from "tim-js-sdk";

const route = useRoute();
const userId = ref();
userId.value = route.query.userAccount;
const cList = ref();
const router = useRouter();
const onClickLeft = () => history.back();

const  timestampToTime = (timestamp:number)=> {
  // 时间戳为10位需*1000，时间戳为13位不需乘1000
  const date = new Date(timestamp * 1000);
  const h = date.getHours() + ":";
  const m = date.getMinutes() + ":";
  return h + m;
}

const pullConversationList = () =>{
  // 获取全量的会话列表
  let promise = tim.getConversationList();
  promise.then(function (imResponse) {
    const conversationList = imResponse.data.conversationList; // 全量的会话列表，用该列表覆盖原有的会话列表
    const isSyncCompleted = imResponse.data.isSyncCompleted; // 从云端同步会话列表是否完成
    console.log('全量的会话列表', conversationList)
    cList.value = conversationList;
  }).catch(function (imError) {
    console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
  });
}

let onTotalUnreadMessageCountUpdated = function(event:any) {
  console.log(event.data); // 当前单聊和群聊会话的未读总数
  pullConversationList();
};
tim.on(TIM.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED, onTotalUnreadMessageCountUpdated);


const toChatView = async (userID:string) =>{
  const toUser = await myAxios.get("/user/list",{
    params:{
      userAccount:userID,
    }
  })
  if(toUser.data.code === 0){
    console.log('用户id是',toUser.data.data)
    await router.push({
      path:"/user/chat",
      query:{
        id:toUser.data.data[0].id,
      }
    })
  }
}

onUnmounted(()=>{
  store.commit('updateNav',true);
})
onMounted(async () => {
  store.commit('updateNav',false);
  // 如果想使用发送消息等功能，接入侧需驱动 SDK 进入 ready 状态，重新调用 login 接口即可，如下所示：
  const usig = genTestUserSig({
    SDKAppID: 1400811433, secretKey: "a47d5c07b8c677f010fc32aa2c2c4b33cfd56ee43c1209424aeeba01697f05c3"
    , userID: userId.value
  });
  await tim.login({userID: userId.value, userSig: usig.userSig});
  setTimeout(() => {
    pullConversationList();
  }, 500);
})
</script>

<style scoped>
.conversation{
  display: flex;
  height: 10vh;
  margin: 2vh 0;
  padding: 0 2vw;
}
.child{
  width: 8vh;
  height: 8vh;
  background: #f2f3f5;
  border-radius: 4px;
  overflow: hidden;
}
.child img{
  height: 100%;
  width: 100%;
}
.conversation-name{
  padding-top: 1vw;
}
.conversation-content{
  padding-top: 1vw;
  font-size: 3vw;
  color: #afadad;
}
.conversation-time{
  margin-left: auto;
  padding-right: 1vw;
  font-size: 3vw;
  color: #afadad;

}
</style>