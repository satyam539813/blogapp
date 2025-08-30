<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">📚 Blogs</h2>

    <div v-if="blogs.length === 0" class="text-center text-gray-500">
      No blogs yet.
    </div>

    <div class="grid gap-6">
      <BlogCard
          v-for="blog in blogs"
          :key="blog.id"
          :blog="blog"
          @delete-blog="deleteBlog"
          @rate-blog="rateBlog"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import BlogCard from "./BlogCard.vue";

const blogs = ref([]);

// Listen for real-time updates
onMounted(() => {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  onSnapshot(q, (snapshot) => {
    blogs.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
});

// Delete a blog post
const deleteBlog = async (id) => {
  await deleteDoc(doc(db, "blogs", id));
};

// Update a blog's rating
const rateBlog = async (id, newRating) => {
  const blogRef = doc(db, "blogs", id);
  await updateDoc(blogRef, { rating: newRating });
};
</script>