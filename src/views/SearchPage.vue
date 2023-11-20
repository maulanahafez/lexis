<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <!-- <IonButtons slot="start">
          <IonBackButton defaultHref="Home" />
        </IonButtons>
        <IonTitle>Search</IonTitle> -->
        <IonSearchbar
          v-model="searchTerm"
          placeholder="Search stories or authors"
          @ionChange="onSearchChange"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <!-- style="
          border-radius: 20px;
          border: 1px solid black;
          margin-bottom: 16px;
        " -->

      <!-- <IonList>
        <IonItem v-for="(result, index) in searchResults" :key="index" class="result-item">
          <IonLabel>
            <h2>{{ result.title || result.name }}</h2>
            <p v-if="result.author" class="author">Author: {{ result.author }}</p>
            <p v-if="result.story" class="story">Story: {{ result.story }}</p>
          </IonLabel>
        </IonItem>
      </IonList> -->
      <AppTabsVue />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import AppTabsVue from '@/components/AppTabs.vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from '@ionic/vue';
import { onMounted, ref } from 'vue';

const searchTerm = ref('');
const searchResults = ref([]);

const onSearchChange = async () => {
  try {
    const results = await fetchSearchResults(searchTerm.value);
    searchResults.value = results;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

onMounted(() => {});

const fetchSearchResults = async (query: any) => {
  try {
    // Ganti URL ini dengan URL API sesuai dengan proyek Anda
    const apiUrl = `https://github.com/maulanahafez/lexis_api{query}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
</script>

<style scoped>
.ion-padding {
  padding: 16px;
}

.result-item {
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.author,
.story {
  color: #666;
  font-size: 14px;
  margin-top: 6px;
}
</style>
