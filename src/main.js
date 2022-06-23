import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import eventBus from 'vue3-eventbus'

import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

createApp(App).use(router, eventBus).use(createVuestic())
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
