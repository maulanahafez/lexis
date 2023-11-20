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
    like: number | undefined | null;
    chapter: number | undefined | null;
  }

  const userStories = ref<Story[]>([]);
  const userStore = useUserStore();

  async function getUserStories() {
    try {
      const res: AxiosResponse = await axios.get(`user/${userStore.user!.id}/stories`);
      const data: Story[] = res.data;
      userStories.value = data;
      console.log(userStories.value);
    } catch (error) {
      console.log(error);
    }
  }

  async function getStoryById(storyId: number) {
    try {
      const res: AxiosResponse = await axios.get(`stories/${storyId}`);
      const data: Story = res.data;
      userStories.value = [data];
      console.log(storyId);

      console.log(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function saveUserStory(storyData: FormData) {
    try {
      const res = await axios.post(`stories`, storyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      getUserStories();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUserStory(storyId: number, storyData: FormData) {
    try {
      const res = await axios.patch(`stories/${storyId}`, storyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      getUserStories();
    } catch (error) {
      console.log(error);
    }
  }
  return { userStories, getUserStories, saveUserStory, updateUserStory, getStoryById };
});
