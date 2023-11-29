<template>
  <IonPage>
    <IonContent>
      <div class="container mx-auto px-4 py-2 space-y-4">
        <kButton @click="store.googleSignOut()">Sign Out</kButton>
        <div>{{ store.user }}</div>
        <div @click="$router.push('/profile')" class="cursor-pointer">
          Profile
        </div>
        <div>
          <button
            type="button"
            @click="
              $router.push({
                name: 'User',
                params: { id: targetUser },
              })
            "
            class="px-4 py-2 bg-green-500 text-white rounded-md text-sm"
          >
            User {{ targetUser }}
          </button>
          <input
            type="text"
            v-model="targetUser"
            class="mt-4 w-full inline-block bg-white px-4 py-1 rounded-md border border-black/20"
          />
        </div>
        <div>
          <button
            type="button"
            @click="$router.push(`/story/${targetStory}`)"
            class="px-4 py-2 bg-green-500 text-white rounded-md text-sm"
          >
            Story {{ targetStory }}
          </button>
          <input
            type="text"
            v-model="targetStory"
            class="mt-4 w-full inline-block bg-white px-4 py-1 rounded-md border border-black/20"
          />
        </div>
        <div>
          <button
            type="button"
            @click="$router.push(`/chapter/${targetChapter}`)"
            class="px-4 py-2 bg-green-500 text-white rounded-md text-sm"
          >
            Chapter {{ targetChapter }}
          </button>
          <input
            type="text"
            v-model="targetChapter"
            class="mt-4 w-full inline-block bg-white px-4 py-1 rounded-md border border-black/20"
          />
        </div>
      </div>
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
const targetStory = ref(1);
const targetChapter = ref(1);
</script>
