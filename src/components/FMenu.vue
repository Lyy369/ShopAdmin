<script setup lang="ts">
import {computed,ref} from 'vue'
import { useRouter,useRoute,onBeforeRouteUpdate } from 'vue-router';
import useMenu from '@/stores/Menu';

//定义菜单配置
const asideMenus = computed(()=>menuStore.menus)

//处理对应的菜单页面跳转
const router = useRouter()
const route = useRoute()
function handleSelect(e:any){
   router.push(e)
}

// 监听路由变化
onBeforeRouteUpdate((to,from)=>{
    defaultActive.value = to.path
})

//菜单折叠
const menuStore = useMenu()
const isCollapse = computed(()=> !(menuStore.asideWidth == '250px'))

//默认选中
const defaultActive = ref(route.path)
</script>

<template>
    <div class="f-menu" :style="{width:menuStore.asideWidth}">
        <el-menu :default-active="defaultActive" unique-opened  class="border-0" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
            <template v-for="(item, index) in asideMenus" :key="index">
                <!-- 可展开的菜单 -->
                <el-sub-menu v-if="(item as any).child && (item as any).child.length > 0" :index="(item as any).name">
                    <!-- 图标 -->
                    <template #title>
                        <el-icon>
                            <component :is="(item as any).icon"></component>
                        </el-icon>
                        <span>{{ (item as any).name }}</span>
                    </template>

                    <!-- 子菜单 -->
                    <el-menu-item v-for="(item2, index2) in (item as any).child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <!-- 不需要展开的菜单 -->
                <el-menu-item v-else :index="(item as any).frontpath">
                    <el-icon>
                        <component :is="(item as any).icon"/>
                    </el-icon>
                    <span>{{ (item as any).name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<style>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
}

.f-menu::-webkit-scrollbar{
    width: 0px;
}
</style>