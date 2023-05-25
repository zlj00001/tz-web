import axios from "axios";
import qs from 'qs';

const myAxios = axios.create({
    baseURL: "https://tz-33994-7-1317098085.sh.run.tcloudbase.com/api",
})


//发请求的时候带上cookie
myAxios.defaults.withCredentials = true; // 配置为true

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //只针对get方式进行序列化
    // if (config.method === 'get') {
    //     // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2,不转换会显示为arr[]=1&arr[]=2
    //     config.paramsSerializer = {
    //         encode: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
    //     }
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //如果返回未登录，就跳到登录页
    if(response.data.code === 40100){
        const redirectUrl = window.location.href;

        window.location.href = "#/user/login";
    }
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;