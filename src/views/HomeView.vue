<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">🚀 My Blog</h1>

    <!-- Add Blog -->
    <form @submit.prevent="addBlog" class="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg mb-8">
      <input
          v-model="newBlog.title"
          type="text"
          placeholder="Blog Title"
          class="w-full border p-2 rounded mb-3"
          required
      />
      <textarea
          v-model="newBlog.content"
          placeholder="Write your blog..."
          class="w-full border p-2 rounded mb-3"
          rows="4"
          required
      ></textarea>
      <button class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
        Add Blog
      </button>
    </form>

    <!-- Blog List -->
    <div v-for="blog in blogs" :key="blog.id" class="bg-white p-6 rounded-xl shadow-md w-full max-w-lg mb-4">
      <h2 class="text-2xl font-semibold text-gray-700">{{ blog.title }}</h2>
      <p class="text-gray-600 mt-2">{{ blog.content }}</p>

      <!-- Rating -->
      <div class="flex items-center gap-2 mt-4">
        <span class="text-yellow-500">⭐</span>
        <span>{{ blog.rating || 0 }}</span>
        <button @click="rateBlog(blog.id, (blog.rating || 0) + 1)" class="ml-4 bg-green-500 text-white px-3 py-1 rounded">
          Rate +
        </button>
      </div>

      <!-- Delete -->
      <button @click="deleteBlog(blog.id)" class="mt-4 bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const blogs = ref([]);
const newBlog = ref({ title: "", content: "" });

const fetchBlogs = async () => {
  blogs.value = [];
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((docSnap) => {
    blogs.value.push({ id: docSnap.id, ...docSnap.data() });
  });
};

const addBlog = async () => {
  await addDoc(collection(db, "blogs"), {
    title: newBlog.value.title,
    content: newBlog.value.content,
    rating: 0,
  });
  newBlog.value = { title: "", content: "" };
  fetchBlogs();
};

const deleteBlog = async (id) => {
  await deleteDoc(doc(db, "blogs", id));
  fetchBlogs();
};

const rateBlog = async (id, newRating) => {
  const blogRef = doc(db, "blogs", id);
  await updateDoc(blogRef, { rating: newRating });
  fetchBlogs();
};

onMounted(fetchBlogs);
</script>
