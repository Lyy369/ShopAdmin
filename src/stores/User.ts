import { defineStore } from 'pinia';
import { login, getinfo } from '@/api/manager'
import { setToken, reomveToken } from '@/composables/auth';
import useMenu from './Menu'

const useUser = defineStore("user", {
    state: () => ({
        //用户信息
        user: { avatar: '' ,username:''}
    }),
    actions: {
        SET_USERINFO(user: any) {
            this.user = user
        },
        //登录时设置token
        Login(username: string, password: string) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken((res as any).token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        //获取并存储当前登录用户的信息
        getInfo() {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    this.SET_USERINFO(res)
                    const menuStore = useMenu()
                    menuStore.SET_MENUS((res as any).menus)
                    menuStore.SET_RULENAMES((res as any).ruleNames)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        //退出登录
        Logout() {
            //清除token
            reomveToken()
            //清除用户信息
            this.SET_USERINFO({})
        }
    }
})

export default useUser