<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore';
import { IonIcon } from '@ionic/vue';
import { heartOutline, readerOutline } from 'ionicons/icons';
import { computed } from 'vue';

const props = defineProps<{
  id: number | null;
  cover_path: string | null;
  title: string | null;
  genre: string | null;
  likes: number | 0;
  chapters_count: number | 0;
  description: string | null;
}>();

const userStore = useUserStore();
const cover = computed(() => {
  if (props.cover_path! !== undefined) {
    return props.cover_path!.startsWith('h')
      ? props.cover_path!
      : userStore.storagePath + props.cover_path!.replace('public/', '');
  }
  return '';
});

const genreColor = (genre: string): string => {
  const genreColors: Record<string, string> = {
    Adventure: '#FF5733',
    Mystery: '#FF33A6',
    Fantasy: '#4CAF50',
    Romance: '#FF8C00',
    Thriller: '#9C27B0',
    Horror: '#607D8B',
    Historical: '#795548',
    Biography: '#2196F3',
    'Science Fiction': '#3377FF',
    'Non-Fiction': '#8377FF',
  };

  return genreColors[genre] || '#CCCCCC';
};
</script>

<template>
  <div class="flex gap-5 w-11/12 m-auto mt-5 overflow-hidden">
    <img :src="cover" alt="" class="w-32 h-44 object-cover rounded-lg" />
    <div class="space-y-2">
      <div>
        <p class="line-clamp-1 text-sm font-medium mb-2">{{ props.title }}</p>
        <div
          v-if="props.genre"
          :style="{ backgroundColor: genreColor(props.genre) }"
          class="inline-block rounded-full"
        >
          <p class="text-white inline-block py-1 px-2 text-xs">
            {{ props.genre }}
          </p>
        </div>
      </div>
      <div class="flex gap-8">
        <div class="flex ion-align-items-center text-xs gap-x-1">
          <IonIcon :icon="heartOutline"></IonIcon>
          <p>{{ props.likes ?? 0 }}</p>
        </div>
        <div class="flex ion-align-items-center text-xs gap-x-1">
          <IonIcon :icon="readerOutline"></IonIcon>
          <p>{{ props.chapters_count ?? 0 }}</p>
        </div>
      </div>
      <p class="line-clamp-4 text-justify text-xs">{{ props.description }}</p>
    </div>
  </div>
</template>
