import axios from '@/axios'

export function getNoticeList(page:any){
    return axios.get(`/admin/notice/${page}`)
}

export function createNotice(data:any){
    return axios.post("/admin/notice",data)
}

export function updateNotice(id:any,data:any){
    return axios.post("/admin/notice/"+id,data)
}

export function deleteNotice(id:any){
    return axios.post(`/admin/notice/${id}/delete`)
}