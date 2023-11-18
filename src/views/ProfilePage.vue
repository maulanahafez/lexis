<script setup lang="ts">
import AppTabs from "@/components/AppTabs.vue";
import ProfileCard from "@/components/profilePage/ProfileCard.vue";
import ProfileTabs from "@/components/profilePage/ProfileTabs.vue";
import { useUserStore } from "@/store/useUserStore";
import { useUserStoriesStore } from "@/store/useUserStoriesStore";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { ellipsisVerticalOutline } from "ionicons/icons";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const userStoriesStore = useUserStoriesStore();
const activeSlide = ref<number>(1);
const isLoading = ref<boolean>(true);

const changeActiveTabs = (active: number): void => {
  activeSlide.value = active;
};

onMounted(async () => {
  await userStoriesStore.getUserStories();
  isLoading.value = false;
});
</script>
<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonTitle>Profile</IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon :icon="ellipsisVerticalOutline"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="relative container mx-auto px-4 py-4">
        <ProfileCard :photoUrl="userStore.user.photoUrl!" :name="userStore.user.name!" :username="userStore.user.username!" :following="0" :followers="0" :likes="0" :bio="userStore.user.bio!" />
      </div>
      <ProfileTabs :activeSlide="activeSlide" @changeActiveTabs="changeActiveTabs" />
      <div v-auto-animate>
        <div class="relative container mx-auto px-4 pt-4 pb-20" v-if="activeSlide === 1" v-auto-animate>
          <div v-if="isLoading" class="grid grid-cols-3 gap-y-6">
            <div class="w-24 h-36 bg-black/10 mx-auto rounded-md shadow-sm animate-pulse"></div>
            <div class="w-24 h-36 bg-black/10 mx-auto rounded-md shadow-sm animate-pulse"></div>
            <div class="w-24 h-36 bg-black/10 mx-auto rounded-md shadow-sm animate-pulse"></div>
          </div>
          <div v-if="!isLoading" class="grid grid-cols-3 gap-y-6 gap-x-2">
            <div v-for="(story, index) of userStoriesStore.userStories" :key="index" class="">
              <img :src="story.cover_path!" alt="" class="w-24 h-36 mx-auto rounded-md shadow-sm hover:opacity-70 focus:opacity-70 object-cover ease-in-out transition-opacity duration-200" />
            </div>
          </div>
        </div>
        <div class="relative container mx-auto px-4 pt-4 pb-20" v-if="activeSlide === 2">
          <div class="grid grid-cols-3 gap-y-6">
            <div class="w-24 h-36 bg-green-200 mx-auto rounded-md shadow-sm focus:brightness-70 ease-in-out transition-all"></div>
            <div class="w-24 h-36 bg-green-200 mx-auto rounded-md shadow-sm focus:brightness-70 ease-in-out transition-all"></div>
            <div class="w-24 h-36 bg-green-200 mx-auto rounded-md shadow-sm focus:brightness-70 ease-in-out transition-all"></div>
          </div>
        </div>
      </div>
    </IonContent>
    <AppTabs />
  </IonPage>
</template>
