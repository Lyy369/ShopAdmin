<script setup lang="ts">
import { ref } from 'vue';

//接受父组件传来的数据
const props = defineProps({
    title: String,
    size: {
        type: String,
        default: "45%"
    },
    destoryOnClose: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type: String,
        defalut: "提交"
    }
})

const emit = defineEmits(["submit"])
const submit = () => emit("submit")

//向父组件暴露数据
const showDrawer = ref(false)
const open = () => showDrawer.value = true
const close = () => showDrawer.value = false

const loading = ref(false)
const showloading = () => loading.value = true
const hideloading = () => loading.value = false

defineExpose({ open, close, showloading, hideloading })
</script>

<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size" :destory-on-close="destoryOnClose" :close-on-click-modal="false">
        <div class="formDrawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="actions">
                    <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button>
                    <el-button type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<style scoped>
.formDrawer {
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex flex-col;
}

.formDrawer .body {
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow: auto;
}

.formDrawer .actions {
    height: 50px;
    @apply mt-auto flex items-center;
}
</style>