import HomePage from '@/views/HomePage.vue';
import SearchPage from '@/views/SearchPage.vue';
import WelcomePage from '@/views/WelcomePage.vue';
import ProfilePage from '@/views/profile/ProfilePage.vue';
import ProfileSettingPage from '@/views/profile/SettingPage.vue';
import User from '@/views/user/User.vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: WelcomePage,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
  {
    path: '/bookshelf',
    name: 'Bookshelf',
    component: HomePage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
  {
    path: '/profile/setting',
    name: 'Profile Setting',
    component: ProfileSettingPage,
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
