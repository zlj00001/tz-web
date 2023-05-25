<template>
  <van-nav-bar @click-left="onClickLeft" title="我创建的队伍" left-arrow/>

  <TeamCardList :teamList="teamList"></TeamCardList>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import TeamCardList from "../components/TeamCardList.vue";
import {TeamType} from "../models/team";

const onClickLeft = () => history.back();
const teamList = ref<any>([]);

const listTeam = async (status:number)=>{
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      status: status,
    },
  });
  if (res?.data.code === 0) {
    // teamList.value = res.data.data;
    for(let i = 0; i < res.data.data.length; i++){
      teamList.value.push(res.data.data[i]);
    }

    // console.log(teamList.value);
  }
}

onMounted(async () => {
  await listTeam(0);
  await listTeam(1);
  await listTeam(2);
})


</script>
<style scoped>


</style>
