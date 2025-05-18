<script setup lang="ts">
import { UiAvatarFallback } from "#components";

const auth = useAuthStore();

function logOut() {
  auth.signOut();
}

const links = [
  { name: "Home", path: "/", whenAuth: true, allways: true },
  { name: "Signin", path: "/auth/signin", whenAuth: false },
  { name: "Signup", path: "/auth/signup", whenAuth: false },
  { name: "Dashboard", path: "/dashboard", whenAuth: true },
];

// Only show links based on authentication status
const filteredLinks = computed(() =>
  links.filter(link => !!auth.user === link.whenAuth || link.allways === true),
);
</script>

<template>
  <div class="bg-zinc-950/95 border-b border-b-zinc-800 text-white/90 absolute left-0 right-0  flex justify-between items-center px-6 min-h-12 print:hidden">
    <NuxtLink
      to="/"
    >
      <h1 class="text-2xl font-bold">
        Utils
      </h1>
    </NuxtLink>
    <div class="flex items-center gap-4">
      <a
        v-for="link in filteredLinks"
        :key="link.name"
        :href="link.path"
        class="text-zinc-200 hover:text-zinc-100 transition-colors duration-200"
      >
        {{ link.name }}
      </a>

      <div v-if="auth.user" class="flex items-center gap-2">
        <UiAvatar>
          <UiAvatarFallback>
            {{ auth.user.name.substring(0, 2) }}
          </UiAvatarFallback>
        </UiAvatar>
        <UiButton
          variant="outline"
          class="dark:text-zinc-200 dark:hover:text-zinc-100 text-zinc-950 hover:text-zinc-800 transition-colors duration-200 flex justify-center items-center gap-2 cursor-pointer"
          @click="logOut"
        >
          Sign out <Icon
            name="hugeicons:logout-square-02"
            size="24"
          />
        </UiButton>
      </div>
      <ColorMode />
    </div>
  </div>
</template>
