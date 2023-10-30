<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  photoUrl: string | null;
  name: string | null;
  username: string | null;
  following: number | 0;
  followers: number | 0;
  likes: number | 0;
  bio: string | null;
}>();
</script>
<template>
  <img
    :src="props.photoUrl!"
    alt=""
    class="mx-auto w-20 h-20 rounded-full border-2 border-[#0081C9]"
  />
  <div class="text-center mt-4">
    <p class="font-semibold">{{ props.name! }}</p>
    <p class="text-sm opacity-75">@{{ props.username! }}</p>
  </div>
  <div class="grid grid-cols-3 text-center mt-6">
    <div>
      <p class="text-sm">{{ props.following ?? 0 }}</p>
      <p class="text-xs opacity-75">Following</p>
    </div>
    <div>
      <p class="text-sm">{{ props.followers ?? 0 }}</p>
      <p class="text-xs opacity-75">Followers</p>
    </div>
    <div>
      <p class="text-sm">{{ props.likes ?? 0 }}</p>
      <p class="text-xs opacity-75">Likes</p>
    </div>
  </div>
  <p class="text-xs opacity-90 mt-4 line-clamp-4">
    {{ props.bio! }}
  </p>
</template>
