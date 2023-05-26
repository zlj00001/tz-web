<template>

  <van-tabbar v-model="active">
    <van-tabbar-item name="/messageList" to="/messageList" icon="chat-o">消息</van-tabbar-item>
    <van-tabbar-item name="/home" to="/home" icon="wap-home-o">找同道</van-tabbar-item>
    <van-tabbar-item name="/team" to="/team" icon="apps-o">队伍</van-tabbar-item>
    <van-tabbar-item name="/user" to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import {showToast} from "vant";
import {useRouter,useRoute} from "vue-router";
import tim from "../plugins/tim";

const active = ref('');
const router = useRouter();
const route = useRoute();


watchEffect(()=>{
  active.value = route.path
})

</script>

<style scoped></style>