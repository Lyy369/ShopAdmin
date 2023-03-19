import axios from '@/axios'
import { queryParams } from "@/composables/util"

export function getOrderList(page:any,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/order/${page}${r}`)
}


export function deleteOrder(ids:any){
    return axios.post(`/admin/order/delete_all`,{
        ids
    })
}

export function exportOrder(query = {}){
    let r = queryParams(query)
    return axios.post(`/admin/order/excelexport${r}`,{},{
        responseType:"blob"
    })
}

export function getShipInfo(id:any){
    return axios.get(`/admin/order/${id}/get_ship_info`)
}

export function refundOrder(id:any,data:any){
    return axios.post(`/admin/order/${id}/handle_refund`,data)
}