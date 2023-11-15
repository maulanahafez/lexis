import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import axios, { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', function () {
  FirebaseAuthentication.signInWithGoogle();
  interface User {
    id?: string | undefined | null;
    uid?: string | undefined | null;
    username?: string | undefined | null;
    email?: string | undefined | null;
    name?: string | undefined | null;
    bio?: string | undefined | null;
    story_preferences?: string | undefined | null;
    photoUrl?: string | undefined | null;
  }

  const user = ref<User>({
    id: null,
    uid: null,
    username: null,
    email: null,
    name: null,
    bio: null,
    story_preferences: null,
    photoUrl: null,
  });

  const isSignIn = ref<boolean>(false);
  const router = useRouter();

  async function googleSignIn() {
    await FirebaseAuthentication.signInWithGoogle();
    isSignIn.value = true;
    getUser();
    router.push('/home');
  }

  async function googleSignOut() {
    await FirebaseAuthentication.signOut();
    clearUser();
    isSignIn.value = false;
    router.push('/');
  }

  async function getUser() {
    const currentUser = await FirebaseAuthentication.getCurrentUser();
    const formData: User = {
      uid: currentUser.user?.uid,
      name: currentUser.user?.displayName,
      email: currentUser.user?.email,
      photoUrl: currentUser.user?.photoUrl,
    };
    const res: AxiosResponse = await axios.post('/user', formData);
    const data = res.data.data;
    user.value!.uid = data.uid;
    user.value!.name = data.name;
    user.value!.email = data.email;
    user.value!.photoUrl = formData.photoUrl;
    user.value!.id = data.id;
    user.value!.username = data.username;
    user.value!.bio = data.bio;
    user.value!.story_preferences = data.story_preferences;
  }

  async function updateUser(formData: any) {
    try {
      const res: AxiosResponse = await axios.post('/user', formData);
      const data = res.data.data;
      user.value!.uid = data.uid;
      user.value!.name = data.name;
      user.value!.email = data.email;
      user.value!.photoUrl = data.photoUrl;
      user.value!.id = data.id;
      user.value!.username = data.username;
      user.value!.bio = data.bio;
      user.value!.story_preferences = data.story_preferences;
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function isUsernameUnique(username: string) {
    const res = await axios.get('user/username_unique', {
      params: { username },
    });
    return res.data;
  }

  function clearUser() {
    user.value!.id = null;
    user.value!.uid = null;
    user.value!.username = null;
    user.value!.email = null;
    user.value!.name = null;
    user.value!.bio = null;
    user.value!.story_preferences = null;
  }

  return {
    user,
    isSignIn,
    googleSignIn,
    getUser,
    updateUser,
    googleSignOut,
    isUsernameUnique,
  };
});
