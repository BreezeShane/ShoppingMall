import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import eventBus from 'vue3-eventbus'

createApp(App).use(router, eventBus)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');
