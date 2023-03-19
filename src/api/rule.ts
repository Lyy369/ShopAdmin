import axios from '@/axios'

export function getRuleList(page:any){
    return axios.get(`/admin/rule/${page}`)
}

export function createRule(data:any){
    return axios.post("/admin/rule",data)
}

export function updateRule(id:any,data:any){
    return axios.post("/admin/rule/"+id,data)
}

export function updateRuleStatus(id:any,status:any){
    return axios.post(`/admin/rule/${id}/update_status`,{
        status
    })
}

export function deleteRule(id:any){
    return axios.post(`/admin/rule/${id}/delete`)
}