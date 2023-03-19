<script setup lang="ts">
import { ref } from 'vue'
import useMenu from '@/stores/Menu';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';
import { router } from '@/router';
const menuStore = useMenu()
const route = useRoute()
const cookie = useCookies()

//存储打开的tab
const tabList = ref([
    {
        title: '后台首页',
        path: '/'
    }
])

//添加标签
function addTab(tab: any) {
    let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
    if (noTab) {
        tabList.value.push(tab)
    }
    cookie.set("tablist", tabList.value)
}
onBeforeRouteUpdate((to, from) => { //路由变化时，添加标签
    addTab({
        title: to.meta.title,
        path: to.path
    })
})

//实现标签切换页面
function changeTab(t: string) {
    router.push(t)
}

//刷新后，恢复上次打开状态
function initTabList() {
    let tabs = cookie.get('tablist')
    if (tabs) {
        tabList.value = tabs
    }
}
initTabList()

//手动关闭标签
function removeTab(t: any) {
    let tabs = tabList.value
    let a = route.path
    if (a == t) {
        tabs.forEach((tab: any, index) => {
            if (tab.path == t) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    a = nextTab.path
                }
            }
        })
    }

    router.push(a)

    tabList.value = tabList.value.filter(tab => tab.path != t)
    cookie.set("tablist", tabList.value)
}

//下拉菜单关闭标签
function handleClose(c: any) {
    if (c == 'clearAll') {
        router.push('/')
        tabList.value = [
            {
                title: '后台首页',
                path: '/'
            }
        ]
    } else if (c == 'clearOther') {
        tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == route.path)
    }
    cookie.set("tablist", tabList.value)
}
</script>

<template>
    <div class="f-tag-list" :style="{ left: menuStore.asideWidth }">

        <!-- 标签 -->
        <el-tabs v-model="$route.path" type="card" class="flex-1" style="min-width: 100px;" @tab-change="changeTab"
            @tab-remove="removeTab">
            <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
                :closable="item.path != '/'">
            </el-tab-pane>
        </el-tabs>

        <!-- 拉下菜单关闭标签 -->
        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height: 44px;"></div>
</template>

<style scoped>
.f-tag-list {
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 100;
}

.tag-btn {
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 32px;
}

:deep(.el-tabs__header) {
    border: 0 !important;
    @apply mb-0;
}

:deep(.el-tabs__nav) {
    border: 0 !important;
}

:deep(.el-tabs__item) {
    border: 0 !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded mt-1;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>