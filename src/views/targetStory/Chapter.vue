<script setup lang="ts">
import AppTabs from '@/components/AppTabs.vue';
import { useTargetStoryStore } from '@/store/useTargetStoryStore';
import { useUserStore } from '@/store/useUserStore';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.core.css';
import {
  chatboxOutline,
  chevronBack,
  heart,
  heartOutline,
} from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Chapter {
  chapter?: {
    id: number | null;
    story_id: number | null;
    title: string | null;
    order_num: number | null;
    content: string | null;
  };
  likes?: number | 0;
  isLiked?: boolean | null | undefined;
}

interface Comment {
  id?: number;
  chapter_id?: number;
  user_id?: number;
  content?: string;
  created_at?: string;
  user?: {
    id: number;
    name: string;
  };
}

const chapter = ref<Chapter>();

const targetStoryStore = useTargetStoryStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const isLoadingLike = ref(false);
const isLoadingComment = ref(false);

const getChapter = async () => {
  isLoading.value = true;
  const res = await targetStoryStore.getChapter(route.params.id);
  chapter.value = res;
  isLoading.value = false;
};

const handleRefresh = async (event: any) => {
  await getChapter();
  event.target?.complete();
};

const likesChapter = async () => {
  isLoadingLike.value = true;
  const res = await targetStoryStore.likesChapter(route.params.id);
  await getChapter();
  isLoadingLike.value = false;
};

const isModalOpen = ref(false);
const setModalOpen = async (open: boolean) => {
  isModalOpen.value = open;
  if (isModalOpen.value === true) {
    await getComments();
  }
};
const comments = ref<Comment[]>([]);
const commentInput = ref('');

const getComments = async () => {
  isLoadingComment.value = true;
  const res = await targetStoryStore.getComments(route.params.id);
  comments.value = res;
  isLoadingComment.value = false;
};

const date = computed(() => {
  return comments.value.map((comment) => {
    return new Date(comment.created_at!).toLocaleString();
  });
});

const sendComment = async () => {
  const data = {
    chapter_id: route.params.id,
    user_id: userStore.user.id,
    content: commentInput.value,
  };
  const res = await targetStoryStore.addComment(data);
  if (res) {
    commentInput.value = '';
    await getComments();
  }
};

onMounted(async () => {
  if (route.params.id !== undefined) {
    getChapter();
  }
});
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton :icon="chevronBack"></IonBackButton>
        </IonButtons>
        <IonTitle> Chapter </IonTitle>
        <IonButtons slot="end">
          <div>
            <div v-if="!isLoadingLike">
              <IonButton v-if="!chapter?.isLiked" @click="likesChapter()">
                <IonIcon :icon="heartOutline" color="danger"> </IonIcon>
              </IonButton>
              <IonButton v-else @click="likesChapter()">
                <IonIcon :icon="heart" color="danger"></IonIcon>
              </IonButton>
            </div>
            <IonButton v-if="isLoadingLike" class="bg-white">
              <IonSpinner name="dots"></IonSpinner>
            </IonButton>
          </div>
          <div>
            <IonButton @click="setModalOpen(true)">
              <IonIcon :icon="chatboxOutline"></IonIcon>
            </IonButton>
          </div>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <div class="container mx-auto px-2 pt-6 pb-24">
        <p class="px-6 mb-4 text-xl font-medium text-center">
          {{ chapter?.chapter?.title }}
        </p>
        <QuillEditor
          contentType="html"
          theme="bubble"
          :content="chapter?.chapter?.content"
          readOnly
        ></QuillEditor>
      </div>

      <IonModal :is-open="isModalOpen">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Comments</IonTitle>
            <IonButtons slot="end">
              <IonButton @click="setModalOpen(false)">Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div
            v-if="!isLoadingComment"
            class="container mx-auto px-4 pt-4 pb-20"
          >
            <form @submit.prevent="sendComment()">
              <label for="comment" class="text-lg font-medium">
                Add Comment
              </label>
              <div class="mt-2 border border-gray-400 rounded-lg px-4 py-3">
                <textarea
                  name="comment"
                  id="comment"
                  class="inline-block w-full bg-white focus:outline-none resize-none"
                  placeholder="Comment... ."
                  rows="3"
                  v-model="commentInput"
                ></textarea>
                <div class="text-end mt-2">
                  <button
                    type="submit"
                    class="px-5 py-3 bg-[#0081C9] rounded-md text-white focus:ring-2 focus:ring-[#0081C9] focus:ring-offset-2 focus:ring-offset-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <div
              v-for="(comment, i) of comments"
              class="border-b border-gray-500 py-4 px-2"
            >
              <p class="text-lg font-semibold line-clamp-1">
                {{ comment.user?.name }}
              </p>
              <p class="text-sm text-gray-400 mt-1">{{ date[i] }}</p>
              <div class="mt-2">
                <p>{{ comment.content }}</p>
              </div>
            </div>
          </div>
          <div v-else class="h-[80%] flex items-center justify-center">
            <IonSpinner name="dots" class="scale-[200%]"></IonSpinner>
          </div>
        </IonContent>
      </IonModal>
      <AppTabs />
    </IonContent>
  </IonPage>
</template>
