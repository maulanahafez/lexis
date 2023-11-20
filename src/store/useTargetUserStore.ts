import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTargetUserStore = defineStore('target-user', function () {
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

  interface Story {
    id: number | undefined | null;
    user_id: number | undefined | null;
    title: string | undefined | null;
    is_published: number | undefined | null;
    cover_path: string | undefined | null;
  }

  interface Stats {
    followers: number;
    following: number;
    likes: number;
  }

  const targetUser = ref<User>({
    id: null,
    uid: null,
    username: null,
    email: null,
    name: null,
    bio: null,
    photoUrl: null,
  });

  const targetStats = ref<Stats>({
    followers: 0,
    following: 0,
    likes: 0,
  });

  const targetStories = ref<Story[]>([]);

  const getTargetUser = async (id: any) => {
    const res = await axios.get(`/user/${id}`);
    targetUser.value = res.data.targetUser;
    targetStories.value = res.data.targetStories;
    targetStats.value = res.data.targetStats;
  };

  return {
    targetUser,
    targetStories,
    targetStats,
    getTargetUser,
  };
});
