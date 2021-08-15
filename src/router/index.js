import Vue from 'vue'
import Router from 'vue-router'
import Man from "../components/Man";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Man',
      component: Man
    }
  ]
})
