import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false
// 导入 Element-ui
import ElementUI from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css'
import './assets/css/base.css';
// 引用less
import less from 'less'
Vue.use(less)
// 注册 Element-ui
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
