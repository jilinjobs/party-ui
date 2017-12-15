import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Finish from '@/components/Finish'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/finish',
      name: 'Finsih',
      component: Finish
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login' && !router.app.currentData) {
    next({path: '/login'})
  } else if(to.path != '/login' && to.path != '/finish' && router.app.finish) {
    next({path: '/finish'})
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router