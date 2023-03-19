<script setup lang="ts">
import { uploadImageAction } from "@/api/image"
import { getToken } from "@/composables/auth"
import { toast } from "@/composables/util"
const token = getToken()

defineProps({
    data: Object,
})

const emit = defineEmits(["success"])

const uploadSuccess = (response:any, uploadFile:any, uploadFiles:any) => {
    emit("success", {
        response, uploadFile, uploadFiles
    })
}

const uploadError = (error:any, uploadFile:any, uploadFiles:any) => {
    let msg = JSON.parse(error.message).msg || "上传失败"
    toast(msg, "error")
}

</script>

<template>
    <el-upload drag :action="uploadImageAction" multiple :headers="{
        token
    }" name="img" :data="data" :on-success="uploadSuccess" :on-error="uploadError">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            拖拽文件至此或 <em>点击上传</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                仅限jpg/png文件，文件大小不超过500kb
            </div>
        </template>
    </el-upload>
</template>
