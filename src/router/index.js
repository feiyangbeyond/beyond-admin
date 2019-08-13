import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import Home from '../views/Home'
import Profile from '../views/secondary_view/Profile'
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
    {path: '/login', name: 'Login', component: Login, meta: {title: '登录'}},
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          mata:{title: '首页'}
        },
        {
          path: '/new',
          name: 'New',
          component: New,
          meta:{title: '发布文章'}
        },
        {
          path: '/articles',
          name: 'Article',
          component: Article,
          meta: {title: '文章列表'}
        },
        {
          path: '/comments',
          name: 'Comment',
          component: Comment,
          meta: {title: '评论管理'}
        },
        {
          path: '/category',
          name: 'Category',
          component: Category,
          meta: {title: '分类标签'}
        },
        {
          path: '/link',
          name: 'Link',
          component: Link,
          meta: {title: '友链管理'}
        },
        {
          path: '/log/login',
          name: 'LoginLog',
          component: LoginLog,
          meta: {title: '登录日志'}
        },
        {
          path: '/log/system',
          name: 'SystemLog',
          component: SystemLog,
          meta: {title: '系统日志'}
        },
        {
          path: '/setting',
          name: 'Setting',
          component: Setting,
          meta: {title: '系统设置'}
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {title: '404'}
    },
    // {path: '*', redirect: '/404'}

  ]
})
