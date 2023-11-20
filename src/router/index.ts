import BookshelfPage from '@/views/Bookshelf.vue';
import HomePage from '@/views/HomePage.vue';
import WelcomePage from '@/views/WelcomePage.vue';
import BookshelfChapter from '@/views/bookshelf/AddChapter.vue';
import BookshelfAdd from '@/views/bookshelf/AddStory.vue';
import BookshelfChapterContent from '@/views/bookshelf/ChapterContent.vue';
import BookshelfStory from '@/views/bookshelf/DetailStory.vue';
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
    component: HomePage,
  },
  {
    path: '/bookshelf',
    name: 'Bookshelf',
    component: BookshelfPage,
  },
  {
    path: '/bookshelf/add',
    name: 'Bookshelf Add',
    component: BookshelfAdd,
  },
  {
    path: '/bookshelf/story/:storyId',
    name: 'story',
    component: BookshelfStory,
    props: true,
  },
  {
    path: '/bookshelf/chapter',
    name: 'Chapter',
    component: BookshelfChapter,
  },
  {
    path: '/bookshelf/chapter/content',
    name: 'Chapter Content',
    component: BookshelfChapterContent,
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
