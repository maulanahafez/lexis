<script setup lang="ts">
import AppTabs from '@/components/AppTabs.vue';
import ChapterListVue from '@/components/targetStory/ChapterList.vue';
import { useTargetStoryStore } from '@/store/useTargetStoryStore';
import { useUserStore } from '@/store/useUserStore';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const targetStoryStore = useTargetStoryStore();
const userStore = useUserStore();
const isLoading = ref<boolean>(true);

const story = ref<{
  id: number | null;
  title: string | null;
  genre: string | null;
  description: string | null;
  cover_path: string | null;
  is_published: number | null;
  likes: number | null;
  chapters: {
    id: number | null;
    story_id: number | null;
    title: string | null;
    order_num: number | null;
    is_published: number | null;
  }[];
  user: {
    id: number | null;
    username: string | null;
  };
}>({
  id: null,
  title: null,
  genre: null,
  description: null,
  cover_path: null,
  is_published: null,
  likes: 0,
  chapters: [],
  user: {
    id: null,
    username: null,
  },
});

const chapters = computed(() => {
  if (story.value.chapters) {
    return story.value.chapters.slice().sort((a, b) => {
      return (a.order_num || 0) - (b.order_num || 0);
    });
  }
});

const cover = computed(() => {
  if (story.value.cover_path !== undefined && story.value.cover_path !== null) {
    return story.value.cover_path?.startsWith('h')
      ? story.value.cover_path
      : userStore.storagePath + story.value.cover_path?.replace('public/', '');
  }
  return '';
});

const getStory = async () => {
  isLoading.value = true;
  const data = await targetStoryStore.getStory(route.params.id);
  story.value = data;
  isLoading.value = false;
};

const handleRefresh = async (event: any) => {
  await getStory();
  event.target?.complete();
};

onMounted(async () => {
  if (route.params.id !== undefined) {
    await getStory();
  }
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton :icon="chevronBack"></IonBackButton>
        </IonButtons>
        <IonTitle> Detail Story </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div v-if="isLoading" class="mt-80 flex items-center justify-center">
        <IonSpinner name="dots" class="scale-[200%]"></IonSpinner>
      </div>
      <div v-else>
        <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <!-- Row 1 -->
        <div class="w-full h-28 bg-[#293630]"></div>

        <!-- Row 2 -->
        <div
          class="container mx-auto px-4 max-w-[1280px] pb-4 border-b border-gray-400"
        >
          <div
            class="flex flex-col justify-center ion-align-items-center -translate-y-16"
          >
            <img
              :src="cover"
              alt=""
              class="w-28 h-40 object-cover object-center rounded-md"
            />
            <div class="mt-4 text-center">
              <p class="text-base font-bold px-10">
                {{ story.title }}
              </p>
              <p class="text-sm mt-1 font-medium text-gray-400">
                {{ story.user.username }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 -translate-y-12">
            <div class="flex flex-col items-center justify-center">
              <p class="text-lg font-medium">{{ story.likes }}</p>
              <p class="text-sm text-gray-400">Likes</p>
            </div>
            <div class="flex items-center justify-center">
              <p class="rounded-full text-sm px-4 bg-[#0081C9] text-white py-1">
                {{ story.genre }}
              </p>
            </div>
          </div>
          <div class="-translate-y-6 text-sm text-gray-400">
            <p class="text-justify">
              {{ story.description }}
            </p>
          </div>
        </div>

        <!-- Row 3 -->
        <div class="container mx-auto px-4 py-4 max-w-[1280px]">
          <p class="text-lg font-semibold">Chapters</p>
          <div class="mt-2">
            <ChapterListVue
              v-if="chapters?.length! >0"
              v-for="(chapter, index) in chapters"
              :key="index"
              :id="chapter.id"
              :index="index"
              :title="chapter.title"
              :story_user_id="Number(story.user.id)"
              :user_id="Number(userStore.user.id!)"
            />
            <div v-else class="text-lg text-gray-400 font-medium">
              No Chapters
            </div>
          </div>
        </div>
      </div>
      <AppTabs />
    </IonContent>
  </IonPage>
</template>
