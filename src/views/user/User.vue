<script setup lang="ts">
import AppTabs from '@/components/AppTabs.vue';
import ProfileCard from '@/components/profilePage/ProfileCard.vue';
import ProfileTabs from '@/components/profilePage/ProfileTabs.vue';
import { useTargetUserStore } from '@/store/useTargetUserStore';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonToolbar,
} from '@ionic/vue';
import { chevronBack, heart } from 'ionicons/icons';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const targetUserStore = useTargetUserStore();
const { id } = route.params;
const activeSlide = ref<number>(1);
const isLoading = ref<boolean>(true);

const changeActiveTabs = (active: number): void => {
  activeSlide.value = active;
};

onBeforeMount(async () => {
  isLoading.value = true;
  await targetUserStore.getTargetUser(id);
  await targetUserStore.getTargetLiked(id);
  isLoading.value = false;
});

watch(
  () => route.params,
  async (toParams) => {
    if (toParams.id !== undefined) {
      isLoading.value = true;
      await targetUserStore.getTargetUser(id);
      await targetUserStore.getTargetLiked(id);
      isLoading.value = false;
    }
  }
);
</script>
<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton :icon="chevronBack"></IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div v-if="isLoading" class="mt-80 flex items-center justify-center">
        <IonSpinner name="dots" class="scale-[200%]"></IonSpinner>
      </div>
      <div v-else>
        <div class="relative container mx-auto px-4 py-4">
          <ProfileCard
            :id="Number(targetUserStore.targetUser.id)"
            :photoUrl="targetUserStore.targetUser.photoUrl!"
            :name="targetUserStore.targetUser.name!"
            :username="targetUserStore.targetUser.username!"
            :following="(targetUserStore.targetStats.following as number)"
            :followers="(targetUserStore.targetStats.followers as number)"
            :likes="(targetUserStore.targetStats.likes as number)"
            :bio="targetUserStore.targetUser.bio!"
            :isFollowsTarget="targetUserStore.isFollowsTarget"
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
                v-for="(story, index) of targetUserStore.targetStories"
                :key="index"
                class=""
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
              v-for="(chapter, index) of targetUserStore.targetLiked"
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
                <span>{{ targetUserStore.dateLiked[index] }}</span>
              </div>
            </div>
            <div v-else class="mt-40 flex items-center justify-center">
              <IonSpinner name="dots" class="scale-[200%]"></IonSpinner>
            </div>
          </div>
        </div>
      </div>
      <AppTabs />
    </IonContent>
  </IonPage>
</template>
