import swal from 'sweetalert'
import index from './components/login/index'
import register from './components/register/register'
import recover from './components/password_reset/recover'
import resetConfirmation from './components/password_reset/resetConfirmation'
import mainPage from './components/home/mainPage'
import groupogag from './components/gags/groupogag'
import groupodiscute from './components/discutes/groupodiscute'
import profil from './components/profil/profil'
import discute from './components/discutes/discutepost'
import voirgag from './components/gags/voirgag'
import voirdiscute from './components/discutes/voirdiscute'
import rules from './components/rules/rules'
import user from './components/profil/otherUser'
import admin from './components/admin/admin'


export default [
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            guest: true
        }
    },
    {
        path: '/recover',
        name: 'recover',
        component: recover,
        meta: {
            guest: true
        }
    },
    {
        path: '/recover/resetConfirmation',
        name: 'resetConfirmation',
        component: resetConfirmation,
        meta: {
            guest: true
        }
    },
    {
        path: '/mainPage',
        name: 'home',
        component: mainPage,
        meta: {
             requiresAuth: true 
            },
        beforeEnter: (to, from, next) => {
                if (localStorage.getItem('jwt') == null) {
                    next ({ name: 'index' })
                    swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
                } else {
                    next()
                } next()
            } 
    },
    {
        path: '/groupogag',
        name: 'groupogag',
        component: groupogag,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/groupogag/post/:id',
        name: 'voirgag',
        component: voirgag,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/groupodiscute',
        name: 'groupodiscute',
        component: groupodiscute,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/groupodiscute/post/:id',
        name: 'voirdiscute',
        component: voirdiscute,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/groupodiscute/post',
        name: 'discute',
        component: discute,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/myprofile/:id',
        name: 'profil',
        component: profil,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/administration',
        name: 'admin',
        component: admin,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/user/:username',
        name: 'user',
        component: user,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    },
    {
        path: '/règlement',
        name: 'rules',
        component: rules,
        requiresAuth: true,
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('jwt') == null) {
                next ({ name: 'index' })
                swal('ACCES INTERDIT', "Merci de vous authentifier avant de tenter d'accéder à cette page", 'error')
            } else {
                next()
            } next()
        } 
    }
]