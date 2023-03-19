import axios from "@/axios";

//请求用户信息
export function getstatistics1(){
    return axios.get('/admin/statistics1')
}

//请求商品和交易订单数据
export function getStatistics2(){
    return axios.get('/admin/statistics2')
}

//请求Echarts图表数据
export function getStatistics3(type:any){
    return axios.get('/admin/statistics3?type=' + type)
}