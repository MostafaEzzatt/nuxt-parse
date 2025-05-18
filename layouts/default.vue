<script setup lang="ts">
const auth = useAuthStore();
await auth.init();
</script>

<template>
  <div class="w-full min-h-screen">
    <Navbar />
    <div class="pt-16 print:pt-0">
      <slot />
    </div>
  </div>
</template>
