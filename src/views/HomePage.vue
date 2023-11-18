<template>
  <IonPage>
    <IonContent>
      <kButton @click="store.googleSignOut()">Sign Out</kButton>
      <div>{{ store.user }}</div>
      <div @click="$router.push('/profile')" class="cursor-pointer">Profile</div>
      <AppTabs></AppTabs>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import AppTabs from "@/components/AppTabs.vue";
import { useUserStore } from "@/store/useUserStore";
import { IonContent, IonPage } from "@ionic/vue";
import { kButton } from "konsta/vue";

const store = useUserStore();
</script>
