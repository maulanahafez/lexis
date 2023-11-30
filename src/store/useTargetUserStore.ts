import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './useUserStore';

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

  const userStore = useUserStore();

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

  const isFollowsTarget = ref(false);

  const targetStories = ref<Story[]>([]);

  const targetLiked = ref<Chapter[]>([]);

  const dateLiked = computed(() => {
    return targetLiked.value.map((chapter) => {
      return new Date(chapter.created_at!).toLocaleString();
    });
  });

  const getTargetUser = async (id: any) => {
    const res = await axios.get(`/user/${id}`, {
      params: { from: userStore.user.id },
    });
    targetUser.value = res.data.targetUser;
    targetStories.value = res.data.targetStories;
    targetStats.value = res.data.targetStats;
    if (res.data.isFollowsTarget) {
      isFollowsTarget.value = true;
    } else {
      isFollowsTarget.value = false;
    }
  };

  const followTarget = async () => {
    const res = await axios.post(`follow/${targetUser.value.id}`, {
      follower_id: userStore.user.id,
    });
    if (res.data.follow) {
      isFollowsTarget.value = true;
    } else {
      isFollowsTarget.value = false;
    }
  };

  async function getTargetLiked(id: any) {
    try {
      const res = await axios.get(`user/${id}/likes`);
      targetLiked.value = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    targetUser,
    targetStories,
    targetStats,
    targetLiked,
    isFollowsTarget,
    dateLiked,
    getTargetUser,
    followTarget,
    getTargetLiked,
  };
});
