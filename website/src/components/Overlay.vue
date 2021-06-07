<template>
  <transition name="fade">
    <div v-show="modelValue" class="inset-0 fixed" :class="class">
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ class?: string; modelValue: boolean }>()
</script>
