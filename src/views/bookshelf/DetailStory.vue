<script setup lang="ts">
import { IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonButton, IonIcon } from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import { onMounted, ref } from "vue";
import { useUserStoriesStore } from "@/store/useUserStoriesStore";

import { useRoute } from "vue-router";

// const props = defineProps<{
//   id: number | null;
//   cover_path: string | null;
//   title: string | null;
//   genre: string | null;
//   like: number | 0;
//   chapter: number | 0;
//   description: string | null;
// }>();

// console.log(route.params.id);
// console.log(route);
const router = useRoute();
const userStoriesStore = useUserStoriesStore();
const isLoading = ref<boolean>(true);
const story = ref<any>(null);

onMounted(async () => {
  const storyId = Number(router.params.storyId);
  if (!isNaN(storyId)) {
    userStoriesStore.getStoryById(storyId).then((data) => {
      story.value = data;
      isLoading.value = false;
    });
  } else {
    console.error("Invalid storyId");
    isLoading.value = false;
  }
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div class="flex ion-align-items-center gap-3">
            <IonButton router-link="/bookshelf" fill="clear" class="ion-no-padding">
              <IonIcon :icon="chevronBackOutline" class="text-black" />
            </IonButton>
            Detail Story
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div>
        <!-- Row 1 -->
        <div class="w-full h-28 bg-[#293630]"></div>

        <!-- Row 2 -->
        <div>
          <div class="flex flex-col justify-center ion-align-items-center -translate-y-16">
            <img src="" alt="" class="w-28 h-40" />
            <div class="mt-2 text-center">
              <p class="text-base font-bold">Title</p>
              <p class="text-sm font-medium text-gray-400">Author</p>
            </div>
          </div>
          <div class="grid grid-cols-2 -translate-y-12">
            <div class="flex flex-col items-center justify-center">
              <p class="text-lg font-medium">25000</p>
              <p class="text-sm text-gray-400">Likes</p>
            </div>
            <div class="flex items-center justify-center">
              <p class="rounded-full text-sm bg-[#0081C9] text-white px-5 py-1">Genre</p>
            </div>
          </div>
          <div class="-translate-y-6 text-sm text-gray-400 mx-5">
            <p class="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nihil aliquam, sapiente at quam vel accusamus suscipit sequi tenetur nemo consequuntur quos? Cupiditate fugiat in deserunt nobis veniam, ad dignissimos rerum
              vel quae aperiam iure obcaecati officia illo molestias aut, eum pariatur, minima voluptatum! Est minus quas ipsam unde esse.
            </p>
          </div>
        </div>

        <div class="w-full h-[2px] bg-gray-200"></div>

        <!-- Row 3 -->
        <div class="mx-5 my-3">
          <p class="text-lg font-semibold">Chapters</p>
          <!-- <IonButton color="warning" class="w-full">Edit Story</IonButton> -->
          <IonButton router-link="/bookshelf/chapter" color="primary" class="w-full">Add New Chapter</IonButton>
        </div>

        <!-- Chapter List -->
        <ChapterListVue />
      </div>
    </IonContent>
  </IonPage>
</template>
