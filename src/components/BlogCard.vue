<template>
  <div v-if="blog && blog.content" class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h3 class="text-xl font-semibold mb-2">{{ blog.title }}</h3>
    <div v-html="blog.content" class="prose max-w-none"></div>
    <p class="text-sm text-gray-500 mt-2">By: {{ blog.authorName }}</p>

    <div class="flex items-center gap-2 mt-4">
      <span class="text-yellow-500">⭐</span>
      <span>{{ blog.rating || 0 }}</span>
      <button
          @click="$emit('rate-blog', blog.id, (blog.rating || 0) + 1)"
          class="ml-4 bg-green-500 text-white px-3 py-1 rounded"
      >
        Rate +
      </button>
      <!-- Conditionally show delete button -->
      <button
          v-if="user && user.uid === blog.authorUid"
          @click="$emit('delete-blog', blog.id)"
          class="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  blog: Object,
  user: Object
});

defineEmits(['delete-blog', 'rate-blog']);
</script>
