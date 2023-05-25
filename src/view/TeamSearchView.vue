<template>
  <form action="/">
    <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索标签"
        @click-left-icon="onSearch"
        @cancel="onCancel"
        @click="clickSearch"
    />
  </form>
  <div v-if="!isSearch">
    <TeamCardList :teamList="teamList"></TeamCardList>
  </div>

</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import { useRouter } from 'vue-router';
import store from "../store";
import myAxios from "../plugins/myAxios";
import TeamCardList from "../components/TeamCardList.vue";


const value = ref('');
const isSearch = ref(true);
const teamList:any = ref([]);
const onSearch =async () => {
  if (value.value == null || value.value == ""){
    console.log("搜索内容为空")
  }else{
    const searchRes = await myAxios.get("/team/list",{
      params:{
        searchText:value.value,
      }
    });
    console.log(searchRes.data)
    if(searchRes.data.code === 0){
      console.log(searchRes.data.code)
      teamList.value = [];
      for(let i = 0; i < searchRes.data.data.length; i++){
        teamList.value.push(searchRes.data.data[i]);
      }
    }
    isSearch.value = false;
  }

};
const onCancel = () => history.back();
const router = useRouter();
const clickSearch = ()=>{
  isSearch.value = true;
}

onMounted(()=>{
  store.commit('updateNav',false);
})
onUnmounted(()=>{
  store.commit('updateNav',true);
})

</script>
<style scoped>

</style>
