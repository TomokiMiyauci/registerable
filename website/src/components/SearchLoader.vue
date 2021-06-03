<template>
  <span
    class="
      min-h-20 min-w-20
      md:(h-40
      w-40)
      rounded-md
      p-5
      bg-white
      shadow
      flex flex-col
      items-center
      justify-center
    "
  >
    <Loading :radius="20" :stroke="4" color="warning" />

    Searching
  </span>
</template>

<script setup lang="ts">
import { Loading } from 'xross-vue'
</script>
