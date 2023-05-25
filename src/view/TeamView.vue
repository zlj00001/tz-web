<template>
  <van-nav-bar title="队伍" left-arrow>
  </van-nav-bar>
  <TeamNav></TeamNav>

</template>

<script setup lang="ts">
import TeamNav from "../components/TeamNav.vue";
import {ref} from "vue";

const activeName = ref('b');
const list = ref([]);
const loading = ref(false);
const finished = ref(true);

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
};
</script>
<style scoped>
.msg-title{
  font-size: large;
  font-weight: bold;
}

</style>
