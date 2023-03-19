import {router,addRoutes} from "./router";
import { getToken } from "@/composables/auth";
import { toast, showFullLoading, hideFullLoading } from "./composables/util";
import useUser from "./stores/User";

//全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    //显示Loading
    showFullLoading();

    const token = getToken() //获取token

    //没有登录，强制跳转回登录页
    if (!token && to.path != '/login') {
        toast("请先登录", "error")
        return next({ path: '/login' })
    }

    //防止重复登录
    if (token && to.path == '/login') {
        toast("请勿重复登录")
        return next({ path: from.path ? from.path : "/" })
    }

    //进行页面间跳转时的数据共享
    const userStore = useUser()//必须定义在路由守卫中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
       let res =  await userStore.getInfo()
       hasGetInfo = true
       hasNewRoutes =  addRoutes((res as any).menus)
    }
    
    //设置页面标题
    let title= (to.meta.title ? to.meta.title : "")
    document.title = title as any

    hasNewRoutes ? next(to.fullPath) : next()
})


router.afterEach((to, from) => hideFullLoading())