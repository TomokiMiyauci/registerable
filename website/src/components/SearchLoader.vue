<template>
  <span
    class="
      min-h-20 min-w-20
      md:(h-40
      w-40)
      rounded-md
      transition-shadow
      duration-300
      hover:(shadow-xl)
      p-5
      shadow-md
      bg-white
      flex flex-col
      gap-2
      items-center
      justify-center
    "
  >
    <Loading :radius="24" :stroke="4" color="warning" />

    Searching
  </span>
</template>

<script setup lang="ts">
import { Loading } from 'xross-vue'
</script>
