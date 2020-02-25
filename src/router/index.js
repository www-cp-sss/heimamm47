// 导入 vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import user from '../views/index/user/user.vue'
import subject from '../views/index/subject/subject.vue'
import business from '../views/index/business/business.vue'
import chart from '../views/index/chart/chart.vue'
import question from '../views/index/question/question.vue'
// //注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    {
      path: '/',
      component: login  //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/index',
      component: index,
      children: [
        {
        path: 'user',
        component: user,
      },
        {
        path: 'subject',
        component: subject,
      },
        {
        path: 'business',
        component: business,
      },
        {
        path: 'chart',
        component: chart,
      },
        {
        path: 'question',
        component: question,
      }
    ]
    }
  ]
});
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
// 导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to,from,next)=>{
  NProgress.start()
  if(to.path=='/index'){
    next('/index/chart')
  }else{
    next()
  }
})

router.afterEach(()=>{
  NProgress.done()
})
export default router
