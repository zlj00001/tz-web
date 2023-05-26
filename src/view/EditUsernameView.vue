<template>
  <van-nav-bar
      title="更改昵称"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />

  <!-- 可以使用 CellGroup 作为容器 -->
  <van-cell-group inset>
    <van-field v-model="username"  placeholder="请输入昵称" />
  </van-cell-group>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import store from "../store";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
const route = useRoute();
const username = ref();

onMounted(()=>{
  username.value = route.query.username;
  store.commit('updateNav',false);
})
onUnmounted(()=>{
  store.commit('updateNav',true);
})


const onClickLeft = () => history.back();
const onClickRight = async () => {
  if(username.value != null && username.value.length > 0){
    const res = await myAxios.post("/user/update/my",{
      username:username.value
    });
    if(res.data.code === 0){
      onClickLeft();
    }
  }
};

</script>
<style scoped>

</style>
