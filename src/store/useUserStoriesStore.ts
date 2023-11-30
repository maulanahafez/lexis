import axios, { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './useUserStore';

export const useUserStoriesStore = defineStore('user-stories', function () {
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
    likes: number | undefined | null;
    chapters_count: number | undefined | null;
    // user: {
    //   id: number | undefined | null;
    //   username: string | undefined | null;
    // };
  }

  interface Chapter {
    chapter_id?: number | null;
    user_id?: number | null;
    created_at?: string | null;
    chapter: {
      id?: number | null;
      title?: string | null;
      story: {
        id?: number | null;
        title?: string | null;
      };
    };
  }

  const userStories = ref<Story[]>([]);
  const userLiked = ref<Chapter[]>([]);
  const userStory = ref<Story>();
  const userStore = useUserStore();
  const router = useRouter();

  const dateLiked = computed(() => {
    return userLiked.value.map((chapter) => {
      return new Date(chapter.created_at!).toLocaleString();
    });
  });

  const coverPath = computed(() => {
    return userStories.value.map((story) => {
      if (story.cover_path! !== undefined) {
        return story.cover_path!.startsWith('h')
          ? story.cover_path!
          : userStore.storagePath + story.cover_path!.replace('public/', '');
      }
      return '';
    });
  });

  async function getUserStories() {
    try {
      const res: AxiosResponse = await axios.get(
        `user/${userStore.user!.id}/stories`
      );
      const data: Story[] = res.data;
      userStories.value = data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserLiked() {
    try {
      const res = await axios.get(`user/${userStore.user.id!}/likes`);
      userLiked.value = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getStoryById(storyId: number) {
    try {
      const res: AxiosResponse = await axios.get(`stories/${storyId}`);
      const data = res.data.data;
      return data;
    } catch (error) {
      return null;
    }
  }

  async function saveUserStory(storyData: any) {
    try {
      const res = await axios.post(`stories`, storyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.success) router.push('/bookshelf');
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUserStory(storyId: number, storyData: any) {
    try {
      const res = await axios.patch(`stories/${storyId}`, storyData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(storyData);
      console.log(res.data);
      router.push({ name: 'Story', params: { storyId: storyId } });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteStory(storyId: number) {
    try {
      const res = await axios.delete(`stories/${storyId}`);
      return res.data.success;
    } catch (error) {
      console.error(error);
    }
  }

  async function saveChapter(formData: any) {
    try {
      const res = await axios.post(`chapters`, formData);
      return res.data.success;
    } catch (error) {
      console.error(error);
    }
  }

  async function getChapter(id: any) {
    try {
      const res = await axios.get(`chapters/${id}`);
      return res.data.data.chapter;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateChapter(id: any, formData: any) {
    try {
      const res = await axios.patch(`chapters/${id}`, formData);
      return res.data.success;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteChapter(id: any) {
    try {
      const res = await axios.delete(`chapters/${id}`);
      return res.data.success;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    userStories,
    userStory,
    userLiked,
    dateLiked,
    coverPath,
    getUserStories,
    getUserLiked,
    saveUserStory,
    updateUserStory,
    deleteStory,
    saveChapter,
    getChapter,
    updateChapter,
    deleteChapter,
    getStoryById,
  };
});
