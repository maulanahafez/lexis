<script setup lang="ts">
import { ref } from "vue";
import { IonContent, IonInput, IonButton, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle } from "@ionic/vue";
import { chevronBackOutline, saveOutline } from "ionicons/icons";
import { useUserStoriesStore } from "@/store/useUserStoriesStore";
import { useUserStore } from "@/store/useUserStore";
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
            Add Chapter
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="mx-5">
        <p class="my-2 text-base">Title</p>
        <IonInput fill="outline" placeholder="Title of your chapter"></IonInput>
      </div>
      <div class="mx-5 mt-5">
        <p class="my-2 text-base">Order Num</p>
        <IonInput fill="outline" placeholder="Order Num"></IonInput>
      </div>
      <div class="mx-5 mt-5">
        <p class="text-base">Published</p>
        <div class="mt-3">
          <input type="radio" id="True" name="genre" value="True" class="hidden" checked />
          <label for="True" class="w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">True</label>

          <input type="radio" id="False" name="genre" value="False" class="hidden" />
          <label for="False" class="w-[110px] text-center inline-block border rounded-full text-sm border-[#0081C9] px-4 py-2 mr-4 cursor-pointer">False</label>
        </div>
      </div>
      <div class="mx-5 mt-6">
        <IonButton :router-link="{ path: '/bookshelf/chapter/content' }" color="primary" fill="outline" class="w-full text-base my-3">Chapter Content</IonButton>
        <IonButton @click="" color="success" class="w-full text-base"> <IonIcon :icon="saveOutline" class="mr-3"></IonIcon>Save</IonButton>
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
