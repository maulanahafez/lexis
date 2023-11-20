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
  IonPage,
  IonToolbar,
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const targetUserStore = useTargetUserStore();
const { id } = route.params;
const activeSlide = ref<number>(1);
const isLoading = ref<boolean>(true);

const changeActiveTabs = (active: number): void => {
  activeSlide.value = active;
};

onBeforeMount(async () => {
  await targetUserStore.getTargetUser(id);
  isLoading.value = false;
});

watch(
  () => route.params,
  async (toParams, previousParams) => {
    await targetUserStore.getTargetUser(id);
    isLoading.value = false;
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
      <div class="relative container mx-auto px-4 py-4">
        <ProfileCard
          :photoUrl="targetUserStore.targetUser.photoUrl!"
          :name="targetUserStore.targetUser.name!"
          :username="targetUserStore.targetUser.username!"
          :following="(targetUserStore.targetStats.following as number)"
          :followers="(targetUserStore.targetStats.followers as number)"
          :likes="(targetUserStore.targetStats.likes as number)"
          :bio="targetUserStore.targetUser.bio!"
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
          <div class="grid grid-cols-3 gap-y-6">
            <div
              class="w-24 h-36 bg-green-200 mx-auto rounded-md shadow-sm focus:brightness-70 ease-in-out transition-all"
            ></div>
            <div
              class="w-24 h-36 bg-green-200 mx-auto rounded-md shadow-sm focus:brightness-70 ease-in-out transition-all"
            ></div>
            <div
              class="w-24 h-36 bg-green-200 mx-auto rounded-md shadow-sm focus:brightness-70 ease-in-out transition-all"
            ></div>
          </div>
        </div>
      </div>
    </IonContent>
    <AppTabs />
  </IonPage>
</template>
