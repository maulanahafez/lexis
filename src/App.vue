<template>
  <kProvider>
    <IonApp>
      <IonRouterOutlet />
    </IonApp>
  </kProvider>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { kProvider } from "konsta/vue";
</script>
