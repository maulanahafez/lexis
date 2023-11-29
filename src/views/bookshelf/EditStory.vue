<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore';
import { useUserStoriesStore } from '@/store/useUserStoriesStore';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const userStoriesStore = useUserStoriesStore();
const availableGenre = [
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Non-Fiction',
  'Biography',
  'Adventure',
];
const imageUrl = ref('');
const storyData = reactive<{
  title: string | undefined;
  genre: string | undefined;
  description: string | undefined;
  is_published: number | null;
  cover: File | null | undefined;
}>({
  title: '',
  genre: '',
  description: '',
  is_published: 1,
  cover: undefined,
});

const fileRef = ref<HTMLInputElement | null>(null);
const handleFileChange = () => {
  const file = fileRef.value?.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        imageUrl.value = result;
      }
    };
    reader.readAsDataURL(file);
  }
  storyData.cover = file;
};

const updateStory = async () => {
  await userStoriesStore.updateUserStory(
    Number(route.params.storyId),
    storyData
  );
};

onMounted(async () => {
  const res = await userStoriesStore.getStoryById(Number(route.params.storyId));
  storyData.title = res.title;
  storyData.genre = res.genre;
  storyData.description = res.description;
  storyData.is_published = res.is_published;
  storyData.cover = res.cover_path;
  if (res.cover_path !== undefined) {
    imageUrl.value = res.cover_path?.startsWith('h')
      ? res.cover_path
      : userStore.storagePath + res.cover_path?.replace('public/', '');
  }
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div class="flex ion-align-items-center gap-3">
            <IonButton
              router-link="/bookshelf"
              fill="clear"
              class="ion-no-padding"
            >
              <IonIcon :icon="chevronBackOutline" class="text-black" />
            </IonButton>
            Edit Story
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="bg-gray-200">
        <div class="flex gap-20 container mx-auto px-4 py-5 items-center">
          <div>
            <input
              type="file"
              id="file"
              @change="handleFileChange"
              accept=".png, .jpg, .jpeg"
              ref="fileRef"
              required
            />
            <label for="file" id="labelFile" class="w-28 h-36">
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="Uploaded Cover"
                class="w-full h-full object-cover"
              />
              <div v-else>+</div>
            </label>
          </div>
          <div class="text-base">Edit Cover</div>
        </div>
      </div>
      <div class="container mx-auto px-4 py-4">
        <form @submit.prevent="updateStory()" class="space-y-4">
          <div>
            <p class="my-2 text-base">Title</p>
            <IonInput
              v-model="storyData.title"
              fill="outline"
              placeholder="Title of your story"
            ></IonInput>
          </div>
          <div>
            <p class="my-2 text-base">Description</p>
            <IonTextarea
              fill="outline"
              placeholder="Story Description"
              v-model="storyData.description"
              :rows="4"
            ></IonTextarea>
          </div>
          <div>
            <p class="my-2 text-base">Genre</p>
            <div class="flex flex-wrap gap-y-2 gap-x-4">
              <div
                v-for="(genre, index) in availableGenre"
                :class="[
                  storyData.genre === genre
                    ? 'bg-[#0081C9] text-white'
                    : 'bg-white text-black',
                ]"
                class="text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-1.5 cursor-pointer"
                :key="index"
              >
                <input
                  type="radio"
                  :id="genre"
                  name="genre"
                  :value="genre"
                  class="hidden"
                  v-model="storyData.genre"
                />
                <label :for="genre">
                  {{ genre }}
                </label>
              </div>
            </div>
          </div>
          <div>
            <IonButton
              color="primary"
              type="submit"
              class="w-full text-base !capitalize"
            >
              Update Story
            </IonButton>
          </div>
        </form>
      </div>
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
