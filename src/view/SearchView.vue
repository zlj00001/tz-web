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
  <div v-if="isSearch">
    <h5>
      推荐标签
    </h5>
    <van-space wrap>
      <van-tag v-for="tag in tags" size="medium"  type="primary" @click="select(tag)">
        {{tag}}
      </van-tag>
    </van-space>
  </div>
  <div v-else>
    <UserCardList :userList="userList"></UserCardList>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import { useRouter } from 'vue-router';
import store from "../store";
import myAxios from "../plugins/myAxios";
import UserCardList from "../components/UserCardList.vue";

const value = ref('');
let chooses = ref<string[]>([]);
const isSearch = ref(true);
const userList:any = ref([]);
const onSearch =async () => {
  chooses.value = value.value.split(' ');
  // console.log(chooses.value)

  const res = await myAxios.get('/user/tags/list',{
    params:{
      tags: value.value,
    },
  });
  if(res.data.code === 0){
    isSearch.value = false;
    userList.value.push(res.data.data);
    // console.log(userList.value);
  }
  // console.log(res.data);
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

const tags = [
  "Java",
  "Python",
  "C#",
  "JavaScript",
  "HTML",
  "CSS",
  "SQL",
  "PHP",
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Git",
  "GitHub",
  "Visual Studio Code",
  "Eclipse",
  "IntelliJ IDEA",
  "Android Studio",
  "Xcode",
  "Unity",
  "Unreal Engine",
  "OpenGL",
  "DirectX",
  "游戏开发",
  "人工智能",
  "机器学习",
  "数据科学",
  "大数据",
  "云计算",
  "DevOps",
  "敏捷开发",
  "测试驱动开发",
  "面向对象编程",
  "函数式编程",
  "Web 开发",
  "前端开发",
  "后端开发",
  "全栈开发",
  "数据库设计",
  "网络安全",
  "网络安全",
  "区块链",
  "加密货币",
  "虚拟现实",
  "增强现实",
  "游戏化",
  "移动开发"
];

const select = (tag:string) => {
  value.value +=  tag + ' ';
}
</script>
<style scoped>

</style>
