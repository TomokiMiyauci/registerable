<template>
  <h2 class="mt-5 my-3 lg:mt-30 text-xl max-w-4xl mx-auto">
    <code
      class="
        p-1
        text-white
        bg-gradient-to-br
        from-violet-800
        via-pink-600
        to-yellow-400
        px-3
        rounded-full
        shadow
      "
      >{{ name }}</code
    >
  </h2>
  <div
    class="
      border
      dark:border-gray-500
      rounded-2xl
      transition-shadow
      duration-300
      shadow
      hover:shadow-md
      overflow-hidden
      w-full
      max-w-4xl
      mx-auto
    "
  >
    <table class="w-full">
      <tr
        class="border-b dark:border-gray-700 shadow bg-gray-50 dark:bg-gray-600"
      >
        <th class="p-3 border-r dark:border-gray-500">Registry</th>
        <th>Registerable</th>
      </tr>
      <tr
        class="
          hover:(bg-gray-100
          dark:bg-gray-800 dark:bg-opacity-90)
          transition-colors
          duration-200
        "
        v-for="[registry, is] in result"
      >
        <td class="p-3 text-center md:text-left border-r dark:border-gray-500">
          <RegistryIcon
            :icon="registry"
            class="w-7 h-7 align-middle text-green-400"
            :class="
              registry === 'deno.land' ? 'dark:stroke-white dark:stroke-6' : ''
            "
          />

          <span
            class="
              px-3
              md:text-xl
              text-transparent
              align-middle
              bg-clip-text bg-gradient-to-br
              from-blue-800
              to-pink-400
            "
            >{{ registry }}</span
          >
        </td>
        <td class="text-center md:text-left px-1 md:px-3 py-2">
          <template v-if="is">
            <mdi-check-circle class="text-green-500 w-7 h-7 align-middle" />
            <span
              class="hidden md:inline ml-2 text-green-600 text-lg align-middle"
              >The name is registerable</span
            >
          </template>
          <template v-else>
            <div class="md:(flex justify-between) relative">
              <span>
                <mdi-close-circle class="text-red-500 w-7 h-7 align-middle" />
                <span
                  class="
                    hidden
                    md:inline
                    align-middle
                    ml-2
                    text-red-600 text-lg
                  "
                  >{{
                    has(registry, error)
                      ? 'The name is invalid'
                      : 'The package already exists'
                  }}</span
                >
              </span>

              <a
                :href="getPackageURL(registry, name)"
                target="_blank"
                title="Link to registry"
              >
                <akar-icons-link-out
                  v-if="!has(registry, error)"
                  class="
                    align-middle
                    text-gray-500
                    w-7
                    h-7
                    absolute
                    md:(static
                    right-auto) right-1
                  "
                />
              </a>
            </div>
          </template>

          <template v-if="has(registry, error)">
            <p class="space-x-1">
              <mdi-help-circle class="align-middle text-amber-400" />
              <span
                class="
                  text-sm text-gray-500
                  border-b border-dotted border-amber-400
                "
              >
                {{ error[registry] }}
              </span>
            </p>
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { getPackageURL } from '../_utils'
import RegistryIcon from '../components/RegistryIcon.vue'
defineProps<{
  result: [string, boolean][]
  error: Record<string, string>
  name: string
}>()
import { has } from 'fonction'
</script>
