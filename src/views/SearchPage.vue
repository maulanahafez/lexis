<script setup lang="ts">
import AppTabsVue from '@/components/AppTabs.vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from '@ionic/vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

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

const router = useRouter();
const searchTerm = ref('');
const searchResults = ref<Recommendation>({});
const getStories = async () => {
  const res = await axios.get('stories/search', {
    params: { s: searchTerm.value },
  });
  searchResults.value = res.data;
};

onMounted(() => {});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonSearchbar
          class="!shadow-none"
          v-model="searchTerm"
          placeholder="Search stories"
          @ionBlur="getStories()"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div class="container mx-auto px-4 pt-2 pb-24 space-y-12">
        <template v-for="(story, category) of searchResults" :key="category">
          <div class="story" v-if="category !== 'authors'">
            <h4>Stories</h4>
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
            <h4>Authors</h4>
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
        <!-- <p>{{ searchTerm }}</p>
        <pre
          >{{ searchResults }}
        </pre> -->
      </div>
      <AppTabsVue />
    </IonContent>
  </IonPage>
</template>

<style scoped>
.sc-ion-searchbar-md-h {
  --box-shadow: none !important;
}
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
