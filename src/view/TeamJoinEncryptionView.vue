<template>
  <van-nav-bar @click-left="onclickLeft" title="加入队伍" left-arrow>
  </van-nav-bar>

  <van-cell-group inset>
    <!-- 输入密码 -->
    <van-field v-model="password" placeholder="请输入队伍密码" type="password" label="密码" />
  </van-cell-group>
  <div>{{errorMessage}}</div>
  <van-button type="primary" round block @click="joinTeam">加入队伍</van-button>

</template>

<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {useRoute} from "vue-router";

const route = useRoute();
const password = ref('');
const id = route.query.id;
const errorMessage = ref('');
const joinTeam = async () => {
  const res = await myAxios.post("/team/join",{
    "id": id,
    "teamPassword": password.value,
  });
  if(res.data.code === 0){
    if(res.data.data === true){
      onclickLeft();
    }else{
      errorMessage.value = "加入失败！";
    }
  }else{
    errorMessage.value = res.data.message;
  }
}
const onclickLeft = () => history.back();


</script>
<style scoped>

</style>
