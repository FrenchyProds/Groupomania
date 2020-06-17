import index from './components/index'
import register from './components/register'
import recover from './components/recover'
import resetConfirmation from './components/resetConfirmation'
import mainPage from './components/mainPage'
import groupogag from './components/groupogag'
import groupodiscute from './components/groupodiscute'

export default [
    {path: '/', component: index},
    {path: '/register', component: register},
    {path: '/recover', component: recover},
    {path: '/recover/resetConfirmation', component: resetConfirmation},
    {path: '/mainPage', component: mainPage},
    {path: '/groupogag', component: groupogag},
    {path: '/groupodiscute', component: groupodiscute}
]