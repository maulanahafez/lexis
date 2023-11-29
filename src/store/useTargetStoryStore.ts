import axios from 'axios';
import { defineStore } from 'pinia';
import { useUserStore } from './useUserStore';

export const useTargetStoryStore = defineStore('target-story', function () {
  const userStore = useUserStore();

  async function getStory(id: any) {
    try {
      const res = await axios.get(`stories/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getChapter(id: any) {
    try {
      const res = await axios.get(`chapters/${id}`, {
        params: { user_id: userStore.user.id },
      });
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function likesChapter(chapterId: any) {
    const res = await axios.post(`like/${chapterId}`, {
      user_id: userStore.user.id,
    });
    return res.data;
  }

  async function getComments(chapterId: any) {
    const res = await axios.get(`chapters/${chapterId}/comments`);
    return res.data;
  }

  async function addComment(data: any) {
    const res = await axios.post('comments', data);
    return res.data.success;
  }

  async function deleteComment(chapter: any) {
    //
  }

  return {
    getStory,
    getChapter,
    likesChapter,
    getComments,
    addComment,
    deleteComment,
  };
});
