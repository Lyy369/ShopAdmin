import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'virtual:windi.css'
import {router} from './router'
import pinia from './stores'
import "./permission"
import * as ElementPlusIconsVue from '@element-plus/icons-vue' 
import permission from "@/directives/permission"
// import 'default-passive-events'


const app  = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(permission)

for (const [key,component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key,component)
  }

app.mount('#app')
