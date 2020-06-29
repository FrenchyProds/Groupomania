import swal from 'sweetalert'
import index from './components/index'
import register from './components/register'
import recover from './components/recover'
import resetConfirmation from './components/resetConfirmation'
import mainPage from './components/mainPage'
import groupogag from './components/groupogag'
import groupodiscute from './components/groupodiscute'
import profil from './components/profil/profil'

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
        path: '/myprofile',
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
    }
]