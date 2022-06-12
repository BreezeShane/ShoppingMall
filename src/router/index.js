import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'Main',
        component: () =>
            import ('../views/Main.vue')
    },
    {
        path: '/myshoppingcart',
        name: 'ShoppingCart',
        component: () =>
            import ('../views/ShoppingCartPage.vue')
    },
    {
        path: '/login',
        name: 'SignIn',
        component: () =>
            import ('../views/SignIn.vue')
    },
    {
        path: '/register',
        name: 'SignUp',
        component: () =>
            import ('../views/SignUp.vue')
    },
]

const router = createRouter({
    //history模式：createWebHistory , hash模式：createWebHashHistory
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router