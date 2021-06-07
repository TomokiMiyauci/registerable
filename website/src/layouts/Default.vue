<template>
  <TheHeader />
  <div class="flex flex-row">
    <aside
      class="
        w-72
        flex-0
        hidden
        rounded-br-full
        md:block
        h-auto
        py-10
        p-4
        border-b border-r
        bg-gray-100
        dark:bg-gray-900
        dark:border-gray-600
      "
    >
      <ul>
        <li>
          <a
            class="
              block
              py-1.5
              px-3
              text-lg
              rounded-lg
              text-gray-200
              bg-gradient-to-br
              from-purple-400
              via-pink-500
              to-yellow-500
              hover:(
              opacity-80
              )
              transition
              duration-300
            "
            href="/"
          >
            Home</a
          >
        </li>
      </ul>
      <div class="uppercase px-3 mt-6 py-1.5 text-gray-400">api</div>
      <ul>
        <li v-for="{ title, to } in links" :key="title">
          <a :href="to" class="px-3 block py-1.5"> {{ title }} </a>
        </li>
      </ul>
    </aside>
    <div class="flex-1 h-full">
      <main class="container max-w-5xl mx-auto py-8 px-4 md:px-8 prose">
        <Content />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
const links = [
  {
    title: 'CLI',
    to: '/api/cli/'
  },
  {
    title: 'JavaScript API',
    to: '/api/javascript/'
  },
  {
    title: 'RESTful API',
    to: '/api/restful/'
  }
]
</script>
