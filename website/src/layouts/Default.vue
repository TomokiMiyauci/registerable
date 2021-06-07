<template>
  <TheHeader />

  <aside
    class="
      fixed
      top-15
      hidden
      md:block
      md:w-72
      h-screen
      rounded-br-full
      py-10
      p-4
      border-b border-r
      bg-gray-100
      dark:bg-gray-900
      dark:border-gray-600
    "
  >
    <ul class="m-0">
      <li>
        <a
          class="
            block
            py-1.5
            px-3
            text-lg
            rounded-lg
            text-gray-600
            from-purple-400
            via-pink-500
            to-yellow-500
            hover:(
            bg-gray-300
            opacity-80
            )
            transition
            duration-300
          "
          href="/"
          :class="{ 'bg-gradient-to-br text-gray-200': path === '/' }"
        >
          <mdi-home class="mr-2" />
          Home
        </a>
      </li>
    </ul>
    <div class="uppercase px-3 mt-6 py-1.5 text-gray-400">api</div>
    <ul class="m-0 space-y-1">
      <li v-for="{ title, to } in links" :key="title">
        <a
          :href="to"
          :class="{ 'bg-gradient-to-br text-gray-200': path === to }"
          class="
            px-3
            block
            py-1.5
            text-lg
            rounded-lg
            text-gray-600
            from-purple-400
            via-pink-500
            to-yellow-500
            hover:(
            bg-gray-300
            opacity-80
            )
            transition
            duration-300
          "
        >
          {{ title }}
        </a>
      </li>
    </ul>
  </aside>

  <div class="md:pl-72 overflow-x-hidden">
    <main class="container max-w-4xl mx-auto p-4 md:px-12 prose">
      <Content class="dark:text-gray-200" />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import { useRouter } from 'vitepress'
import { computed } from 'vue'
const { route } = useRouter()
const path = computed(() => route.path)

const links = [
  {
    title: 'CLI',
    to: '/api/cli/'
  },
  {
    title: 'JavaScript API',
    to: '/api/javascript/'
  }
]
</script>
