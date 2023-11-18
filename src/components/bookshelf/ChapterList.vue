<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { createOutline, trashOutline } from "ionicons/icons";
</script>
<template>
  <div class="mx-5 mt-5 space-y-2">
    <div class="w-full h-[2px] bg-gray-300"></div>
    <div class="flex items-center space-x-5">
      <p class="font-medium text-lg">1</p>
      <div>
        <p class="font-medium text-base">mystery</p>
        <p class="text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, repellendus.</p>
      </div>
    </div>
    <div class="ml-6 space-x-5">
      <IonButton color="success">
        <IonIcon :icon="createOutline"></IonIcon>
      </IonButton>
      <IonButton color="danger">
        <IonIcon :icon="trashOutline"></IonIcon>
      </IonButton>
    </div>
  </div>
</template>
