import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//       return {
//         path: "/home",
//         // query: {
//         //   redirect: to.fullPath,
//         // },
//       };
//     }
//   }
//   next();
// });

export default router;
