<script setup lang="ts">
import { useFlashStore } from '@/store/useFlashStore';
import { useUserStoriesStore } from '@/store/useUserStoriesStore';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLoading,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController,
} from '@ionic/vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.core.css';
import { chevronBack, saveOutline } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const useUserStories = useUserStoriesStore();
const flashStore = useFlashStore();

const formData = reactive({
  id: route.params.chapterId,
  story_id: null,
  title: '',
  order_num: '',
  content: '',
  is_published: 1,
});

const isOpen = ref(false);
const isLoading = ref(false);

const toggleOpen = (open: boolean) => {
  isOpen.value = open;
};

const handleSubmit = async () => {
  isLoading.value = true;
  const res = await useUserStories.updateChapter(formData.id, formData);
  if (res) {
    const toast = toastController.create({
      message: 'Berhasil Update Chapter',
      position: 'bottom',
      duration: 2000,
    });
    (await toast).present();
    isLoading.value = false;
    flashStore.handleFlash();
    router.push(`/bookshelf/${formData.story_id}`);
  }
};

onMounted(async () => {
  const res = await useUserStories.getChapter(formData.id);
  formData.story_id = res.story_id;
  formData.title = res.title;
  formData.order_num = res.order_num;
  formData.content = res.content;
  formData.is_published = res.is_published;
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle> Edit Chapter </IonTitle>
        <IonButtons slot="start">
          <IonBackButton :icon="chevronBack"></IonBackButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <form @submit.prevent="handleSubmit()">
        <div class="container space-y-6 mx-auto max-w-[1280px] px-4">
          <div>
            <p class="my-2 text-base">Title</p>
            <IonInput
              fill="outline"
              placeholder="Title of your chapter"
              v-model="formData.title"
            ></IonInput>
          </div>
          <div>
            <p class="my-2 text-base">Order Number</p>
            <IonInput
              fill="outline"
              placeholder="Order Num"
              v-model="formData.order_num"
            ></IonInput>
          </div>
          <div>
            <p class="text-base">Published</p>
            <div class="mt-3">
              <input
                type="radio"
                id="True"
                name="order_num"
                value="1"
                class="hidden"
                :checked="formData.is_published == 1"
                v-model="formData.is_published"
              />
              <label
                for="True"
                class="w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer"
              >
                Yes
              </label>
              <input
                type="radio"
                id="False"
                name="order_num"
                value="0"
                class="hidden"
                :checked="formData.is_published == 0"
                v-model="formData.is_published"
              />
              <label
                for="False"
                class="w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer"
              >
                No
              </label>
            </div>
          </div>
          <div class="space-y-4">
            <button
              @click="toggleOpen(true)"
              type="button"
              class="block w-full px-4 py-3.5 rounded-md bg-[#0081C9] text-white cursor-pointer hover:ring-2 hover:ring-[#0081C9]"
            >
              Chapter Content
            </button>
            <button
              type="submit"
              class="flex items-center gap-x-2 justify-center w-full px-4 py-3 rounded-md bg-green-500 text-white cursor-pointer hover:ring-2 hover:ring-green-500"
            >
              <IonIcon class="text-lg" :icon="saveOutline"></IonIcon>
              <span>Update</span>
            </button>
          </div>
        </div>
      </form>
      <IonModal :is-open="isOpen">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Content</IonTitle>
            <IonButtons slot="end">
              <IonButton @click="toggleOpen(false)" class="!capitalize">
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <div class="fixed top-14 inset-x-0 bottom-0">
            <QuillEditor
              theme="bubble"
              toolbar="full"
              content-type="html"
              v-model:content="formData.content"
            ></QuillEditor>
          </div>
        </IonContent>
      </IonModal>
      <IonLoading :isOpen="isLoading"></IonLoading>
    </IonContent>
  </IonPage>
</template>

<style scoped>
input {
  display: none;
}

#labelFile {
  border-radius: 4px;
  border: 1px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: xx-large;
  color: #6a6767;
  position: relative;
  overflow: hidden;
}

#labelFile img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px dashed black;
  object-fit: cover;
}

#labelFile div {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-large;
  color: #6a6767;
}

input[type='radio']:checked + label {
  background: #0081c9;
  color: #fff;
}
</style>
