import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/views/home'
// import item from '@/views/item'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => { require(['@/views/home'], resolve) }, // 懒加载路由
      mate: {
        keepAlive: true
      }
    },
    {
      path: '/item',
      name: 'item',
      component: resolve => { require(['@/views/item'], resolve) }, // 懒加载路由
      mate: {
        keepAlive: true
      }
    },
    {
      path: '/score',
      name: 'score',
      component: resolve => { require(['@/views/score'], resolve) }, // 懒加载路由
      mate: {
        keepAlive: true
      }
    }
  ]
})
