<template>
  <div style="margin-bottom: 10vh">

    <div v-for="item in props.userList">
      <van-card v-for="user in item"
                :desc="user.description"
                :title="user.username"
                :thumb="user.userAvatar"
      >
        <template #tags>
          <van-space wrap>
<!--            <van-tag plain type="primary">{{ user.tags }}</van-tag>-->
            <van-tag v-for="tag in JSON.parse(user.tags)" size="medium"  type="primary" >
              {{tag}}
            </van-tag>
          </van-space>
        </template>
        <template #footer>
          <van-button size="mini" @click="toUserDetail(user.id)">联系我</van-button>
        </template>
      </van-card>
    </div>

  </div>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";
import {onMounted} from "vue";
import {useRouter} from "vue-router";


const router = useRouter();
interface UserCardListProps {
  userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  // @ts-ignore
  userList: [] as UserType[],
});

const toUserDetail = (id:number) => {
  router.push({
    path:"/user/detail",
    query:{
      id:id
    }
  })
}

</script>

<style scoped>

</style>