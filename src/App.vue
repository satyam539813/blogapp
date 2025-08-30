<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">My Blog</router-link>
      <nav class="flex gap-4 items-center">
        <router-link to="/" class="hover:text-blue-300 transition">Blogs</router-link>
        <router-link to="/create" class="hover:text-blue-300 transition">Create Blog</router-link>

        <div v-if="user" class="flex items-center gap-2">
          <span class="text-gray-300 text-sm">Hello, {{ user.displayName || 'Guest' }}</span>
          <button @click="handleSignOut" class="bg-red-500 text-white px-3 py-1 rounded">
            Sign Out
          </button>
        </div>
      </nav>
    </header>
    <main class="p-6">
      <router-view :user="user" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth, signInWithCustomToken, signInAnonymously, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(null);

const handleSignOut = () => {
  signOut(auth).catch((error) => {
    console.error("Error signing out:", error);
  });
};

onMounted(async () => {
  // Use the provided token for seamless sign-in
  if (typeof __initial_auth_token !== 'undefined') {
    try {
      await signInWithCustomToken(auth, __initial_auth_token);
    } catch (error) {
      console.error("Error signing in with custom token:", error);
      await signInAnonymously(auth);
    }
  } else {
    // Fallback for local development
    await signInAnonymously(auth);
  }

  // Set up the state listener
  onAuthStateChanged(auth, (authUser) => {
    user.value = authUser;
  });
});
</script>
