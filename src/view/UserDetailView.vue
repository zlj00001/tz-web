<template>
  <div>
    <van-nav-bar @click-left="onClickLeft" title="用户详情" left-arrow>
      <template #right>
        <van-icon name="chat-o" size="2em" @click="toChat" />
      </template>
    </van-nav-bar>

    <van-row>
      <van-col span="8"></van-col>
      <van-col span="8">
        <van-image
            round
            width="8rem"
            height="8rem"
            fit="cover"
            position="center"
            :src="user.userAvatar"
        />
      </van-col>
      <van-col span="8"></van-col>
    </van-row>


    <van-cell-group>
      <van-cell title="账号" icon="flag-o" :value="user.userAccount" />
      <van-cell title="昵称" icon="flag-o" :value="user.username"/>
      <van-cell title="性别" icon="flag-o" v-if="user.gender == 0" value="男" />
      <van-cell title="性别" icon="flag-o" v-else-if="user.gender == 1" value="女" />
      <van-cell title="性别" icon="flag-o" v-else value="保密" />

      <van-cell title="注册时间" icon="flag-o" :value="JSON.stringify(user.createTime)" />
    </van-cell-group>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="标签" name="1">
        <van-space wrap>
          <van-tag v-for="tag in JSON.parse(user.tags)" size="medium"  type="primary" >
            {{tag}}
          </van-tag>
        </van-space>
      </van-collapse-item>
    </van-collapse>

  </div>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import tim from "../plugins/tim";
import {genTestUserSig} from "../debug";

const initUser = {
  "createTime": '',
  "gender": null,
  "id": '',
  "tags": null,
  "updateTime": '',
  "userAccount": '',
  "userAvatar": '',
  "userRole": '',
  "username": ''
}

const onClickLeft = () => history.back();
const route = useRoute();
const id = route.query.id;
const user = ref({...initUser});
const router = useRouter();
const activeNames = ref(['1']);

onMounted(async () => {
  const getUserById = await myAxios.get("/user/list",{
    params:{
      id: id,
    }
  });
  if(getUserById.data.code === 0){
    if(getUserById.data.data.length > 0){
      user.value = getUserById.data.data[0];
    }
  }
})


const toChat = () => {
  router.push({
    path:"/user/chat",
    query:{
      id
    }
  })
}

</script>
<style scoped>

</style>
