<script setup lang="ts">
const colorMode = useColorMode();

function getThemeIcon() {
  if (colorMode.preference === "dark") {
    return "lucide:moon";
  }
  else if (colorMode.preference === "light") {
    return "lucide:sun";
  }
  else {
    return "lucide:laptop-minimal";
  }
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="outline">
        <Icon :name="getThemeIcon()" size="24" class="text-black dark:text-white" />
        <span class="sr-only">Toggle theme</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem @click="colorMode.preference = 'light'">
        Light
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="colorMode.preference = 'dark'">
        Dark
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="colorMode.preference = 'system'">
        System
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
