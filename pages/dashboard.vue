<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
  <div>
    <pre>{{ auth.user }}</pre>
    <strong>
      Dashboard
    </strong>
  </div>
</template>
