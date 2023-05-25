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
import {showToast} from "vant";
import {onMounted, onUnmounted, ref} from "vue";
import store from "../store";
onMounted(()=>{
  store.commit('updateNav',false);
})
onUnmounted(()=>{
  store.commit('updateNav',true);
})

const username = ref('');

const onClickLeft = () => history.back();
const onClickRight = () => showToast('按钮');

</script>
<style scoped>

</style>
