import BookshelfPage from '@/views/Bookshelf.vue';
import HomePage from '@/views/HomePage.vue';
import SearchPage from '@/views/SearchPage.vue';
import WelcomePage from '@/views/WelcomePage.vue';
import AddChapter from '@/views/bookshelf/AddChapter.vue';
import AddStory from '@/views/bookshelf/AddStory.vue';
import DetailStory from '@/views/bookshelf/DetailStory.vue';
import EditChapter from '@/views/bookshelf/EditChapter.vue';
import EditStory from '@/views/bookshelf/EditStory.vue';
import ProfilePage from '@/views/profile/ProfilePage.vue';
import ProfileSettingPage from '@/views/profile/SettingPage.vue';
import TargetStoryChapter from '@/views/targetStory/Chapter.vue';
import TargetStoryStory from '@/views/targetStory/Story.vue';
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
    component: BookshelfPage,
  },
  {
    path: '/bookshelf/create',
    name: 'Story Create',
    component: AddStory,
  },
  {
    path: '/bookshelf/:storyId',
    name: 'Story',
    component: DetailStory,
    props: true,
  },
  {
    path: '/bookshelf/:storyId/edit',
    name: 'Story Edit',
    component: EditStory,
  },
  {
    path: '/bookshelf/:storyId/chapter/create',
    name: 'Chapter Create',
    component: AddChapter,
  },
  {
    path: '/bookshelf/chapter/:chapterId/edit',
    name: 'Chapter Edit',
    component: EditChapter,
  },
  // {
  //   path: '/bookshelf/chapter/content',
  //   name: 'Chapter Content',
  //   component: BookshelfChapterContent,
  // },
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
  {
    path: '/story/:id',
    name: 'Target Story',
    component: TargetStoryStory,
  },
  {
    path: '/chapter/:id',
    name: 'Target Chapter',
    component: TargetStoryChapter,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
