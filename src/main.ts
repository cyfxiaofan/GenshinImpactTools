import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-plus/dist/index.css'
import 'animate.css';


const app = createApp(App)
app.config.globalProperties.$store = store
app.use(router).use(ElementPlus).use(mavonEditor).use(store).mount('#app')


store.dispatch('INIT_CONTENT')