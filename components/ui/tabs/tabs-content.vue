<script setup lang="ts">
import type { TabsContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";

import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { TabsContent } from "reka-ui";

const props = defineProps<TabsContentProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <TabsContent
    data-slot="tabs-content"
    :class="cn('flex-1 outline-none', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </TabsContent>
</template>
