<template>
  <div style="margin-bottom: 10vh">
    <van-card
        v-for="team in props.teamList"
        :thumb="team.createUser.userAvatar"
        :desc="team.teamDescription"
        :title="`${team.teamName}`"
    >

      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.teamStatus]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>

      <template #footer>
        <van-button v-if="team.userId === loginUser" size="mini"
                    @click="doUpdateTeam(team.id,team.createUser.userAvatar)">编辑队伍
        </van-button>
        <van-button size="mini" @click="toTeamDetail(team.id,team.hasJoinNum)">查看队伍</van-button>
      </template>

    </van-card>

  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {onMounted, ref} from "vue";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const loginUser = ref();
const router = useRouter();

onMounted(async () => {
  // console.log(props.teamList);
  const res = await myAxios.get("/user/get/login");
  loginUser.value = res.data.data.id;
})

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number, avatar: string) => {
  router.push({
    path: '/team/update',
    query: {
      id,
      avatar: avatar,
    }
  })
}

const toTeamDetail = (id: number, hasJoinNum: number) => {
  router.push({
    path: '/team/detail',
    query: {
      id,
      hasJoinNum
    }
  })
}

</script>

<style scoped>

</style>