<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
  <div>
    <pre>{{ auth.user }}</pre>
    <strong>
      Dashboard
    </strong>

    <nuxt-link to="/signout">
      Signout
    </nuxt-link>
  </div>
</template>
