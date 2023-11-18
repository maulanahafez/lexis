<script setup lang="ts">
import { heartOutline, readerOutline } from "ionicons/icons";
import { defineProps } from "vue";
import { IonIcon } from "@ionic/vue";

const props = defineProps<{
  id: number | null;
  cover_path: string | null;
  title: string | null;
  genre: string | null;
  like: number | 0;
  chapter: number | 0;
  description: string | null;
}>();

const genreColor = (genre: string): string => {
  const genreColors: Record<string, string> = {
    Adventure: "#FF5733",
    Mystery: "#FF33A6",
    Fantasy: "#4CAF50",
    Romance: "#FF8C00",
    Thriller: "#9C27B0",
    Horror: "#607D8B",
    Historical: "#795548",
    Biography: "#2196F3",
    "Science Fiction": "#3377FF",
    "Non-Fiction": "#8377FF",
  };

  return genreColors[genre] || "#CCCCCC";
};
</script>

<template>
  <div class="flex gap-5 w-11/12 m-auto mt-5 overflow-hidden">
    <img v-if="$props.cover_path != null" :src="props.cover_path!" alt="" class="w-32 h-44 object-cover rounded-lg" />
    <img v-if="$props.cover_path == null" :src="props.cover_path!" alt="" class="w-32 h-44 rounded-lg" />
    <div class="space-y-2">
      <div>
        <p class="line-clamp-1 text-sm font-medium mb-2">{{ props.title }}</p>
        <div v-if="props.genre" :style="{ backgroundColor: genreColor(props.genre) }" class="inline-block rounded-full">
          <p class="text-white inline-block py-1 px-2 text-xs">{{ props.genre }}</p>
        </div>
      </div>
      <div class="flex gap-8">
        <div class="flex ion-align-items-center text-xs gap-x-1">
          <IonIcon :icon="heartOutline"></IonIcon>
          <p>{{ props.like ?? 0 }}</p>
        </div>
        <div class="flex ion-align-items-center text-xs gap-x-1">
          <IonIcon :icon="readerOutline"></IonIcon>
          <p>{{ props.chapter ?? 0 }}</p>
        </div>
      </div>
      <p class="line-clamp-4 text-justify text-xs">{{ props.description }}</p>
    </div>
  </div>
</template>
