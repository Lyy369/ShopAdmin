import useMenu from "@/stores/Menu"

function hasPermission(value:any,el = false){
    const menuStore = useMenu()
    if(!Array.isArray(value)){
        throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
    }
    const hasAuth = value.findIndex(v => (menuStore.ruleNames as any).includes(v)) != -1
    if(el && !hasAuth){
        (el as any).parentNode && (el as any).parentNode.removeChild(el)
    }
    return hasAuth
}

export default {
    install(app:any){
        app.directive("permission",{
            mounted(el:any,binding:any){
                hasPermission(binding.value,el)
            }
        })
    }
}