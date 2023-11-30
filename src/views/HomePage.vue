<script setup lang="ts">
import AppTabs from '@/components/AppTabs.vue';
import { useUserStore } from '@/store/useUserStore';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Recommendation {
  [category: string]: {
    id?: number | null;
    title?: string | null;
    genre?: string | null;
    cover_path?: string | null;
    name?: string | null;
    photoUrl?: string | null;
    user_id?: string | null;
    created_at?: string | null;
  }[];
}

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
// const stories = ref({});
const stories = ref<Recommendation>({});

// const cover = computed(() => {
//   return stories.((category: any) => {
//     if (category.cover_path !== undefined && category.cover_path !== null) {
//       return category.cover_path.startsWith('h')
//         ? category.cover_path
//         : userStore.storagePath + category.cover_path.replace('public/', '');
//     }
//     return '';
//   });
// });

const getRecommendation = async () => {
  const res = await axios.post('stories/recommendation', {
    preferences: userStore.user.story_preferences?.split('~') ?? [],
  });
  stories.value = res.data;
};

const handleRefresh = async (event: any) => {
  await getRecommendation();
  event.target?.complete();
};

onMounted(async () => {
  if (userStore.user.id) {
    await getRecommendation();
  }
});

watch(
  () => route.path,
  async (newValue, oldValue) => {
    if (newValue === '/home' && userStore.user.id) {
      await getRecommendation();
    }
  }
);

watch(
  () => userStore.user.id,
  async () => {
    await getRecommendation();
  }
);
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle> Home </IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <div class="container mx-auto px-4 pt-2 pb-24 space-y-12">
        <template v-for="(story, category) of stories" :key="category">
          <div class="story" v-if="category !== 'user'">
            <h4>{{ category }} Stories</h4>
            <div class="slide mt-4">
              <div
                @click="
                  router.push({ name: 'Target Story', params: { id: item.id } })
                "
                class="slides cursor-pointer"
                v-for="(item, index) of story"
                :key="String(item.id)"
              >
                <img
                  :src="item.cover_path!"
                  alt=""
                  class="object-cover object-center rounded-md w-24 h-36"
                />
                <p
                  style="font-size: small; align-items: center"
                  class="line-clamp-3"
                >
                  {{ item.title }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <h4>Authors You Might Like</h4>
            <div class="slide mt-4 !gap-x-4">
              <div
                class="slides !w-[80px] cursor-pointer"
                v-for="(item, index) of story"
                :key="index"
                @click="router.push(`user/${item.user_id}`)"
              >
                <img
                  :src="item.photoUrl!"
                  alt=""
                  class="w-full h-[80px] object-cover object-center aspect-square rounded-full"
                />
                <p
                  style="font-size: small; align-items: center"
                  class="mt-2 line-clamp-2"
                >
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </template>
        <!-- <pre>{{ cover }}</pre> -->
        <!-- <pre>{{ stories }}</pre> -->
        <!-- <pre>{{ userStore.user.story_preferences?.split('~') }}</pre> -->

        <div class="popular"></div>
      </div>

      <div class="bar"></div>
      <AppTabs></AppTabs>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.slides {
  flex-shrink: 0;
  scroll-snap-type: x var(--tw-scroll-snap-strictness);
  width: 100px;
}
.slide {
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-snap-align: start;
}

.slide::-webkit-scrollbar {
  display: none;
}
</style>
