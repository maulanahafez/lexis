<template>
  <kProvider>
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </kProvider>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { kProvider } from "konsta/vue";
</script>
