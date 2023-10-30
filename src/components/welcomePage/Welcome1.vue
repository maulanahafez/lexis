<script setup lang="ts">
const props = defineProps<{
  activePage: number;
}>();

const emit = defineEmits<{
  changeActivePage: any;
}>();
</script>
<template>
  <div v-if="props.activePage === 1" class="h-screen py-8">
    <div class="flex flex-col h-full">
      <img src="@/assets/welcomePage/book.svg" alt="" class="m-auto h-60" />
      <div class="mt-auto">
        <div class="text-center max-w-xs mx-auto">
          <p class="font-bold text-3xl">Welcome To Lexis</p>
          <p class="text-[#6A6767] text-lg mt-4">
            A Platform That Invites You to Explore, Share, and Craft Your Own
            Fascinating Stories
          </p>
        </div>
        <div class="flex items-center justify-center gap-x-8 mt-8">
          <div class="h-2.5 w-2.5 rounded-full bg-[#0081C9]"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-black/20"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-black/20"></div>
        </div>
        <div>
          <button
            @click="() => emit('changeActivePage')"
            class="text-white text-xl bg-[#0081C9] mt-8 font-semibold px-4 py-2 rounded-full w-full inline-block hover:bg-opacity-80 focus:bg-opacity-80 transition-colors ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
