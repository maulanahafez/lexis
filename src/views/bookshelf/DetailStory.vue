<script setup lang="ts">
import ChapterListVue from '@/components/bookshelf/ChapterList.vue';
import { useFlashStore } from '@/store/useFlashStore';
import { useUserStore } from '@/store/useUserStore';
import { useUserStoriesStore } from '@/store/useUserStoriesStore';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  toastController,
} from '@ionic/vue';
import {
  chevronBackOutline,
  createOutline,
  trashOutline,
} from 'ionicons/icons';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStoriesStore = useUserStoriesStore();
const userStore = useUserStore();
const flashStore = useFlashStore();
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
  if (story.value.chapters.length) {
    return story.value.chapters.slice().sort((a, b) => {
      return (a.order_num || 0) - (b.order_num || 0);
    });
  }
});

const cover = computed(() => {
  if (story.value.cover_path! !== undefined) {
    return story.value.cover_path?.startsWith('h')
      ? story.value.cover_path
      : userStore.storagePath + story.value.cover_path?.replace('public/', '');
  }
  return '';
});

const getStory = async (storyId: number) => {
  isLoading.value = true;
  const data = await userStoriesStore.getStoryById(storyId);
  story.value = data;
  isLoading.value = false;
};

const handleRefresh = async (event: any) => {
  await getStory(story.value.id!);
  event.target?.complete();
};

const handleChapterDelete = async (id: number | string) => {
  const res = await userStoriesStore.deleteChapter(id);
  if (res) {
    const toast = toastController.create({
      message: 'Berhasil Hapus Chapter',
      position: 'bottom',
      duration: 2000,
    });
    (await toast).present();
    isLoading.value = false;
    await getStory(Number(story.value.id));
  }
};

const deleteStory = async () => {
  const res = await userStoriesStore.deleteStory(Number(route.params.storyId));
  if (res) {
    router.push({ name: 'Bookshelf' });
  }
};

const alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {},
  },
  {
    text: 'OK',
    role: 'confirm',
    handler: () => {
      deleteStory();
    },
  },
];

const isOpen = ref(false);
const setOpen = (state: boolean) => {
  isOpen.value = state;
};

onMounted(async () => {
  if (route.params.storyId !== undefined) {
    await getStory(Number(route.params.storyId));
  }
});

watch(
  [() => flashStore.show, () => route.path],
  async ([newFlash, newPath]) => {
    if (newFlash && newPath == `/bookshelf/${story.value.id}`) {
      await getStory(story.value.id!);
    }
  }
);
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div class="flex ion-align-items-center gap-3">
            <IonButton
              router-link="/bookshelf"
              fill="clear"
              class="ion-no-padding"
            >
              <IonIcon :icon="chevronBackOutline" class="text-black" />
            </IonButton>
            Detail Story
          </div>
        </IonTitle>
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
          <div class="flex gap-x-2">
            <button
              @click="
                router.push({
                  name: 'Story Edit',
                  params: { storyId: story.id },
                })
              "
              type="button"
              class="hidden bg-green-500 text-white px-4 py-3 rounded-md space-x-2"
            >
              <IonIcon :icon="createOutline"></IonIcon>
              <span>Edit</span>
            </button>
            <button
              @click="setOpen(true)"
              type="button"
              class="bg-red-500 text-white px-4 py-3 rounded-md space-x-2"
            >
              <IonIcon :icon="trashOutline"></IonIcon>
              <span>Delete</span>
            </button>
          </div>
        </div>

        <!-- Row 3 -->
        <div class="container mx-auto px-4 py-4 max-w-[1280px]">
          <p class="text-lg font-semibold">Chapters</p>
          <div class="mt-4" v-if="userStore.user.id == story.user.id">
            <IonButton
              :router-link="`/bookshelf/${story.id}/chapter/create`"
              color="primary"
              class="w-full capitalize"
            >
              Add New Chapter
            </IonButton>
          </div>
          <div>
            <ChapterListVue
              v-for="(chapter, index) in chapters"
              :key="index"
              :id="chapter.id"
              :index="index"
              :title="chapter.title"
              :story_user_id="Number(story.user.id)"
              :user_id="Number(userStore.user.id!)"
              @onDelete="handleChapterDelete"
            />
          </div>
        </div>
      </div>

      <IonAlert
        :is-open="isOpen"
        header="Delete Confirmation!"
        message="Apakah Anda yakin ingin menghapus Story ini?"
        :buttons="alertButtons"
        @didDismiss="setOpen(false)"
      ></IonAlert>
    </IonContent>
  </IonPage>
</template>
