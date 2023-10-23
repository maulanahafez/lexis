<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle>Blank</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <div v-if="!user">
        <kButton @click="basicOpened = !basicOpened" :inline="true"
          >Click Dialog</kButton
        >
        <kButton @click="signinPopup()">Sign In With Google</kButton>
      </div>
      <div v-else>
        <p>{{ user }}</p>
        <p @click="signOutUser()">Sign Out</p>
        <RouterLink :to="{ path: 'story' }">Story Link</RouterLink>
        <p @click="router.push('/story')">Story</p>
      </div>
      <kDialog
        :opened="basicOpened"
        @backdropclick="() => (basicOpened = false)"
      >
        <template #title>Dialog Title</template>
        Dialog is a type of modal window that appears in front of app content to
        provide critical information, or prompt for a decision to be made.

        <template #buttons>
          <kDialogButton @click="() => (basicOpened = false)">
            Action 2
          </kDialogButton>
          <kDialogButton @click="() => (basicOpened = false)">
            Action 1
          </kDialogButton>
        </template>
      </kDialog>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { signInWithPopup, signOut } from "firebase/auth";
import { kButton, kDialog, kDialogButton } from "konsta/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUser, useFirebaseAuth } from "vuefire";

const router = useRouter();
const error = ref();
const basicOpened = ref(false);
const auth = useFirebaseAuth()!;
const user = useCurrentUser();
console.log(user.value?.providerData);

function signinPopup() {
  error.value = null;
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error("Failed sign", reason);
    error.value = reason;
  });
}

function signOutUser() {
  signOut(auth);
}
</script>

<script lang="ts">
import { GoogleAuthProvider } from "firebase/auth";
export const googleAuthProvider = new GoogleAuthProvider();
</script>
