<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Fold, Refresh, ElemeFilled, FullScreen, ArrowDown, Aim } from '@element-plus/icons-vue'
import { showModel } from '@/composables/util'
import { logout } from "@/api/manager"
import { toast } from '@/composables/util';
import { useRouter } from 'vue-router';
import useUser from '@/stores/User';
import useMenu from '@/stores/Menu';
import { useFullscreen } from '@vueuse/core';
import { updatepassword } from '@/api/manager';
import FormDrawer from '@/components/publicComponents/FormDrawer.vue';
const userStore = useUser()
const menuStore = useMenu()
const router = useRouter()
const { isFullscreen, enter, exit, toggle } = useFullscreen()
const { showDrawerRef, form, rules, formRef,onSubmit, openRepasswordForm }  = useRepassword()

//登出处理
function handlelogout() {
      showModel("是否要退出登录").then(res => {
            logout().finally(() => {
                  //清除token和用户数据
                  userStore.Logout()
                  // 跳转回登录页面
                  router.push('/login')
                  //提示消息
                  toast("退出登录成功")
            })
      }).catch(err => {

      })
}
function handleCommand(c: any) {
      switch (c) {
            case 'logout':
                  handlelogout()
                  break
            case 'rePassWord':
                  openRepasswordForm()
                  break;
      }
}

//刷新页面
function handlerRefresh() {
      location.reload()
}

//修改密码
function useRepassword() {
      const showDrawerRef = ref()
      const form = reactive({
            oldpassword: '',
            password: '',
            repassword: ''
      })
      const rules = {
            oldpassword: [{
                  required: true,
                  message: "旧密码不能为空",
                  trigger: blur
            }],
            password: [{
                  required: true,
                  message: "新密码不能为空",
                  trigger: blur
            }],
            repassword: [{
                  required: true,
                  message: "确认密码不能为空",
                  trigger: blur
            }]
      }
      const formRef = ref() //获取表单组件
      function onSubmit() {
            formRef.value.validate((vaild: boolean) => { //验证表单数据的合法性
                  if (!vaild) { //不合法直接显示不合法
                        return
                  }

                  //请求时让登录按钮失效
                  showDrawerRef.value.showloading()

                  //提交给后端
                  updatepassword(form).then(res => {
                        toast("修改密码成功，请重新登陆")
                        //清除token和用户数据
                        userStore.Logout()
                        // 跳转回登录页面
                        router.push('/login')
                  }).finally(() => {
                        showDrawerRef.value.hideloading()
                  })
            })
      }

      function openRepasswordForm() {
            showDrawerRef.value.open()
      }

      return {
            showDrawerRef,
            form,
            rules,
            formRef,
            onSubmit,
            openRepasswordForm
      }
}
</script>

<template>
      <div class="f-header">
            <!-- 图标 -->
            <span class="logo">
                  <el-icon class="mr-2">
                        <ElemeFilled />
                  </el-icon>
                  商品后台管理系统
            </span>

            <!-- 折叠 -->
            <el-icon class="icon-button" @click="menuStore.hanldeAsideWidth">
                  <fold v-if="menuStore.asideWidth == '250px'"/>
                  <Expand v-else/>
            </el-icon>

            <!-- 刷新页面 -->
            <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
                  <el-icon class="icon-button" @click='handlerRefresh'>
                        <refresh />
                  </el-icon>
            </el-tooltip>

            <div class="ml-auto flex items-center">
                  <!-- 全屏操作 -->
                  <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
                        <el-icon class="icon-button" @click="toggle">
                              <full-screen v-if="!isFullscreen" />
                              <aim v-else />
                        </el-icon>
                  </el-tooltip>

                  <!-- 下拉菜单 -->
                  <el-dropdown class="dropdown" @command="handleCommand">
                        <span class="flex items-center text-light-50">
                              <el-avatar :size="25" :src="userStore.user.avatar" class="mr-2" />
                              {{ userStore.user.username }}
                              <el-icon class="el-icon--right">
                                    <arrow-down />
                              </el-icon>
                        </span>
                        <template #dropdown>
                              <el-dropdown-menu>
                                    <el-dropdown-item command="rePassWord">修改密码</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                              </el-dropdown-menu>
                        </template>
                  </el-dropdown>
            </div>
      </div>

      <!-- 修改密码 -->
      <FormDrawer ref="showDrawerRef" @submit="onSubmit" title="修改密码" destoryOnClose confirmText="提交">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" size="small">
                  <el-form-item prop="oldpassword" label="旧密码">
                        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
                        </el-input>
                  </el-form-item>

                  <el-form-item prop="password" label="新密码">
                        <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
                        </el-input>
                  </el-form-item>

                  <el-form-item prop="repassword" label="确认密码">
                        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password>
                        </el-input>
                  </el-form-item>
            </el-form>
      </FormDrawer>
</template>

<style scoped>
.f-header {
      @apply flex bg-indigo-700 text-light-50 fixed top-0 left-0 right-0 items-center;
      height: 64px;
      z-index: 1000;
}

.logo {
      width: 250px;
      @apply flex justify-center items-center text-xl font-thin;
}

.icon-button {
      width: 42px;
      height: 64px;
      @apply flex justify-center items-center;
      cursor: pointer;
}

.icon-button:hover {
      @apply bg-indigo-600;
}

.dropdown {
      height: 64px;
      cursor: pointer;
      @apply flex justify-center items-center mx-5;
}
</style>