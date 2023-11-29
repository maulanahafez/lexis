<script setup lang="ts">
import AppTabs from '@/components/AppTabs.vue';
import ProfileCard from '@/components/profilePage/ProfileCard.vue';
import ProfileTabs from '@/components/profilePage/ProfileTabs.vue';
import { useUserStore } from '@/store/useUserStore';
import { useUserStoriesStore } from '@/store/useUserStoriesStore';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { ellipsisVerticalOutline, heart } from 'ionicons/icons';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const userStoriesStore = useUserStoriesStore();
const activeSlide = ref<number>(1);
const isLoading = ref<boolean>(true);

const changeActiveTabs = (active: number): void => {
  activeSlide.value = active;
};

const getUserStories = async () => {
  await userStoriesStore.getUserStories();
};

const getUserLiked = async () => {
  await userStoriesStore.getUserLiked();
};

const getUserStats = async () => {
  const res = await userStore.getStats();
};

onBeforeMount(async () => {
  isLoading.value = true;
  await getUserStories();
  await getUserStats();
  await getUserLiked();
  isLoading.value = false;
});

watch(
  () => route.path,
  async (newValue, oldValue) => {
    if (newValue === '/profile') {
      isLoading.value = true;
      await getUserStories();
      await getUserStats();
      await getUserLiked();
      isLoading.value = false;
    }
  }
);
</script>
<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonTitle>Profile</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="router.push('/profile/setting')">
            <IonIcon :icon="ellipsisVerticalOutline"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="relative container mx-auto px-4 py-4">
        <ProfileCard
          :isProfile="true"
          :id="Number(userStore.user.id)"
          :photoUrl="userStore.user.photoUrl!"
          :name="userStore.user.name!"
          :username="userStore.user.username!"
          :following="(userStore.stats.following as number)"
          :followers="(userStore.stats.followers as number)"
          :likes="(userStore.stats.likes as number)"
          :bio="userStore.user.bio!"
        />
      </div>
      <ProfileTabs
        :activeSlide="activeSlide"
        @changeActiveTabs="changeActiveTabs"
      />
      <div v-auto-animate>
        <div
          class="relative container mx-auto px-4 pt-4 pb-20"
          v-if="activeSlide === 1"
          v-auto-animate
        >
          <div v-if="isLoading" class="grid grid-cols-3 gap-y-6">
            <div
              class="w-24 h-36 bg-black/10 mx-auto rounded-md shadow-sm animate-pulse"
            ></div>
            <div
              class="w-24 h-36 bg-black/10 mx-auto rounded-md shadow-sm animate-pulse"
            ></div>
            <div
              class="w-24 h-36 bg-black/10 mx-auto rounded-md shadow-sm animate-pulse"
            ></div>
          </div>
          <div v-if="!isLoading" class="grid grid-cols-3 gap-y-6 gap-x-2">
            <div
              v-for="(story, index) of userStoriesStore.userStories"
              :key="index"
              @click="
                router.push({ name: 'Target Story', params: { id: story.id } })
              "
            >
              <img
                :src="story.cover_path!"
                alt=""
                class="w-24 h-36 mx-auto rounded-md cursor-pointer shadow-sm hover:opacity-70 focus:opacity-70 object-cover ease-in-out transition-opacity duration-200"
              />
            </div>
          </div>
        </div>
        <div
          class="relative container mx-auto px-4 pt-4 pb-20"
          v-if="activeSlide === 2"
        >
          <div
            v-if="!isLoading"
            v-for="(chapter, index) of userStoriesStore.userLiked"
            @click="
              router.push({
                name: 'Target Chapter',
                params: { id: chapter.chapter.id },
              })
            "
            class="border-b border-gray-400 py-3 px-2 hover:bg-gray-50"
          >
            <p class="text-lg font-medium line-clamp-1">
              {{ chapter.chapter.story.title }}
            </p>
            <p class="mt-1 line-clamp-1">{{ chapter.chapter.title }}</p>
            <div class="mt-2 text-gray-400 text-sm flex items-center gap-x-3">
              <IonIcon :icon="heart" color="danger"></IonIcon>
              <span>{{ userStoriesStore.dateLiked[index] }}</span>
            </div>
          </div>
          <div v-else class="mt-40 flex items-center justify-center">
            <IonSpinner name="dots" class="scale-[200%]"></IonSpinner>
          </div>
        </div>
      </div>
    </IonContent>
    <AppTabs />
  </IonPage>
</template>
