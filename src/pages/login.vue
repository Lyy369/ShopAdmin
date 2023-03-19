<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref,onMounted,onBeforeUnmount} from 'vue'
import { toast } from '@/composables/util'
import { useRouter } from 'vue-router'
import useUser from "@/stores/User";

const router = useRouter()
const userStore = useUser()

const form = reactive({
    username: '',
    password: ''
})

/*表单组件功能*/
//表单信息的验证规则
const rules = {
    username: [{
        required: true,
        message: "用户名不能为空",
        trigger: blur
    }],
    password: [{
        required: true,
        message: "密码不能为空",
        trigger: blur
    }]
}
const formRef = ref() //获取表单组件
const loading = ref(false) //控制登录按钮
function onSubmit() {
    formRef.value.validate((vaild: boolean) => { //验证表单数据的合法性
        if (!vaild) { //不合法直接显示不合法
            return
        }
        //请求时让登录按钮失效
        loading.value = true

        //提交给后端
        userStore.Login(form.username, form.password).then(res => {
            toast("登陆成功")
            router.push('/')
        }).finally(() => {
            loading.value = false //重新激活登录按钮
        })
    })
}

//键盘enter登录
function onKeyUp(e:any){
  if(e.key === 'Enter'){
       onSubmit()
  }
}
onMounted(()=>{
    document.addEventListener("keyup",onKeyUp)
})
onBeforeUnmount(()=>{
    document.removeEventListener("keyup",onKeyUp)
})
</script>

<template>
    <!-- 布局容器，min-h-screen占满屏幕高度 -->
    <el-row class="login-container">
        <!-- 左侧部分 -->
        <el-col :lg="16" :md="12" class="left">
            <div style="text-align: center;">
                <div>商品后台管理系统</div>
                <div>@ made by Lyy</div>
            </div>
        </el-col>
        <!-- 右侧部分 -->
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>用户账号密码登录</span>
                <span class="line"></span>
            </div>
            <!-- 表单 -->
            <el-form :model="form" class="w-[250px]" :rules="rules" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名(admin)">
                        <template #prefix>
                            <el-icon class="el-input_icon">
                                <user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码(admin)" show-password>
                        <template #prefix>
                            <el-icon class="el-input_icon">
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="w-[250px]" round color="#626aef" :loading="loading">登
                        录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style scoped>
.login-container {
    @apply min-h-screen bg-indigo-500;
}


.login-container .left,
.login-container .right {
    @apply flex items-center justify-center;
}

.login-container .right {
    @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply font-bold text-1xl text-light-50 mb-4;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>