<script setup lang="ts">
import { IonAlert, IonButton, IonIcon } from '@ionic/vue';
import { createOutline, trashOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  id: number | null;
  index: number | null;
  title: string | null;
  story_user_id: number | null;
  user_id: number | null;
}>();

const emit = defineEmits<{
  onDelete: [id: number | string];
}>();

const deleteChapter = () => {
  console.log(selectedId.value);
  emit('onDelete', selectedId.value!);
};

const alertButtons = [
  {
    text: 'Cancel',
    role: 'cancel',
    handler: () => {},
  },
  {
    text: 'OK',
    role: 'confirm',
    handler: () => {
      deleteChapter();
    },
  },
];

const router = useRouter();
const isOpen = ref(false);
const selectedId = ref(null);
const setOpen = (state: boolean, id: any) => {
  isOpen.value = state;
  selectedId.value = id;
};
</script>
<template>
  <div class="mt-5 space-y-2">
    <div class="w-full h-[2px] bg-gray-300"></div>
    <div class="flex items-center space-x-5">
      <p class="font-medium text-lg">{{ props.index! + 1 }}</p>
      <div>
        <p class="font-medium text-base">{{ props.title }}</p>
        <div class="space-x-2" v-if="props.story_user_id == props.user_id">
          <IonButton
            color="success"
            @click="
              router.push({
                name: 'Chapter Edit',
                params: { chapterId: props.id! },
              })
            "
          >
            <IonIcon :icon="createOutline"></IonIcon>
          </IonButton>
          <IonButton color="danger" @click="setOpen(true, props.id)">
            <IonIcon :icon="trashOutline"></IonIcon>
          </IonButton>
        </div>
      </div>
    </div>
    <IonAlert
      :is-open="isOpen"
      header="Delete Confirmation!"
      message="Apakah Anda yakin ingin menghapus Chapter ini?"
      :buttons="alertButtons"
      @didDismiss="setOpen(false, null)"
    ></IonAlert>
  </div>
</template>
