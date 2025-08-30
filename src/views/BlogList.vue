<script setup>
import { ref } from 'vue'

// Fake blog posts (later replace with Firebase)
const posts = ref([
  { id: 1, title: 'First Post', content: 'This is my first blog post!' },
  { id: 2, title: 'Second Post', content: 'More content goes here...' },
])
</script>

<template>
  <div>
    <h2>Blog Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
