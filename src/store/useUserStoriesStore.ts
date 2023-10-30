import axios, { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./useUserStore";

export const useUserStoriesStore = defineStore("user-stories", function () {
  interface Story {
    id: number | undefined | null;
    user_id: number | undefined | null;
    title: string | undefined | null;
    genre: string | undefined | null;
    description: string | undefined | null;
    cover_path: string | undefined | null;
    is_published: number | undefined | null;
    created_at: string | undefined | null;
    updated_at: string | undefined | null;
  }

  const userStories = ref<Story[]>([]);
  const userStore = useUserStore();

  async function getUserStories() {
    try {
      const res: AxiosResponse = await axios.get(
        `user/${userStore.user!.id}/stories`
      );
      const data: Story[] = res.data;
      userStories.value = data;
      console.log(userStories.value);
    } catch (error) {
      console.log(error);
    }
  }
  return { userStories, getUserStories };
});
