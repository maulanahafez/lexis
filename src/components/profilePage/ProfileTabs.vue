<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { gridOutline, heartOutline } from "ionicons/icons";

const props = defineProps<{
  activeSlide: number;
}>();

const emit = defineEmits<{
  changeActiveTabs: any;
}>();
</script>

<template>
  <div
    class="sticky -top-[2px] inset-x-0 bg-white shadow-md z-10 pt-1 cursor-pointer"
  >
    <div class="grid grid-cols-2 text-center">
      <div
        class="border-y-2 border-t-transparent py-1"
        @click="
          () => {
            emit('changeActiveTabs', 1);
          }
        "
        :class="
          props.activeSlide === 1
            ? 'border-b-[#0081C9]'
            : 'border-b-transparent'
        "
      >
        <IonIcon
          :icon="gridOutline"
          :class="props.activeSlide === 1 ? 'text-[#0081C9]' : ''"
        ></IonIcon>
      </div>

      <div
        class="border-y-2 border-t-transparent py-1"
        :class="
          props.activeSlide === 2
            ? 'border-b-[#0081C9]'
            : 'border-b-transparent'
        "
        @click="
          () => {
            emit('changeActiveTabs', 2);
          }
        "
      >
        <IonIcon
          :icon="heartOutline"
          :class="props.activeSlide === 2 ? 'text-[#0081C9]' : ''"
        ></IonIcon>
      </div>
    </div>
  </div>
</template>
