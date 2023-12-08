import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAllowed } from '../main'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'home',
      component: HomeView
    },
    {
      path: '/addBlog',
      name: 'addBlog',

      beforeEnter: (to, from, next) => {
        if (isAllowed) {
          next()
        } else {
          next('/signin')
        }
      },

      component: () => import('../views/AddBlogView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SigninView.vue')
    },
    {
      path: '/',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/forgotpass',
      name: 'forgotpass',
      component: () => import('../views/ForgotPassView.vue')
    },
    {
      path: '/resetpass',
      name: 'resetpass',
      component: () => import('../views/ResetPass.vue'),
      beforeEnter: (to, from, next) => {
        if (!isAllowed) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/editblog/:id',
      name: 'editblog',
      component: () => import('../views/EditBlogs.vue'),
      props: true
    }
  ]
})

export default router
