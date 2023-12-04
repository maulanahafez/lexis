<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore';

const props = defineProps<{
  activePage: number;
}>();
const emit = defineEmits<{
  changeActivePage: any;
}>();

const store = useUserStore();
</script>
<template>
  <div v-if="props.activePage === 3" class="h-screen py-8">
    <div class="flex flex-col h-full">
      <img
        src="@/assets/welcomePage/stationery.svg"
        alt=""
        class="m-auto h-60"
      />
      <div class="mt-auto">
        <div class="text-center max-w-xs mx-auto">
          <p class="font-bold text-3xl">Be a Storyteller</p>
          <p class="text-[#6A6767] text-lg mt-4">
            Embrace Your Creative Side and Publish Your Own Tales, Sharing Your
            Unique Stories with the World
          </p>
        </div>
        <div class="flex items-center justify-center gap-x-8 mt-8">
          <div class="h-2.5 w-2.5 rounded-full bg-black/20"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-black/20"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-[#0081C9]"></div>
        </div>
        <div
          @click="store.googleSignIn()"
          class="cursor-pointer text-xl mt-8 font-semibold border border-black rounded-full w-full hover:bg-black/20 focus:bg-black/20 transition-colors ease-in-out text-center"
        >
          <button class="px-4 py-3">
            <div class="flex items-center justify-center gap-x-4">
              <img
                src="@/assets/welcomePage/googleIcon.svg"
                alt=""
                class="w-5"
              />
              <span> Continue with Google </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
