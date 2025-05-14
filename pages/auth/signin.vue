<script setup lang="ts">
const auth = useAuthStore();

auth.signIn("mostafa1@mail.com", "12346789");
</script>

<template>
  <div>
    We Are signing in
  </div>
</template>
