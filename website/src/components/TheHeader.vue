<template>
  <header
    class="
      shadow
      z-1
      bg-white
      dark:bg-gray-900
      dark:(border-b
      border-gray-500)
      items-center
      justify-between
      flex
      sticky
      top-0
      text-3xl
      py-2
      px-6
    "
  >
    <h1
      class="
        text-shadow
        bg-clip-text
        text-transparent
        bg-gradient-to-br
        from-violet-900
        via-pink-600
        to-yellow-300
      "
    >
      Registerable
    </h1>

    <span class="space-x-6 flex">
      <button
        title="Color mode"
        class="
          hover:(bg-gray-200
          dark:bg-gray-700)
          transition-colors
          duration-300
          rounded-lg
          p-2.5
          text-xs
          leading-none
          bg-gray-100
          dark:bg-gray-800
        "
        @click="toggleDark"
      >
        <carbon-moon width="1.2rem" height="1.2rem" v-if="isDark" />
        <jam-sun-f width="1.2rem" height="1.2rem" v-else />
      </button>
      <a
        href="https://github.com/TomokiMiyauci/registerable/tree/main"
        target="_blank"
        title="GitHub"
        class="
          hover:(bg-gray-200
          dark:bg-gray-700)
          transition-colors
          duration-300
          rounded-lg
          p-2.5
          text-xs
          leading-none
          bg-gray-100
          dark:bg-gray-800
        "
      >
        <mdi-github width="1.2rem" class="dark:text-gray-200" height="1.2rem" />
      </a>
    </span>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
