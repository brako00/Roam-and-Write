import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import BlogsView from '@/views/BlogsView.vue'
import SingleBlog from '@/components/SingleBlog.vue'
import NewBlog from '@/components/NewBlog.vue'
import MyAccount from '@/components/MyAccount.vue'
import BloggersView from '@/views/BloggersView.vue'
import LoginForm from '@/components/LoginForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterForm
  },
  { path: '/blogs', name: 'blogs', component: BlogsView },
  { path: '/blogs/:id', name: 'blog', component: SingleBlog },
  { path: '/new', name: 'new', component: NewBlog },
  { path: '/myAccount', name: 'myAccount', component: MyAccount },
  { path: '/bloggers', name: 'bloggers', component: BloggersView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
