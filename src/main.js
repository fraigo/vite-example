import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import darkMode from 'vue-plugin-darkmode'
createApp(App)
    .use(createPinia())
    .use(darkMode)
    .use(router)
    .mount('#app')
