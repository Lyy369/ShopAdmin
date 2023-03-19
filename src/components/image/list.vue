<script setup lang="ts">
import ImageAside from '@/components/publicComponents/ImageAside.vue';
import ImageMain from "@/components/publicComponents/ImageMain.vue"
import { ref } from "vue";


const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40

const ImageAsideRef = ref()
const handleOpenCreate = ()=>ImageAsideRef.value.handleCreate()

const ImageMainRef = ref()
const handleAsideChange = (image_class_id:any)=> ImageMainRef.value.loadData(image_class_id)

const handleOpenUpload = ()=>ImageMainRef.value.openUploadFile()
</script>

<template>
    <div>
        <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
            <el-header class="image-header">
                <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
                <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
            </el-header>
            <el-container>
                <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
                <ImageMain ref="ImageMainRef" />
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>