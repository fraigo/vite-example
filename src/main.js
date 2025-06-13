import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './lang'
import { createPinia } from 'pinia'
import darkMode from 'vue-plugin-darkmode'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
const queryClient = new QueryClient()

createApp(App)
    .use(createPinia())
    .use(darkMode)
    .use(router)
    .use(i18n)
    .use(VueQueryPlugin, { queryClient })
    .mount('#app')
