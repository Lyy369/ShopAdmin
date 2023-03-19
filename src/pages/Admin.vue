<script setup lang="ts">
import FHeader from '@/components/FHeader.vue'
import FMenu from '@/components/FMenu.vue'
import FTagList from '@/components/FTagList.vue'
import useMenu from '@/stores/Menu';
const menuStore = useMenu()
</script>

<template>
    <el-container>
        <el-header>
            <FHeader />
        </el-header>
        <el-container>
            <el-aside :width="menuStore.asideWidth">
                <FMenu />
            </el-aside>
            <el-main>
                <FTagList />
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.el-aside {
    transition: all 0.2s;
}

.fade-enter-from,.fade-leave-to{
    opacity: 0;
}

.fade-enter-to,.fade-leave-from{
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active{
    transition: all 0.3s;
}

.fade-enter-active{
    transition-delay: 0.3s;
}
</style>