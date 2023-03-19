<script setup lang="ts">
import { ref,reactive } from "vue"
import FormDrawer from "@/components/publicComponents/FormDrawer.vue";
import Editor from "@/components/publicComponents/Editor.vue"
import {readGoods,updateGoods} from "@/api/goods"
import { toast } from "@/composables/util";

const formDrawerRef = ref()

const form = reactive({
    content:"",
})

const goodsId = ref(0)
const open = (row:any)=>{
    goodsId.value = row.id
    row.contentLoading = true
    readGoods(goodsId.value).then(res=>{
        form.content = (res as any).content
        formDrawerRef.value.open()
    })
    .finally(()=>{
        row.contentLoading = false
    })
}
const emit = defineEmits(["reloadData"])

const submit = ()=>{
    formDrawerRef.value.showloading()
    updateGoods(goodsId.value,form)
    .then(res=>{
        toast("设置商品详情成功")
        formDrawerRef.value.close()
        emit("reloadData")
    })
    .finally(()=>{
        formDrawerRef.value.hideloading()
    })
}

defineExpose({
    open
})
</script>

<template>
    <FormDrawer ref="formDrawerRef" title="设置商品详情" @submit="submit" destroy-on-close confirm-text="提交">
        <el-form :model="form">
            <el-form-item>
                <Editor v-model="form.content"/>
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>
