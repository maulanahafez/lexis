<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: number | null;
  index: number | null;
  title: string | null;
  story_user_id: number | null;
  user_id: number | null;
}>();

const router = useRouter();
</script>
<template>
  <div
    @click="router.push(`/chapter/${props.id}`)"
    class="space-y-2 border-b border-gray-400 py-4 px-1 hover:bg-gray-100 cursor-pointer"
  >
    <div class="flex items-center space-x-5 px-2">
      <p class="font-medium text-lg">{{ props.index! + 1 }}</p>
      <div>
        <p class="font-medium text-base">{{ props.title }}</p>
      </div>
    </div>
  </div>
</template>
