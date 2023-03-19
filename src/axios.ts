import axios from 'axios'
import {toast}  from '@/composables/util'
import {getToken } from '@/composables/auth'
import useUser from './stores/User'
import { useRouter } from 'vue-router'

const service = axios.create({
     baseURL: import.meta.env.VITE_APP_BASE_API
})

//请求拦截
service.interceptors.request.use(
    function (config) {
        const token = getToken()

        if (token) {
            config.headers["token"] = token
        }
        
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

//响应拦截
service.interceptors.response.use(
    function (response) {
        // return response.data.data
        return response.request.responseType == "blob" ? response.data : response.data.data;
    },
    function (error) {
        const msg = error.response.data.msg || '请求失败'

        if(msg == '非法token，请先登录！'){
                const userStore = useUser()
                userStore.Logout()
                location.reload()
        }

        //提示失败(element-plus)
        if(msg.length > 15){
            toast("当前无法操作", 'error')
        }else{
            toast(msg, 'error')
        }
        

        return Promise.reject(error)
    })

export default service