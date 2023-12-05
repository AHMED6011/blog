import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useCookies } from 'vue3-cookies'

const cookies = useCookies().cookies

const isAllowed = cookies.get('myCookie')

const app = createApp(App)

app.config.globalProperties.isAllow = isAllowed

app.use(router)


app.use(useCookies)

app.mount('#app')

export { isAllowed }
