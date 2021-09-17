import Vue from 'vue';
import Router from 'vue-router';
import Home from "./views/Home.vue";
import * as auth from "./services/auth_service"

Vue.use(Router);

const routes = [

    {
        path: '/home',
        component: Home,

        children: [
            {
                path: 'sectores',
                name: 'sectores',
                component: () => import('./views/Sector.vue'),             
                beforeEnter: (to, from, next) => {
                    console.log(auth.getUserRole() === 'administrator');
                    if(auth.getUserRole()){
                        next();
                    }else{
                        next('/404')
                    }
                }
            },
            {
                path: 'equipamentos',
                name: 'equipamentos',
                component: () => import('./views/Equipamento.vue')
            },
            {
                path: '',
                name: 'dashboard',
                component: () => import('./views/Dashboard.vue')
            },
            {
                path: 'solicitacao',
                name: 'solicitacao',
                component: () => import('./views/Solicitacao.vue')
            },
            {
                path: 'perfil',
                name: 'perfil',
                component: () => import('./views/Perfil.vue')
            },
            {
                path: 'usuarios',
                name: 'usuarios',
                component: () => import('./views/Usuario.vue')
            },
            {
                path: 'actividades',
                name: 'actividades',
                component: () => import('./views/Actividades.vue')
            },
        ],

        beforeEnter: (to, from, next) => {
            if(!auth.isLoggedIn()){
                next('/login');
            }else{
                next()
            }
        }
    },

    {
        path: '/resgister',
        name: 'resgister',
        component: () => import('./views/autentication/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/autentication/Login.vue')
    },

    {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('./views/autentication/ResetPassword.vue')
    },
    {
        path: '*',
        name: '404',
        component: () => import('./views/404.vue')
    }
];





const router = new Router({
    mode: 'history',
    routes: routes,
    linkActiveClass: 'active'
});

export default router;