import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NotFound from '@/pages/404.vue'
import Login from '@/pages/login.vue'
import Admin from "@/pages/Admin.vue"
import Index from '@/components/First/index.vue'
import Goodlist from '@/components/goods/list.vue'
import Categorylist from '@/components/category/list.vue'
import UserList from '@/components/user/list.vue';
import OrderList from '@/components/order/list.vue';
import CommentList from '@/components/comment/list.vue';
import ImageList from '@/components/image/list.vue';
import NoticeList from '@/components/notice/list.vue';
import SettingBase from '@/components/setting/base.vue';
import CouponList from '@/components/coupon/list.vue';
import ManagerList from '@/components/manager/list.vue';
import AccessList from '@/components/access/list.vue';
import RoleList from '@/components/role/list.vue';
import SkusList from '@/components/suks/list.vue';
import LevelList from '@/components/level/list.vue';
import SettingBuy from '@/components/setting/buy.vue';
import SettingShip from '@/components/setting/ship.vue';
import  DistributionIndex from '@/components/distribution/index.vue';
import DistributionSetting from '@/components/distribution/setting.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "admin",
        component: Admin,
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: "登录页"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: "404页面"
        }
    }
]

//动态路由，用于匹配菜单
const asyncRoutes = [
    {
        path: "/",
        name: '/',
        component: Index,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: "/goods/list",
        name: "/goods/list",
        component: Goodlist,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: "/category/list",
        name: "/category/list",
        component: Categorylist,
        meta: {
            title: "分类列表"
        }
    }, {
        path: "/user/list",
        name: "/user/list",
        component: UserList,
        meta: {
            title: "用户列表"
        }
    }, {
        path: "/order/list",
        name: "/order/list",
        component: OrderList,
        meta: {
            title: "订单列表"
        }
    }, {
        path: "/comment/list",
        name: "/comment/list",
        component: CommentList,
        meta: {
            title: "评价列表"
        }
    }, {
        path: "/image/list",
        name: "/image/list",
        component: ImageList,
        meta: {
            title: "图库列表"
        }
    }, {
        path: "/notice/list",
        name: "/notice/list",
        component: NoticeList,
        meta: {
            title: "公告列表"
        }
    }, {
        path: "/setting/base",
        name: "/setting/base",
        component: SettingBase,
        meta: {
            title: "配置"
        }
    }, {
        path: "/coupon/list",
        name: "/coupon/list",
        component: CouponList,
        meta: {
            title: "优惠券列表"
        }
    },
    {
        path: "/manager/list",
        name: "/manager/list",
        component: ManagerList,
        meta: {
            title: "管理员管理"
        }
    },
    {
        path: "/access/list",
        name: "/access/list",
        component: AccessList,
        meta: {
            title: "菜单权限管理"
        }
    },
    {
        path: "/role/list",
        name: "/role/list",
        component: RoleList,
        meta: {
            title: "角色管理"
        }
    },
    {
        path: "/skus/list",
        name: "/skus/list",
        component: SkusList,
        meta: {
            title: "规格管理"
        }
    },
    {
        path: "/level/list",
        name: "/level/list",
        component: LevelList,
        meta: {
            title: "会员等级"
        }
    },
    {
        path: "/setting/buy",
        name: "/setting/buy",
        component: SettingBuy,
        meta: {
            title: "支付设置"
        }
    },
    {
        path: "/setting/ship",
        name: "/setting/ship",
        component: SettingShip,
        meta: {
            title: "物流设置"
        }
    },
    {
        path: "/distribution/index",
        name: "/distribution/index",
        component: DistributionIndex,
        meta: {
            title: "分销员管理"
        }
    },
    {
        path: "/distribution/setting",
        name: "/distribution/setting",
        component: DistributionSetting,
        meta: {
            title: "分销设置"
        }
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})


export function addRoutes(menus: any) {
    //是否有新的路由
    let hasNewRoutes = false

    const findAndAddRoutesbyMenus = (arr: any) => {
        arr.forEach((e: { frontpath: any, child: any }) => {
            let item = asyncRoutes.find(o => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute('admin', item)
                hasNewRoutes = true
            }
            if (e.child && e.child.length > 0) {
                findAndAddRoutesbyMenus(e.child)
            }
        });
    }

    findAndAddRoutesbyMenus(menus);
    return hasNewRoutes
}
