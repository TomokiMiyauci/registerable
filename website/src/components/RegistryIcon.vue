<template>
  <logos-deno v-if="icon === 'deno.land'" :class="class" /><logos-npm-icon
    v-else-if="icon === 'npm'"
    :class="class"
  /><mdi-egg-easter v-else-if="icon === 'nest.land'" :class="class" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ icon: string; class?: string | any[] }>()
</script>
