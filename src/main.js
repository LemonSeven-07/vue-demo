// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '../store/index'
import router from './router'
import ElementUI, {MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

import './assets/icon/iconfont.css'
import './assets/icon/iconfont'
import iconSvg from "./components/iconSvg";
Vue.component('icon-svg', iconSvg);


// 阻止显示生产模式的消息
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$confirm = MessageBox.confirm;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
