import axios from "@/axios";

export function getImageClassList(page:any){
    return axios.get('/admin/image_class/' + page)
}

export function createImageClass(data:any){
    return axios.post("/admin/image_class",data)
}

export function updateImageClass(id:any,data:any){
    return axios.post("/admin/image_class/"+id,data)
}

export function deleteImageClass(id:any){
    return axios.post(`/admin/image_class/${id}/delete`)
}