import axios from "@/axios";
import { queryParams } from "@/composables/util"

//登录验证请求
export function login(username:string,password:string){
     return axios.post('/admin/login',{
        username,
        password
    })
}

//请求用户信息
export function getinfo(){
    return axios.post('/admin/getinfo')
}

//退出登录请求
export function logout(){
    return axios.post('/admin/logout')
}

//修改密码
export function updatepassword(data:{}){
    return axios.post('/admin/updatepassword',data)
}

export function getManagerList(page:any,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/manager/${page}${r}`)
}

export function updateManagerStatus(id:any,status:any){
    return axios.post(`/admin/manager/${id}/update_status`,{
        status
    })
}

export function createManager(data:any){
    return axios.post(`/admin/manager`,data)
}

export function updateManager(id:any,data:any){
    return axios.post(`/admin/manager/${id}`,data)
}

export function deleteManager(id:any){
    return axios.post(`/admin/manager/${id}/delete`)
}