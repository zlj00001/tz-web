<template>
  <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="userAccount"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <router-link to="/user/register" style="padding-left: 3vw;font-size: 2vh">没有账号？去注册</router-link>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {UserLoginType} from "../models/user";
import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user";
import {useRouter, useRoute} from "vue-router";
import store from "../store";
import tim from "../plugins/tim";
import {genTestUserSig} from "../debug";


const onClickLeft = () => history.back();
const username = ref('');
const password = ref('');
const route = useRoute();
const router = useRouter();


const userID = ref(''); // User ID

const onSubmit = async (values: UserLoginType) => {
  const res = await myAxios.post('/user/login', {
    ...values
  });

  if (res.data.code === 0) {
    setCurrentUserState(res.data.data);
    // 跳转到之前的页面
    // const redirectUrl = route.query?.redirect as string ?? '/';

    userID.value = res.data.data.username;
    store.commit('updateUserID',userID.value);
    await router.push({
      path:"/home",
    })
    // window.location.href = redirectUrl;
  }
  console.log(res)

};

onMounted(() => {
  store.commit('updateNav', false);
})
onUnmounted(() => {
  store.commit('updateNav', true);
})
</script>
<style scoped>

</style>
