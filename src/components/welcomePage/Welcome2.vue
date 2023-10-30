<script setup lang="ts">
const props = defineProps<{
  activePage: number;
}>();

const emit = defineEmits<{
  changeActivePage: any;
}>();
</script>
<template>
  <div v-if="props.activePage === 2" class="h-screen py-8">
    <div class="flex flex-col h-full">
      <img
        src="@/assets/welcomePage/telescope.svg"
        alt=""
        class="m-auto h-60"
      />
      <div class="mt-auto">
        <div class="text-center max-w-xs mx-auto">
          <p class="font-bold text-3xl">Dive into the World of Words</p>
          <p class="text-[#6A6767] text-lg mt-4">
            Explore a World of Stories That Will Captivate Your Imagination and
            Keep You Engaged for Hours
          </p>
        </div>
        <div class="flex items-center justify-center gap-x-8 mt-8">
          <div class="h-2.5 w-2.5 rounded-full bg-black/20"></div>
          <div class="h-2.5 w-2.5 rounded-full bg-[#0081C9]"></div>
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
