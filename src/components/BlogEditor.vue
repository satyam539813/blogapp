<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <h2 class="text-2xl font-bold mb-4">✍️ Create a Blog</h2>

    <input
        v-model="title"
        type="text"
        placeholder="Enter blog title"
        class="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-blue-300"
    />

    <!-- Rich text editor -->
    <QuillEditor
        v-model:content="content"
        contentType="html"
        theme="snow"
        :modules="modules"
        class="mb-4 border rounded-lg"
    />

    <button
        @click="saveBlog"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Publish 🚀
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// Import your new service file
import { addBlog } from "../services/blogService";
import { serverTimestamp } from "firebase/firestore";

const title = ref("");
const content = ref("");

// Quill custom modules for image/video upload
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
};

const saveBlog = async () => {
  if (!title.value || !content.value) {
    alert("Please fill title and content!");
    return;
  }

  // Use the service function to add the blog
  await addBlog({
    title: title.value,
    content: content.value,
    createdAt: serverTimestamp(),
  });

  title.value = "";
  content.value = "";
  alert("✅ Blog published!");
};
</script>
