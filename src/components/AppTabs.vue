<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import { book, home, person, search } from "ionicons/icons";
</script>
<template>
  <div class="fixed bottom-0 inset-x-0">
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <div class="fixed bottom-0 inset-x-0">
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon :icon="home" />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="search" href="/search">
            <IonIcon :icon="search" />
            <IonLabel>Search</IonLabel>
          </IonTabButton>

          <IonTabButton tab="book" href="/bookshelf">
            <IonIcon :icon="book" />
            <IonLabel>Bookshelf</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon :icon="person" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </div>
    </IonTabs>
  </div>
</template>
