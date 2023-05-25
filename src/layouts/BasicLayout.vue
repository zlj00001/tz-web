<template>
  <div id="content">
    <router-view/>
  </div>
  <NavBar v-if="$store.state.common.showNav"/>
</template>

<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import {useStore} from "vuex";
const store = useStore();
</script>

<style scoped>

</style>
