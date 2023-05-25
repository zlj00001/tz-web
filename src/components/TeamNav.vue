<template>
  <h2></h2>
  <van-grid clickable :column-num="2">
    <van-grid-item icon="friends-o" text="我加入的队伍" to="/team/myJoin" />
    <van-grid-item icon="add-o" text="我创建的队伍" to="/team/myCreate" />
    <van-grid-item icon="fire-o" text="推荐队伍" to="/team/recommend" />
    <van-grid-item icon="search" text="搜索队伍" to="/team/teamSearch" />
  </van-grid>

  <div style="margin-bottom: 16px" />
  <van-button class="add-button" icon="plus" type="primary" @click="teamAdd" ></van-button>


</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const teamAdd = ()=>{
  router.push({
    path: "/team/add"
  })
}

</script>

<style scoped>
.add-button {
  position: fixed;
  bottom: 60px;
  width: 50px;
  right: 12px;
  height: 50px;
  border-radius: 50%;
}


</style>