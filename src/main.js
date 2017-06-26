import Vue from "vue";
import VueRouter from "vue-router"; // 在node_modules,工具默认会查找
import routes from "./router/router"; // 路径以main.js为基准
import store from "./store/"; // 不指定文件的话，默认加载index.js
import {routerMode} from "./config/env";
import FastClick from "fastclick";  // fastclick符合AMD规范
import "./config/rem";

// 解决移动端单击延迟的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        // 如果这个页面被缓存，则记录这个页面的滚动条距离顶部的位置，
        // 当重新返回这个页面时，滚动条滚动到指定位置。
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
});


new Vue({
  router,
  store,
}).$mount('#app');

