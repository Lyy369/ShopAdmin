import { useCookies } from '@vueuse/integrations/useCookies'
const Tokenkey = 'admin-token'
const cookie = useCookies()

//获取token
export function getToken(){
    return cookie.get(Tokenkey)
}

//设置token
export function setToken(token:string){
    return cookie.set(Tokenkey,token)
}

//清除token
export function reomveToken(){
    return cookie.remove(Tokenkey)
}
