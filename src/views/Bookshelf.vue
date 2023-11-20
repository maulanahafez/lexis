<script setup lang="ts">
import AppTabs from "@/components/AppTabs.vue";
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButton } from "@ionic/vue";
import BookshelfCard from "@/components/bookshelf/BookshelfCard.vue";
import { useUserStore } from "@/store/useUserStore";
import { useUserStoriesStore } from "@/store/useUserStoriesStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const userStoriesStore = useUserStoriesStore();
const isLoading = ref<boolean>(true);

onMounted(async () => {
  await userStoriesStore.getUserStories();
  isLoading.value = false;
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Bookshelf</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonButton :router-link="{ path: '/bookshelf/add' }" color="primary" class="m-auto w-11/12 flex justify-center mt-5">Add New Story</IonButton>
      <!-- <IonButton :router-link="{ path: '/bookshelf/chapter' }" color="primary" class="m-auto w-11/12 flex justify-center mt-5">Add New Chapter</IonButton> -->
      <div v-if="isLoading" class="m-auto mt-5 w-11/12 space-y-3">
        <div class="animate-pulse flex space-x-4">
          <div class="w-32 h-44 rounded-lg bg-black/10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-black/10 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-black/10 rounded col-span-2"></div>
                <div class="h-2 bg-black/10 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-black/10 rounded"></div>
            </div>
            <div class="h-2 bg-black/10 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-black/10 rounded col-span-2"></div>
                <div class="h-2 bg-black/10 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-black/10 rounded"></div>
              <div class="h-2 bg-black/10 rounded"></div>
            </div>
          </div>
        </div>
        <div class="animate-pulse flex space-x-4">
          <div class="w-32 h-44 rounded-lg bg-black/10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-black/10 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-black/10 rounded col-span-2"></div>
                <div class="h-2 bg-black/10 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-black/10 rounded"></div>
            </div>
            <div class="h-2 bg-black/10 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-black/10 rounded col-span-2"></div>
                <div class="h-2 bg-black/10 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-black/10 rounded"></div>
              <div class="h-2 bg-black/10 rounded"></div>
            </div>
          </div>
        </div>
        <div class="animate-pulse flex space-x-4">
          <div class="w-32 h-44 rounded-lg bg-black/10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-black/10 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-black/10 rounded col-span-2"></div>
                <div class="h-2 bg-black/10 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-black/10 rounded"></div>
            </div>
            <div class="h-2 bg-black/10 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-black/10 rounded col-span-2"></div>
                <div class="h-2 bg-black/10 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-black/10 rounded"></div>
              <div class="h-2 bg-black/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isLoading">
        <div v-for="(story, index) in userStoriesStore.userStories" :key="index">
          <router-link :to="{ name: 'story', params: { storyId: story.id } }" style="text-decoration: none; color: inherit">
            <BookshelfCard :id="story.id!" :cover_path="story.cover_path!" :title="story.title!" :genre="story.genre!" :like="0" :chapter="0" :description="story.description!" />
          </router-link>
        </div>
      </div>
      <AppTabs />
    </IonContent>
  </IonPage>
</template>
