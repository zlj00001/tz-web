<template>
  <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="userAccount"
          label="用户账户"
          placeholder="用户账户"
          :rules="[{ required: true, message: '请填写用户账户' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="再次填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
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
import {showNotify} from "vant";
import {useRoute} from "vue-router";
import store from "../store";

const onClickLeft = () => history.back();
const username = ref('');
const password = ref('');
const checkPassword = ref('');
const route = useRoute();
const onSubmit = async (values:UserLoginType) => {
  const res = await myAxios.post('/user/register',{
    ...values
  });
  if(res.data.code == 0){
    setCurrentUserState(res.data.data);
    showNotify({ type: 'success', message: '注册成功' });
    window.location.href = "/user/login";
  }else{
    showNotify({ type: 'warning', message: '注册失败' });
  }
  console.log(res);
};

onMounted(()=>{
  store.commit('updateNav',false);
})
onUnmounted(()=>{
  store.commit('updateNav',true);
})
</script>
<style scoped>

</style>
