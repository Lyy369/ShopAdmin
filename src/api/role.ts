import axios from '@/axios'

export function getRoleList(page:any){
    return axios.get(`/admin/role/${page}`)
}

export function createRole(data:any){
    return axios.post("/admin/role",data)
}

export function updateRole(id:any,data:any){
    return axios.post("/admin/role/"+id,data)
}

export function deleteRole(id:any){
    return axios.post(`/admin/role/${id}/delete`)
}

export function updateRoleStatus(id:any,status:any){
    return axios.post(`/admin/role/${id}/update_status`,{
        status
    })
}

export function setRoleRules(id:any,rule_ids:any){
    return axios.post(`/admin/role/set_rules`,{
        id,rule_ids
    })
}