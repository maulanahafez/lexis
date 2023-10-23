import { IonicVue } from "@ionic/vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";
import App from "./App.vue";
import { firebaseApp } from "./firebase/firebase";
import router from "./router";

/* TailwindCSS */
import "./style/main.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/display.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
/* Theme variables */
import "./theme/variables.css";

const pinia = createPinia();
const app = createApp(App).use(IonicVue).use(router).use(pinia);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

router.isReady().then(() => {
  app.mount("#app");
});
