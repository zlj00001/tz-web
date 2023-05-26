<template>
  <div id="content">
    <router-view/>
  </div>
  <NavBar v-if="$store.state.common.showNav"/>
</template>

<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import myAxios from "../plugins/myAxios";
import {onMounted} from "vue";
import store from "../store";

onMounted(async ()=>{
  const res = await myAxios.get("/user/get/login");
  if(res.data.code === 0){
    store.commit('updateUserId',res.data.data.userAccount);
  }
})
</script>

<style scoped>

</style>
