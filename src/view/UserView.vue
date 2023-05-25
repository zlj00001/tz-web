<template>
  <van-nav-bar title="个人信息" left-arrow>
    <template #right>
      <van-icon name="envelop-o" size="2em" @click="toChatList" />
    </template>
  </van-nav-bar>
  <van-cell-group>
    <van-cell title="头像" is-link value="内容" >
      <img style="height: 10vh" :src="user.userAvatar">
    </van-cell>
    <van-cell title="账号" is-link :value="user.userAccount" />
    <van-cell title="昵称" is-link to="/user/edit/name" :value="user.username"/>
    <van-cell title="性别" is-link v-if="user.gender == 0" value="男" />
    <van-cell title="性别" is-link v-else-if="user.gender == 1" value="女" />
    <van-cell title="性别" is-link v-else value="保密" />

    <van-cell title="注册时间" is-link :value="JSON.stringify(user.createTime)" />
  </van-cell-group>
  <van-collapse v-model="activeNames">
    <van-collapse-item title="标签" name="1">
      <van-space wrap @click="updateTag()">
        <van-tag v-for="tag in user.tags" size="medium"  type="primary" >
          {{tag}}
        </van-tag>
      </van-space>
    </van-collapse-item>
  </van-collapse>

  <van-button type="primary" block @click="logout" v-if="user != null && user.id > 0">退出登录</van-button>
  <van-button type="primary" block @click="login" v-else >登录</van-button>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUserState} from "../states/user";
import myAxios from "../plugins/myAxios";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

const router = useRouter();
const activeNames = ref(['1']);
const user = ref();
const tmp = {
  "createTime": '',
  "gender": null,
  "id": '',
  "tags": '',
  "updateTime": '',
  "userAccount": '',
  "userAvatar": '',
  "userRole": '',
  "username": ''
}
user.value = tmp;
const updateTag = ()=>{

}

const toChatList = () =>{
  router.push({
    path:'/user/chatList',
    query:{
      userAccount: user.value.userAccount,
    }
  })
}

onMounted(async ()=>{
  user.value = await getCurrentUser();
  user.value.tags = JSON.parse(user.value.tags);
})

const login = ()=>{
  const redirectUrl = window.location.href;
  window.location.href = `/user/login?redirect=${redirectUrl}`
}

const logout = async () =>{
  const res = await myAxios.post('/user/logout');
  location.reload();
  console.log(res)
}
</script>
<style scoped>

</style>
