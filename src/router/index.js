import Vue from 'vue'
import Router from 'vue-router'
import Man from "../components/Man";
import Home from "../components/Home";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/fast',
      name: 'Man',
      component: Man
    },
    {
      path: '/',
      name: 'Man',
      component: Home
    },
  ]
})
