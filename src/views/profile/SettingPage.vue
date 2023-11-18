<script lang="ts" setup>
import { useUserStore } from '@/store/useUserStore';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { chevronBack, create, save } from 'ionicons/icons';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const availStoryPreferences = [
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Horror',
  'Historical Fiction',
  'Non-Fiction',
  'Biography',
  'Adventure',
];

// Handle Form
const userForm = ref<{
  uid?: string | undefined | null;
  username?: string | undefined | null;
  email?: string | undefined | null;
  name?: string | undefined | null;
  bio?: string | undefined | null;
}>({
  uid: userStore.user.uid,
  username: userStore.user.username,
  email: userStore.user.email,
  name: userStore.user.name,
  bio: userStore.user.bio,
});

const restartForm = () => {
  userForm.value.uid = userStore.user.uid;
  userForm.value.username = userStore.user.username;
  userForm.value.email = userStore.user.email;
  userForm.value.name = userStore.user.name;
  userForm.value.bio = userStore.user.bio;
  storyPreferences.value = cStoryPreferences.value;
  isEdit.value = false;
  isPassedValidation.value = false;
};

const cStoryPreferences = computed(() => {
  const storyPreferences = userStore.user.story_preferences;
  return storyPreferences?.split('~');
});

const storyPreferences = ref(cStoryPreferences.value);
const isEdit = ref(false);
const isPassedValidation = ref(false);

const schema = yup.object({
  username: yup.string().required().min(6),
  name: yup.string().required(),
  // bio: yup.string().max(255),
});

const handleBio = (event: Event) => {
  const bio = event.target as HTMLInputElement;
  userForm.value.bio = bio.value;
};

const editProfile = () => {
  isEdit.value = true;
};

const updateProfile = async () => {
  const newStoryPreferences = storyPreferences.value?.join('~');
  const data = { ...userForm.value, story_preferences: newStoryPreferences };
  const res = await userStore.updateUser(data);
  if (res) {
    router.push('/profile');
  }
};

// Username Unique
const isUsernameNotUnique = ref(false);
const handleUsernameUnique = async (event: any) => {
  const res = await userStore.isUsernameUnique(event.target.value);
  if (!res) {
    isUsernameNotUnique.value = true;
    isPassedValidation.value = false;
  } else {
    isUsernameNotUnique.value = false;
    isPassedValidation.value = true;
  }
};

watch(
  () => route.path,
  (newValue, oldValue) => {
    if (newValue === '/profile/setting') {
      restartForm();
    }
  }
);
</script>

<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonTitle>Setting</IonTitle>
        <IonButtons slot="start">
          <IonButton @click="router.push('/profile')">
            <IonIcon :icon="chevronBack"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="container mx-auto px-4 py-4">
        <Form
          :validation-schema="schema"
          @submit="updateProfile()"
          class="space-y-6"
        >
          <div>
            <label class="mb-1 inline-block" for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="userForm.email"
              :readonly="true"
              placeholder="Email Address"
              class="inline-block bg-black/20 w-full px-4 py-2 border border-black/20 rounded-lg focus:outline-none focus:ring focus:ring-[#0081C9]"
            />
          </div>
          <div>
            <label class="mb-1 inline-block" for="username">Username</label>
            <Field
              type="text"
              name="username"
              id="username"
              v-model="userForm.username"
              @change="handleUsernameUnique"
              :readonly="!isEdit"
              placeholder="Username"
              class="inline-block w-full px-4 py-2 bg-white border border-black/20 rounded-lg focus:outline-none focus:ring focus:ring-[#0081C9]"
            />
            <ErrorMessage name="username" class="text-red-500 text-sm mt-1" />
            <p class="text-red-500 text-sm mt-1" v-if="isUsernameNotUnique">
              Username is already taken.
            </p>
            <!-- <input
              type="text"
              name="username"
              id="username"
              v-model="userForm.username"
              @change="handleUsernameUnique"
              :readonly="!isEdit"
              placeholder="Username"
              class="inline-block w-full px-4 py-2 bg-white border border-black/20 rounded-lg focus:outline-none focus:ring focus:ring-[#0081C9]"
            /> -->
          </div>
          <div>
            <label class="mb-1 inline-block" for="name">Name</label>
            <Field
              type="text"
              name="name"
              id="name"
              v-model="userForm.name"
              :readonly="!isEdit"
              placeholder="Full Name"
              class="inline-block w-full px-4 py-2 bg-white border border-black/20 rounded-lg focus:outline-none focus:ring focus:ring-[#0081C9]"
            />
            <ErrorMessage name="name" />
            <!-- <input
              type="text"
              name="name"
              id="name"
              v-model="userForm.name"
              :readonly="!isEdit"
              placeholder="Full Name"
              class="inline-block w-full px-4 py-2 bg-white border border-black/20 rounded-lg focus:outline-none focus:ring focus:ring-[#0081C9]"
            /> -->
          </div>
          <div>
            <label class="mb-1 inline-block" for="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              :readonly="!isEdit"
              rows="3"
              :value="userForm.bio?.toString()"
              @input="handleBio"
              placeholder="Bio"
              class="inline-block w-full px-4 py-2 bg-white border border-black/20 rounded-lg focus:outline-none focus:ring focus:ring-[#0081C9] resize-none"
            ></textarea>
          </div>
          <!-- <div>
            {{ storyPreferences }}
          </div> -->
          <div>
            <label class="mb-1 inline-block">Story Preferences</label>
            <div class="flex flex-wrap gap-x-3 gap-y-2">
              <label
                v-for="item of availStoryPreferences"
                :for="item"
                :key="item"
                :class="[
                  storyPreferences?.includes(item)
                    ? 'bg-[#0081C9] text-white'
                    : 'bg-white text-black',
                  !isEdit && !storyPreferences?.includes(item)
                    ? 'hidden'
                    : 'inline-block',
                ]"
                class="border-2 border-[#0081C9] px-5 py-0.5 text-sm rounded-full"
              >
                {{ item }}
                <input
                  type="checkbox"
                  name="story_preferences"
                  :id="item"
                  class="hidden"
                  :value="item"
                  :disabled="!isEdit"
                  v-model="storyPreferences"
                />
              </label>
            </div>
          </div>
          <div>
            <button
              type="button"
              v-if="!isEdit"
              @click="editProfile()"
              class="flex gap-1 items-center w-full px-2 py-3 bg-[#0081C9] text-white rounded-lg justify-center"
            >
              <IonIcon :icon="create" />
              <span> Edit Profile </span>
            </button>
            <button
              type="submit"
              v-if="isEdit"
              :class="[isPassedValidation ? 'bg-[#4CAF50]' : 'bg-[#4CAF50]/60']"
              :disabled="!isPassedValidation"
              class="flex gap-1 items-center w-full px-2 py-3 bg-[#4CAF50] text-white rounded-lg justify-center"
            >
              <IonIcon :icon="save" />
              <span> Save Profile </span>
            </button>
          </div>
        </Form>
      </div>
    </IonContent>
    <!-- <AppTabs /> -->
  </IonPage>
</template>
