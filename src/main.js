import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import eventBus from 'vue3-eventbus'

import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

import {
    components,
    plugins
} from './utils/elementPlus.js'

const app = createApp(App)
components.forEach(component => {
    app.component(component.name, component)
})

plugins.forEach(plugin => {
    app.use(plugin)
})
app.use(router, eventBus, ElementUI)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
