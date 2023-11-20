<template>
  <IonPage>
    <IonContent>
      <kButton @click="store.googleSignOut()">Sign Out</kButton>
      <div>{{ store.user }}</div>
      <div @click="$router.push('/profile')" class="cursor-pointer">
        Profile
      </div>
      <div @click="$router.push(`/user/${targetUser}`)" class="mt-10">
        Ke Target User {{ targetUser }}
      </div>
      <input
        type="text"
        v-model="targetUser"
        class="bg-white px-4 py-1 rounded-md border border-black/20"
      />
      <AppTabs></AppTabs>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import AppTabs from '@/components/AppTabs.vue';
import { useUserStore } from '@/store/useUserStore';
import { IonContent, IonPage } from '@ionic/vue';
import { kButton } from 'konsta/vue';
import { ref } from 'vue';

const store = useUserStore();
const targetUser = ref(1);
</script>
