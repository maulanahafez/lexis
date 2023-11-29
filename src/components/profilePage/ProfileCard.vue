<script setup lang="ts">
import { useTargetUserStore } from '@/store/useTargetUserStore';
import { IonSpinner } from '@ionic/vue';
import { ref } from 'vue';

const props = defineProps<{
  isProfile?: boolean;
  id: number | null;
  photoUrl: string | null;
  name: string | null;
  username: string | null;
  following: number | 0;
  followers: number | 0;
  likes: number | 0;
  bio: string | null;
  isFollowsTarget?: boolean | null;
}>();

const targetUserStore = useTargetUserStore();
const isLoading = ref(false);

const handleFollow = async () => {
  isLoading.value = true;
  await targetUserStore.followTarget();
  isLoading.value = false;
};
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
  <div class="text-center mt-6" v-if="!props.isProfile">
    <button
      v-if="!props.isFollowsTarget"
      @click="handleFollow()"
      type="button"
      :disabled="isLoading"
      class="focus:ring-4 inline-block relative text-sm px-6 py-1.5 ring-1 ring-[#0081C9] overflow-hidden bg-[#0081C9] text-white rounded-md"
    >
      <span
        class="absolute inset-0 flex items-center justify-center bg-white"
        v-if="isLoading"
      >
        <IonSpinner name="dots"></IonSpinner>
      </span>
      <span> Follow </span>
    </button>
    <button
      v-if="props.isFollowsTarget"
      @click="handleFollow()"
      type="button"
      :disabled="isLoading"
      class="focus:ring-4 inline-block relative text-sm px-6 py-1.5 ring-1 ring-[#0081C9] overflow-hidden text-gray-700 rounded-md"
    >
      <span
        class="absolute inset-0 flex items-center justify-center bg-white"
        v-if="isLoading"
      >
        <IonSpinner name="dots"></IonSpinner>
      </span>
      <span> Following </span>
    </button>
  </div>
  <p class="text-xs opacity-90 mt-4 line-clamp-4">
    {{ props.bio! }}
  </p>
</template>
