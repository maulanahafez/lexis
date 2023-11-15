<script setup lang="ts">
import Welcome1 from '@/components/welcomePage/Welcome1.vue';
import Welcome2 from '@/components/welcomePage/Welcome2.vue';
import Welcome3 from '@/components/welcomePage/Welcome3.vue';
import { useUserStore } from '@/store/useUserStore';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { IonPage } from '@ionic/vue';
import { getAuth } from 'firebase/auth';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const auth = getAuth();
const store = useUserStore();
const router = useRouter();
const route = useRoute();
const activePage = ref<number>(1);

interface User {
  username?: string | undefined | null;
  bio?: string | undefined | null;
  story_preferences?: string | undefined | null;
}

const changeActivePage = () => {
  if (activePage.value + 1 >= 3) {
    activePage.value = 3;
  } else {
    activePage.value++;
  }
};

const restartActivePage = () => {
  activePage.value = 1;
};

watch(
  () => route.path == '/welcome',
  () => {
    restartActivePage();
  }
);

const opened = ref<boolean>(false);
</script>
<template>
  <IonPage>
    <div class="container mx-auto px-4" v-auto-animate>
      <Welcome1
        :activePage="activePage"
        @changeActivePage="changeActivePage()"
      />
      <Welcome2
        :activePage="activePage"
        @changeActivePage="changeActivePage()"
      />
      <Welcome3
        :activePage="activePage"
        @changeActivePage="changeActivePage()"
      />
    </div>
  </IonPage>
</template>
