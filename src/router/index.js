import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import Main from '../views/Main'
import Home from '../views/secondary_view/Home'
import New from '../views/secondary_view/New'
import Article from '../views/secondary_view/Article'
import Comment from '../views/secondary_view/Comment'
import Category from '../views/secondary_view/Category'
import Link from '../views/secondary_view/Link'
import LoginLog from '../views/secondary_view/LoginLog'
import SystemLog from '../views/secondary_view/SystemLog'
import Setting from '../views/secondary_view/Setting'
import NotFound from '../views/error_page/NotFound'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/login', name: 'Login', component: Login},
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {path: '/home', name: 'Home', component: Home},
        {path: '/new', name: 'New', component: New},
        {path: '/articles', name: 'Article', component: Article},
        {path: '/comments', name: 'Comment', component: Comment},
        {path: '/category', name: 'Category', component: Category},
        {path: '/link', name: 'Link', component: Link},
        {path: '/login_log', name: 'LoginLog', component: LoginLog},
        {path: '/system_log', name: 'SystemLog', component: SystemLog},
        {path: '/setting', name: 'Setting', component: Setting}
      ]
    },
    {path: '*', name: 'NotFound', component: NotFound},
    // {path: '*', redirect: '/404'}

  ]
})
