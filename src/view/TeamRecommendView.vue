<template>
  <van-nav-bar @click-left="onClickLeft" title="推荐队伍" left-arrow>
  </van-nav-bar>

  <van-tabs v-model:active="active" >
    <van-tab title="公开队伍">
      <TeamCardList :teamList="publicTeams"></TeamCardList>
    </van-tab>
    <van-tab title="加密队伍">
      <TeamCardList :teamList="privateTeams"></TeamCardList>
    </van-tab>
  </van-tabs>


</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import TeamCardList from "../components/TeamCardList.vue";
import {useRoute, useRouter} from "vue-router";

const onClickLeft = ()=>{
  history.back();
}
const active = ref(0);
const publicTeams = ref<any>([]);
const privateTeams = ref<any>([]);
const router = useRouter();
const route = useRoute();

// const clickPublic = ()=>{
//   router.push({
//     path: route.path,
//     query: {
//       active: active.value,
//     }
//   })
// }


onMounted(async ()=>{
  const publicTeamRes = await myAxios.get("/team/list");
  if(publicTeamRes.data.code === 0){
    for(let i = 0; i < publicTeamRes.data.data.length; i++){
      publicTeams.value.push(publicTeamRes.data.data[i]);
    }
    // console.log(publicTeamRes.data.data)
  }

  const privateTeamRes = await myAxios.get("/team/list",{
    params:{
      status:2,
    }
  });
  if(privateTeamRes.data.code === 0){
    for(let i = 0; i < privateTeamRes.data.data.length; i++){
      privateTeams.value.push(privateTeamRes.data.data[i]);
    }
  }
})
</script>
<style scoped>

</style>
