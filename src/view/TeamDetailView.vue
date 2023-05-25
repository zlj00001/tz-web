<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="队伍详情" left-arrow>
    </van-nav-bar>

    <van-row>
      <van-col span="8"></van-col>
      <van-col span="8">
        <van-image
            round
            width="8rem"
            height="8rem"
            fit="cover"
            position="center"
            :src="userDetail.userAvatar"
        />
      </van-col>
      <van-col span="8"></van-col>
    </van-row>

    <van-cell title="队伍名" icon="flag-o" :value="teamDetail.teamName"/>
    <van-cell title="队长" icon="manager-o" :value="userDetail.username"/>
    <van-cell title="队伍描述" icon="coupon-o" :value="teamDetail.teamDescription"/>
    <van-cell title="队伍状态" icon="shield-o">
      <template #value>
        <van-tag color="#ffe1e1" text-color="#ad0000">{{ teamStatusEnum[teamDetail.teamStatus] }}</van-tag>
      </template>
    </van-cell>

    <van-cell title="队伍人数" icon="friends-o">
      <template #value>
        {{ `${joinNum}/${teamDetail.maxNum}` }}
      </template>
    </van-cell>
    <van-cell title="过期时间" icon="underway-o" :value="teamDetail.expireTime"/>
    <van-button v-if="teamDetail.hasJoin" type="primary" round block @click="quitTeam">退出队伍</van-button>
    <van-button v-else type="primary" round block @click="joinTeam">加入队伍</van-button>
    <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      队伍成员
    </van-divider>
    <UserCardList :userList="teamUserList"></UserCardList>
  </div>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {teamStatusEnum} from "../constants/team";
import UserCardList from "../components/UserCardList.vue";
import {showConfirmDialog, showToast} from "vant";

const initUser = {
  userAvatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  username: "",
  userId: 0
}
const initFormData = {
  "expireTime": null,
  "maxNum": 3,
  "teamDescription": "",
  "teamName": "",
  "teamPassword": "",
  "teamStatus": 0,
  "hasJoin":false
}
const onClickLeft = () => history.back();
const route = useRoute();
const id = route.query.id;
const teamDetail:any = ref({...initFormData});
const userDetail = ref({...initUser});
const teamUserList:any = ref([]);
const joinNum = route.query.hasJoinNum;
const loginUser:any = ref({...initUser});
const router = useRouter();

onMounted(async () => {
  const res = await myAxios.get("/team/list", {
    params: {
      id: id,
    }
  });
  if (res.data.code === 0 && res.data.data.length > 0) {
    teamDetail.value = res.data.data[0];
    console.log(teamDetail.value);
  }

  if (teamDetail.value != null) {
    const user = await myAxios.get("/user/list", {
      params: {
        id: teamDetail.value.userId,
      }
    });
    if (user.data.code === 0) {
      userDetail.value = user.data.data[0];
      // console.log(userDetail.value);
    }
  }

  const getLoginUser = await myAxios.get("/user/get/login");
  if(getLoginUser.data.code === 0){
    loginUser.value = getLoginUser.data.data;
    // console.log(loginUser.value)
  }

  const userList = await myAxios.get("/userTeam/getUserListByTeamId",{
    params:{
      id:id,
    }
  })

  if(userList.data.code === 0){
    teamUserList.value.push(userList.data.data);
  }

})

const joinTeam = async () =>{
  if(teamDetail.value.teamStatus === 2){
    await router.push({
      path:"/team/joinEncryption",
      query:{
        id:id,
      }
    })
  }else{
    const joinRes = await myAxios.post("/team/join",{
      "id": id,
    });
    if(joinRes.data.code === 0){
      if(joinRes.data.data === true){
        console.log('加入成功！');
      }else{
        console.log('加入失败！');
      }
    }else{
      console.log(joinRes.data.message);
    }
  }
  teamDetail.value.hasJoin = true;
}

const quitTeam = () =>{
  showConfirmDialog({
    title: '退出队伍',
    message:
        '生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多\n\n是否确定退出队伍?',
  })
      .then(async () => {
        // on confirm
        const quitRes = await myAxios.post("/team/quit",{
          id:id,
        })
        if(quitRes.data.code === 0){
          teamDetail.value.hasJoin = false;
        }
      })
      .catch(() => {
        // on cancel
      });
}
</script>
<style scoped>

</style>
