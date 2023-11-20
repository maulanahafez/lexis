<template>
  <kProvider>
    <!-- max-w-md mx-auto -->
    <IonApp class="text-black">
      <IonRouterOutlet />
    </IonApp>
  </kProvider>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { kProvider } from 'konsta/vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './store/useUserStore';

const auth = getAuth();
const router = useRouter();
const store = useUserStore();
onAuthStateChanged(auth, (u) => {
  if (u) {
    store.getUser();
    router.push('/home');
  } else {
    router.push('/welcome');
  }
});
</script>
