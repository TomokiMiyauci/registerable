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
      <div>
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
      </div>
    </aside>
    <Content class="flex-1 h-full" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'

import TheHeader from '../components/TheHeader.vue'
</script>
