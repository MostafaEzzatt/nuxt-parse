<script setup lang="ts">
const auth = useAuthStore();

function signOut() {
  auth.signOut();
}
</script>

<template>
  <div>
    <pre>
      {{ auth.user }}
    </pre>
    <UiButton class="bg-red-500 text-white" @click="signOut">
      Sign Out
    </UiButton>
  </div>
</template>
