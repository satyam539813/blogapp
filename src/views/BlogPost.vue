<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// Fake data for now
const allPosts = [
  { id: 1, title: 'First Post', content: 'This is my first blog post!' },
  { id: 2, title: 'Second Post', content: 'More content goes here...' },
]

const route = useRoute()
const post = ref(allPosts.find(p => p.id === parseInt(route.params.id)))
</script>

<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <router-link to="/blog">⬅ Back to Blog</router-link>
  </div>
  <div v-else>
    <p>Post not found</p>
  </div>
</template>
