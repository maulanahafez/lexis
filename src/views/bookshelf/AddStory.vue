<script setup lang="ts">
import { ref } from "vue";
import { IonContent, IonInput, IonButton, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
import { chevronBackOutline, saveOutline } from "ionicons/icons";
import { useUserStoriesStore } from "@/store/useUserStoriesStore";
import { useUserStore } from "@/store/useUserStore";

const imageUrl = ref("");
const storyData = ref({
  title: "",
  genre: "",
  description: "",
});

const fileRef = ref<HTMLInputElement | null>(null);

const handleFileChange = () => {
  const file = fileRef.value?.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        imageUrl.value = result;
      }
    };
    reader.readAsDataURL(file);
  }
};

const userStore = useUserStore();
const store = useUserStoriesStore();

const saveStory = async () => {
  const selectedGenre = document.querySelector('input[name="genre"]:checked') as HTMLInputElement | null;

  if (selectedGenre) {
    const formData = new FormData();
    formData.append("title", storyData.value.title);
    formData.append("genre", selectedGenre.value);
    formData.append("description", storyData.value.description);
    formData.append("cover_path", fileRef.value?.files?.[0] || "");
    formData.append("user_id", userStore.user?.id || "");

    await store.saveUserStory(formData);
  } else {
    console.error("No genre selected");
  }
};
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div class="flex ion-align-items-center gap-3">
            <IonButton router-link="/bookshelf" fill="clear" class="ion-no-padding">
              <IonIcon :icon="chevronBackOutline" class="text-black" />
            </IonButton>
            Add Story
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="flex gap-20 px-5 py-5 bg-gray-200 items-center">
        <div>
          <input type="file" id="file" @change="handleFileChange" accept=".png, .jpg, .jpeg" ref="fileRef" required />
          <label for="file" id="labelFile" class="w-28 h-36">
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Cover" class="w-full h-full object-cover" />
            <div v-else>+</div>
          </label>
        </div>
        <div class="text-base">Add Cover</div>
      </div>
      <div class="mx-5">
        <p class="my-2 text-base">Title</p>
        <IonInput v-model="storyData.title" fill="outline" placeholder="Title of your story"></IonInput>
      </div>
      <div class="mx-5 mt-5">
        <p class="my-2 text-base">Description</p>
        <IonInput v-model="storyData.description" fill="outline" placeholder="Story Description"></IonInput>
      </div>
      <div class="mx-5 mt-5">
        <p class="my-2 text-base">Genre</p>
        <div class="grid grid-cols-3">
          <div>
            <input type="radio" id="adventure" name="genre" value="Adventure" class="hidden" />
            <label for="adventure" class="w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">Adventure</label>

            <input type="radio" id="mystery" name="genre" value="Mystery" class="hidden" />
            <label for="mystery" class="mt-5 w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">Mystery</label>

            <input type="radio" id="fantasy" name="genre" value="Fantasy" class="hidden" />
            <label for="fantasy" class="mt-5 w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 cursor-pointer">Fantasy</label>
          </div>
          <div>
            <input type="radio" id="romance" name="genre" value="Romance" class="hidden" />
            <label for="romance" class="w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">Romance</label>

            <input type="radio" id="thriller" name="genre" value="Thriller" class="hidden" />
            <label for="thriller" class="mt-5 w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">Thriller</label>

            <input type="radio" id="horror" name="genre" value="Horror" class="hidden" />
            <label for="horror" class="mt-5 w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 cursor-pointer">Horror</label>
          </div>
          <div>
            <input type="radio" id="historical" name="genre" value="Historical" class="hidden" />
            <label for="historical" class="w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">Historical</label>

            <input type="radio" id="biography" name="genre" value="Biography" class="hidden" />
            <label for="biography" class="mt-5 w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">Biography</label>

            <input type="radio" id="science" name="genre" value="Science Fiction" class="hidden" />
            <label for="science" class="mt-5 w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 cursor-pointer">Science</label>
          </div>
        </div>
      </div>
      <div class="mx-5 mt-10">
        <IonButton @click="saveStory" color="primary" class="w-full text-base"> Add New Story</IonButton>
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

input[type="radio"]:checked + label {
  background: #0081c9;
  color: #fff;
}
</style>
