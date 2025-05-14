<script setup lang="ts">
const auth = useAuthStore();

auth.signUp("mostafa4@mail.com", "12346789", "mostafa4");
</script>

<template>
  <div>
    We Are creating a new account
  </div>
</template>
