<template>
  <van-nav-bar @click-left="onClickLeft" title="更新队伍" left-arrow>
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
          :src="avatar"
      />
    </van-col>
    <van-col span="8"></van-col>
  </van-row>



  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <!-- 输入任意文本 -->
      <van-field v-model="addTeamData.teamName" label="队伍名"/>

      <van-field
          v-model="addTeamData.teamDescription"
          rows="2"
          autosize
          label="队伍描述"
          type="textarea"
          maxlength="50"
          placeholder="请输入队伍描述"
          show-word-limit
      />

      <van-field name="stepper" label="最大人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" max="20" min="3"/>
        </template>
      </van-field>

      <van-field
          v-model="addTeamData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          placeholder="点击选择时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker @confirm="onConfirm" @cancel="showPicker = false"/>
      </van-popup>

      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addTeamData.teamStatus" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <!-- 输入密码 -->
      <van-field v-if="addTeamData.teamStatus == 2" v-model="addTeamData.teamPassword" type="password" label="密码"/>

    </van-cell-group>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        更新
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {useRoute, useRouter} from "vue-router";

const onClickLeft = () => history.back();
const router = useRouter();
const initFormData = {
  "expireTime": null,
  "maxNum": 3,
  "teamDescription": "",
  "teamName": "",
  "teamPassword": "",
  "teamStatus": 0
}
const route = useRoute();

// 需要用户填写的表单数据
const addTeamData = ref({...initFormData})
const id = route.query.id;
const avatar = route.query.avatar;
onMounted(async () => {
  const res = await myAxios.get("/team/get",{
    params:{
      id: id,
    }
  });
  if (res?.data.code === 0) {
    addTeamData.value = res.data.data;
    console.log(res.data.data);
  }
})
const showPicker = ref(false);
//@ts-ignore
const onConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = selectedValues.join('/');
  showPicker.value = false;
};

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if(res.data && res?.data.code === 0){
    await history.back();
  }else {
    console.log(res?.data.message);
  }
}
// watchEffect(async () => {
//   console.log(addTeamData.value.teamStatus)
// })
</script>
<style scoped>

</style>
