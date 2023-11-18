<<<<<<< HEAD
import ProfilePage from "@/views/ProfilePage.vue";
import WelcomePage from "@/views/WelcomePage.vue";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import BookshelfPage from "@/views/Bookshelf.vue";
import BookshelfAdd from "@/views/bookshelf/AddStory.vue";
import BookshelfStory from "@/views/bookshelf/DetailStory.vue";
import BookshelfChapter from "@/views/bookshelf/AddChapter.vue";
import BookshelfChapterContent from "@/views/bookshelf/ChapterContent.vue";
=======
import HomePage from '@/views/HomePage.vue';
import SearchPage from '@/views/SearchPage.vue';
import WelcomePage from '@/views/WelcomePage.vue';
import ProfilePage from '@/views/profile/ProfilePage.vue';
import ProfileSettingPage from '@/views/profile/SettingPage.vue';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
>>>>>>> f3a64e93de620f4432f75e266cf046c26ed78e16

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
<<<<<<< HEAD
    path: "/bookshelf",
    name: "Bookshelf",
    component: BookshelfPage,
  },
  {
    path: "/bookshelf/add",
    name: "Bookshelf Add",
    component: BookshelfAdd,
  },
  {
    path: "/bookshelf/story/:storyId",
    name: "story",
    component: BookshelfStory,
    props: true,
  },
  {
    path: "/bookshelf/chapter",
    name: "Chapter",
    component: BookshelfChapter,
  },
  {
    path: "/bookshelf/chapter/content",
    name: "Chapter Content",
    component: BookshelfChapterContent,
  },
  {
    path: "/profile",
    name: "Profile",
=======
    path: '/profile',
    name: 'Profile',
>>>>>>> f3a64e93de620f4432f75e266cf046c26ed78e16
    component: ProfilePage,
  },
  {
    path: '/profile/setting',
    name: 'Profile Setting',
    component: ProfileSettingPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
