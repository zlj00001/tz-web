import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user";

export const getCurrentUser = async ()=>{
    const res = await myAxios.get('/user/get/login');
    if(res.data.code == 0){
        setCurrentUserState(res.data.data);
        return res.data.data;
    }
    return null;
}