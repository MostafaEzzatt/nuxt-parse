<script setup lang="ts">
const auth = useAuthStore();
await auth.init();
</script>

<template>
  <div>
    <slot />
  </div>
</template>
