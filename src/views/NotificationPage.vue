<template>
  <ion-header>
    <ion-toolbar>
      <!-- Tombol Kiri -->
      <ion-buttons slot="start">
        <ion-button @click="goBack">
          <ion-icon :icon="arrowBackOutline"></ion-icon>
        </ion-button>
      </ion-buttons>

      <!-- Judul Tengah -->
      <ion-title>Notifikasi</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonTitle } from "@ionic/vue";
import { arrowBackOutline } from "ionicons/icons";
import { ref } from "vue";

const goBack = () => {
  // Tambahkan logika navigasi ke halaman sebelumnya
  console.log("Kembali ke halaman sebelumnya");
};
</script>
