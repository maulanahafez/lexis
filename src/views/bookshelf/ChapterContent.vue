<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButton } from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div class="flex ion-align-items-center gap-3">
            <IonButton :router-link="{ path: '/bookshelf/chapter' }" fill="clear" class="ion-no-padding ion-align-items-center">
              <IonIcon :icon="chevronBackOutline" class="text-black" />
            </IonButton>
            Content Chapter
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="mx-5 mt-4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione ipsa quidem voluptatem qui labore quibusdam. Ipsam atque sapiente quas laborum impedit ea! Accusantium adipisci praesentium asperiores, labore sit, inventore error
          minima, facilis magnam rerum reprehenderit fugit placeat recusandae voluptate eligendi alias ipsum libero sequi perferendis at? Fugit molestias ab vel minus. Molestias dolores voluptas officiis incidunt perferendis ab perspiciatis
          fugit ratione laborum, quis totam, est, commodi soluta impedit veritatis velit odit illum nostrum iste amet earum. Alias distinctio quo labore, reprehenderit culpa aliquam cumque consequatur vel maiores fugiat maxime placeat vero
          excepturi illo perspiciatis ut cupiditate ea nihil veritatis modi.
        </p>
      </div>
      <div class="fixed bottom-0 inset-x-0">
        <QuillEditor theme="snow"></QuillEditor>
      </div>
    </IonContent>
  </IonPage>
</template>
