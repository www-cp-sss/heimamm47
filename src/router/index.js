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
      component: login, //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'user',
          component: user,
          meta: {
            title: '用户列表'
          }
        },
        {
          path: 'subject',
          component: subject,
          meta: {
            title: '学科列表'
          }
        },
        {
          path: 'business',
          component: business,
          meta: {
            title: '企业列表'
          }
        },
        {
          path: 'chart',
          component: chart,
          meta: {
            title: '数据概览'
          }
        },
        {
          path: 'question',
          component: question,
          meta: {
            title: '题库列表'
          }
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
import { removeToken, getToken } from "../utilis/token"
import { info } from '../api/index'
import { Message } from 'element-ui';
import store from '../store/vuex'
router.beforeEach((to, from, next) => {
  NProgress.start()
  // if(to.path=='/'){
  //   next()
  // }else{
  //   info().then(res=>{
  //     if(res.data.code==200){
  //       next()
  //     }else{
  //       Message.error('登陆状态异常');
  //       removeToken();
  //       NProgress.done();
  //       next('/')
  //     }
  //   })
  // }
  if (to.path=='/index') {
    if (!getToken()) {
      Message.error('您还未登录,请登录');
      NProgress.done()
      return next('/')
    }
    info().then(res => {
      if (res.data.code == 200) {
        store.commit('changeusername', res.data.data.username)
        store.commit('changeavatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar)
        next('/index/chart')

      } else {
        Message.error('登陆状态异常')
        removeToken();
        NProgress.done()
        next('/')
      }
    })
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.title
  NProgress.done()
})
export default router
