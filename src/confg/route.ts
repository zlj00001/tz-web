import IndexView from "../view/IndexView.vue";
import TeamView from "../view/TeamView.vue";
import UserView from "../view/UserView.vue";
import SearchView from "../view/SearchView.vue";
import NotFound from "../view/NotFound.vue";
import EditUsernameView from "../view/EditUsernameView.vue";
import LoginView from "../view/LoginView.vue";
import RegisterView from "../view/RegisterView.vue";
import TeamAddView from "../view/TeamAddView.vue";
import TeamMyCreateView from "../view/TeamMyCreateView.vue";
import TeamMyJoinView from "../view/TeamMyJoinView.vue";
import TeamUpdateView from "../view/TeamUpdateView.vue";
import TeamDetailView from "../view/TeamDetailView.vue";
import TeamRecommendView from "../view/TeamRecommendView.vue";
import TeamSearchView from "../view/TeamSearchView.vue";
import TeamJoinEncryption from "../view/TeamJoinEncryptionView.vue";
import ChatListView from "../view/ChatListView.vue";
import UserDetailView from "../view/UserDetailView.vue";
import ChatView from "../view/ChatView.vue";

const routes = [
    {
        path: "/",
        component: IndexView,
    },
    {
        path: '/home',
        component: IndexView
    },
    {
        path: '/user/chat',
        component: ChatView
    },
    {
        path: '/user/chatList',
        component: ChatListView
    },
    {
        path: '/team',
        component: TeamView
    },
    {
        path: '/team/joinEncryption',
        component: TeamJoinEncryption
    },
    {
        path: '/team/teamSearch',
        component: TeamSearchView
    },
    {
        path: '/team/recommend',
        component: TeamRecommendView
    },
    {
        path: '/team/detail',
        component: TeamDetailView
    },
    {
        path: '/team/update',
        component: TeamUpdateView
    },
    {
        path: '/team/myJoin',
        component: TeamMyJoinView
    },
    {
        path: '/team/myCreate',
        component: TeamMyCreateView
    },
    {
        path: '/team/add',
        component: TeamAddView
    },
    {
        path: '/user/detail',
        component: UserDetailView
    },
    {
        path: '/user',
        component: UserView
    },
    {
        path: '/search',
        component: SearchView
    },
    {
        path: '/user/edit/name',
        component: EditUsernameView,
    },
    {
        path: '/user/login',
        component: LoginView,
    },
    {
        path: '/user/register',
        component: RegisterView,
    },
    {
        path: '/404',
        component: NotFound
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404",
    }
]
export default routes;