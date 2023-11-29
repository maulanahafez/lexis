import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFlashStore = defineStore('flash', function () {
  const show = ref(false);

  const handleFlash = async () => {
    show.value = true;
    await setTimeout(() => {
      show.value = false;
    }, 3000);
  };

  return { show, handleFlash };
});
