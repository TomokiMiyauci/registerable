<template>
  <span
    class="
      min-h-32 min-w-32
      md:(h-40
      w-40)
      rounded-xl
      transition-shadow
      duration-300
      hover:(shadow-xl)
      p-5
      shadow-md
      bg-white
      dark:bg-gray-500
      flex flex-col
      gap-2
      items-center
      justify-center
    "
  >
    <span class="relative">
      <Loading :radius="30" :stroke="4" color="warning" />
      <button
        @click="$emit('stop')"
        class="
          absolute
          top-0
          inset-0
          text-teal-500
          hover:(text-teal-600
          dark:text-teal-500) dark:text-teal-400
          transition-colors
          duration-300
          mx-auto
        "
      >
        <mdi-stop-circle class="w-15 h-15" />
      </button>
    </span>

    Searching
  </span>
</template>

<script setup lang="ts">
import { Loading } from 'xross-vue'
</script>
