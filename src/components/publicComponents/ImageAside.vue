<script setup lang="ts">
import AsideList from '@/components/image/AsideList.vue';
import FormDrawer from '@/components/publicComponents/FormDrawer.vue';
import { getImageClassList, createImageClass, updateImageClass, deleteImageClass } from '@/api/image_class';
import { ref, computed, reactive } from 'vue';
import { toast } from "@/composables/util"

//加载动画
const loading = ref(false);
const list = ref([])
const activeId = ref(0)

//分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

//获取数据
function getData(p: any = null) {
    if (typeof p == 'number') {
        currentPage.value = p
    }

    loading.value = true

    getImageClassList(currentPage.value).then(res => {
        list.value = (res as any).list
        total.value = (res as any).totalCount

        //第一个默认选中
        let item = list.value[0]
        if (item) {
            if(item){
            handleChangeActiveId((item as any).id)
        }
        }
    }).finally(() => {
        loading.value = false
    })
}
//首次创建组件自动请求一次数据
getData()


//表单处理
const editId = ref(0)
const drawerTitle = computed(() => editId.value ? "修改" : "新增")
const formDrawerRef = ref()
const form = reactive({
    name: "",
    order: 50
})
const rules = {
    name: [{
        required: true,
        message: '图库分类名称不能为空',
        trigger: 'blur'
    }]
}
const formRef = ref()
const handleSubmit = () => {
    formRef.value.validate((valid: any) => {
        if (!valid) return

        (formDrawerRef.value as any).showloading()

        const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)

        fun.then(res => {
            toast(drawerTitle.value + "成功");
            getData(editId.value ? currentPage.value : 1);
            (formDrawerRef.value as any).close();
        })
            .finally(() => {
                (formDrawerRef.value as any).hideloading()
            })
    })
}

//asidelist子组件的事件回调
// 编辑
const handleEdit = (row: any) => {
    editId.value = row.id;
    form.name = row.name;
    form.order = row.order;
    (formDrawerRef.value as any).open()
}
// 删除
const handleDelete = (id: any) => {
    loading.value = true
    deleteImageClass(id)
        .then(res => {
            toast("删除成功")
            getData()
        })
        .finally(() => {
            loading.value = false
        })
}

// 选中图库分类ID
const emit = defineEmits(["change"])
// 切换分类
function handleChangeActiveId(id: any) {
    activeId.value = id
    emit("change", id)
}

// 新增：暴露给父组件
const handleCreate = () => {
    editId.value = 0
    form.name = "";
    form.order = 50;
    (formDrawerRef.value as any).open()
}
defineExpose({
    handleCreate
})
</script>

<template>
    <el-aside width="220px" class="image-aside" v-loading='loading'>
        <!-- 条目 -->
        <div class="top">
            <AsideList :active="activeId == (item as any).id" v-for="(item, index) in list" :key="index"
                @edit="handleEdit(item)" @delete="handleDelete((item as any).id)"
                @click="handleChangeActiveId((item as any).id)">
                {{ (item as any).name }}
            </AsideList>
        </div>

        <!-- 分页按钮组件 -->
        <div class="bottom">
            <el-pagination background layout="prev, next" @current-change="getData" :total="total"
                :current-page="currentPage" :page-size="limit" />
        </div>
    </el-aside>

    <!-- 可打开的添加条目 -->
    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit" confirmText="提交">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<style scoped>
.image-aside {
    border-right: 1px solid #eeeeee;
    position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}
</style>