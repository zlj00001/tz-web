<template>
  <van-nav-bar title="推荐" left-arrow fixed>
    <template #right>
      <van-icon name="search" size="18"  @click="toSearch"/>
    </template>
  </van-nav-bar>
<div style="height: 8vh"></div>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >

      <UserCardList :userList="list"></UserCardList>
    </van-list>
  </van-pull-refresh>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {stringify} from "qs";
import UserCardList from "../components/UserCardList.vue";
import {setCurrentUserState} from "../states/user";

const router = useRouter();
const store = useStore();
const currentPage =ref(1);
const totalPage = ref(1);
const data = ref();
const list:any = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const toSearch = () => {
  // store.commit('updateNav');
  router.push({
    path:'/search'
  })
}

const refreshPage = async ()=>{
  const res = await myAxios.get("/user/page/list",{
    params:{
      pageSize: 10,
      current: currentPage.value,
    }
  });
  data.value = res.data.data.records;
  totalPage.value = res.data.data.total;
  list.value.push(res.data.data.records)
}
onMounted( async ()=>{
  await refreshPage();
})

const onLoad = () => {
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }
  currentPage.value = currentPage.value + 1;
  currentPage.value = parseInt(JSON.stringify(Math.random() * (totalPage.value / 10) + 1));
  // console.log(parseInt(JSON.stringify(Math.random() * (totalPage.value) + 1)));
  refreshPage();
  loading.value = false;
  finished.value = true;
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

// const onLoad = () => {
//   // 异步更新数据
//   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
//   console.log("onload");
//   currentPage.value = currentPage.value + 1;
//   refreshPage();
// };
</script>
<style scoped>

</style>
