import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: process.env.BASE_URL,
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next()  放行     next('/login')  强制跳转
  // 如果用户访问的登录页，直接放行
  next();
});

// 解决重复点击导航时，控制台出现报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

// 解决vueRouter 跳转相同路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default router
