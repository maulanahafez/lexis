import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { IonicVue } from '@ionic/vue';
import axios from 'axios';
import 'dotenv';
import { initializeApp } from 'firebase/app';
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

/* TailwindCSS */
import './style/main.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/display.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
/* Theme variables */
import './theme/variables.css';

import { QuillEditor } from '@vueup/vue-quill';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const firebaseConfig = {
  apiKey: 'AIzaSyCB3yJBOXXPHSY3dHT249exPV1mchutZr0',
  authDomain: 'lexis-ca8e5.firebaseapp.com',
  projectId: 'lexis-ca8e5',
  storageBucket: 'lexis-ca8e5.appspot.com',
  messagingSenderId: '439357735038',
  appId: '1:439357735038:web:2c2de54b104f8cda4e982f',
  measurementId: 'G-59P8D44X9Z',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence);

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(createPinia())
  .use(autoAnimatePlugin);

app.component('QuillEditor', QuillEditor);

router.isReady().then(() => {
  app.mount('#app');
});
