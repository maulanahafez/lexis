<script setup lang="ts">
import AppTabs from '@/components/AppTabs.vue';
import { useUserStore } from '@/store/useUserStore';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { notificationsOutline } from 'ionicons/icons';
import { kButton } from 'konsta/vue';
import { ref } from 'vue';

const store = useUserStore();
const targetUser = ref(1);
const targetStory = ref(1);
const targetChapter = ref(1);
</script>

<template>
  <IonPage>
    <IonHeader>
      <ion-toolbar>
        <div @click="$router.push('/HomePage')" class="cursor-pointer">
          <IonTitle> Home </IonTitle>
        </div>
        <div @click="$router.push('/NotificationPage')" class="cursor-pointer">
          <IonIcon :icon="notificationsOutline" size="primary">notif</IonIcon>
        </div>
      </ion-toolbar>
    </IonHeader>

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
      <div class="story">
        <h5>Discovery for you</h5>
        <div class="slide">
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
        </div>
        <!-- <div @click="$router.push(`/user/${targetUser}`)" class="mt-10">Ke Target User {{ targetUser }}</div>
      <input type="text" v-model="targetUser" class="bg-white px-4 py-1 rounded-md border border-black/20" /> -->
      </div>

      <div class="popular">
        <h5>Popular Stories</h5>
        <div class="slide">
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
        </div>
      </div>

      <div class="popular">
        <h5>Author you might like</h5>
        <div class="slide">
          <div class="slides">
            <img
              src="/src/assets/bookshelf/people.jpg"
              alt=""
              style="width: 100px; height: 100px; border-radius: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/people.jpg"
              alt=""
              style="width: 100px; height: 100px; border-radius: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/people.jpg"
              alt=""
              style="width: 100px; height: 100px; border-radius: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/people.jpg"
              alt=""
              style="width: 100px; height: 100px; border-radius: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
        </div>
      </div>

      <div class="adventure">
        <h5>Adventure Stories</h5>
        <div class="slide">
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
          <div class="slides">
            <img
              src="/src/assets/bookshelf/img.png"
              alt=""
              style="width: 100%"
            />
            <p style="font-size: small; align-items: center">
              Lightfall Lorem Ipsum Dolor
            </p>
          </div>
        </div>
      </div>

      <div class="bar"></div>
      <AppTabs></AppTabs>
    </IonContent>
  </IonPage>
</template>

<style scoped>
.cursor-pointer {
  display: flex;
  justify-content: end;
}

.slides {
  flex-shrink: 0;
  scroll-snap-type: x var(--tw-scroll-snap-strictness);
  column-gap: 1rem;
  width: 100px;
}
.slide {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slide::-webkit-scrollbar {
  display: none;
}
.ion-padding {
  padding: 16px;
}
.story {
  padding: 1rem 3rem 1rem 1rem;
}
.popular {
  padding: 0rem 3rem 1rem 1rem;
}
.adventure {
  padding: 0rem 3rem 5rem 1rem;
}
</style>
