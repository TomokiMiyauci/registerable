<template>
  <header class="shadow items-center justify-between flex text-3xl p-2 px-3">
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

    <a
      href="https://github.com/TomokiMiyauci/registerable/tree/main"
      target="_blank"
    >
      <logos-github-icon />
    </a>
  </header>

  <div class="container mx-auto lg:px-8">
    <section class="px-4 text-center pt-10 py-4 md:(pt-30)">
      <h1 class="text-4xl my-3 font-bold">Registerable</h1>
      <p>Check if package name can be registered</p>

      <div class="mt-8 md:my-12 m-1">
        <span
          class="
            flex
            items-center
            mx-auto
            max-w-2xl
            overflow-hidden
            shadow
            rounded-full
            transition
            duration-300
            transform
            hover:bg-gray-100
            focus-within:(ring-4
            scale-103
            shadow-md)
            ring-gray-400 ring-opacity-70 ring-offset-gray-800 ring-offset-1
          "
        >
          <mdi-magnify class="ml-4 w-8 h-8" />
          <input
            ontouchstart=""
            v-model="search"
            placeholder="Check package name"
            spellcheck="false"
            autofocus
            ref="input"
            @keydown.enter="onClick"
            class="
              py-2
              w-full
              px-2
              outline-none
              text-gray-800
              bg-transparent
              ring-fuchsia-300
            "
          />
          <button
            class="
              p-2
              flex
              transition
              duration-300
              active:text-blue-600
              focus:(outline-none
              bg-blue-200
              text-blue-500)
              hover:(bg-blue-200
              text-blue-400
              )
              text-blue-300
            "
            @click="clear"
            v-show="searchable"
          >
            <mdi-close-circle class="w-7 h-7" />
          </button>
          <button
            class="
              flex
              transition
              duration-300
              h-full
              p-2
              focus:(outline-none
              bg-gray-200)
              not-disabled:hover:(bg-gray-300
              text-gray-800)
              disabled:(text-gray-300
              cursor-not-allowed)
            "
            :disabled="!searchable"
            @click="onClick"
          >
            <mdi-send class="w-7 h-7" />
          </button>
        </span>
      </div>

      <div class="space-x-3 md:space-x-6 mt-9 md:mt-12 flex justify-center">
        <template v-for="registry in choiseRegistries">
          <input
            class="appearance-none"
            :id="registry"
            type="checkbox"
            v-model="registries"
            :value="registry"
          />
          <label
            :for="registry"
            ontouchstart=""
            class="
              cursor-pointer
              inline-flex
              opacity-70
              border
              p-2
              w-22
              h-22
              bg-gradient-to-br
              md:(
              w-30
              h-30)
              hover:(
              from-purple-100
              via-pink-100
              to-yellow-100
              shadow-md)
              transform
              active:scale-110
              transition
              duration-300
              items-center
              flex-col
              relative
              justify-center
              rounded-md
              shadow
            "
          >
            <logos-deno
              v-if="registry === 'deno.land'"
              class="w-12 h-12 md:(w-16 h-16)"
            />
            <mdi-egg-easter
              v-else-if="registry === 'nest.land'"
              class="w-12 h-12 md:(w-16 h-16) text-green-400"
            />
            <logos-npm-icon
              v-else-if="registry === 'npm'"
              class="w-12 h-12 md:(w-16 h-16)"
            />
            <span class="text-xs md:text-lg mt-1 text-gray-800">{{
              registry
            }}</span>
          </label>
        </template>
      </div>

      <h2 class="mt-2 text-lg md:text-2xl max-w-4xl mx-auto">Registry</h2>
      <p class="text-gray-500 md:mt-2 text-sm md:text-base max-w-4xl mx-auto">
        Select the registry to query. The smaller the number, the faster.
      </p>
    </section>

    <div v-show="resulted" class="p-4">
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
          >{{ state.name }}</code
        >
      </h2>

      <div
        class="
          border
          rounded-2xl
          shadow
          hover:shadow-md
          overflow-hidden
          w-full
          max-w-4xl
          mx-auto
        "
      >
        <table class="w-full">
          <tr class="border-b shadow bg-gray-50">
            <th class="p-3 border-r">Registry</th>
            <th>Registerable</th>
          </tr>
          <tr
            class="hover:bg-gray-100 transition-colors duration-200"
            v-for="[registry, is] in registryPair"
          >
            <td class="p-3 text-center md:text-left border-r">
              <logos-deno
                v-if="registry === 'deno.land'"
                class="w-7 h-7 align-middle"
              /><logos-npm-icon
                v-else-if="registry === 'npm'"
                class="w-7 h-7 align-middle"
              /><mdi-egg-easter
                v-else-if="registry === 'nest.land'"
                class="w-7 h-7 align-middle text-green-400"
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
                  class="
                    hidden
                    md:inline
                    ml-2
                    text-green-600 text-lg
                    align-middle
                  "
                  >The name is registerable</span
                >
              </template>
              <template v-else>
                <mdi-close-circle class="text-red-500 w-7 h-7 align-middle" />
                <span
                  class="
                    hidden
                    md:inline
                    align-middle
                    ml-2
                    text-red-600 text-lg
                  "
                  >The name is not registerable</span
                >
              </template>

              <template v-if="has(registry, state.error)">
                <p class="space-x-1">
                  <mdi-information class="align-middle text-amber-400" />
                  <span
                    class="
                      text-sm text-gray-500
                      border-b border-dotted border-amber-400
                    "
                  >
                    {{ state.error[registry] }}
                  </span>
                </p>
              </template>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <Overlay
      v-model="isLoading"
      class="flex items-center justify-center bg-gray-300 bg-opacity-50"
    >
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
    </Overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { registerable } from 'registerable'
import Overlay from './components/Overlay.vue'
import {
  has,
  isEmpty,
  or,
  keys,
  length,
  isLength0,
  N,
  props,
  ifElse
} from 'fonction'
import { Loading } from 'xross-vue'
type Option = {
  mode: 'server' | 'universal'
  json: boolean
  registry: []
  languages: ['typescript', 'javascript']
}

const choiseRegistries = ['deno.land', 'nest.land', 'npm'] as const
const registries = ref<('deno.land' | 'nest.land' | 'npm')[]>([
  'deno.land',
  'nest.land',
  'npm'
])
const input = ref<HTMLInputElement>()

const isLoading = ref<boolean>(false)
const search = ref<string>(new URLSearchParams(location.search).get('q') ?? '')
watch(search, (now) => {
  const url = new URL(location.href)
  const urlSearchParams = ifElse(
    isEmpty(now),
    '',
    () => new URLSearchParams({ q: now })
  )
  url.search = urlSearchParams.toString()
  history.replaceState(undefined, '', url.toString())
})

const clear = () => {
  search.value = ''
  if (input.value) {
    input.value.focus()
  }
}

const reset = (): void => {
  state.name = ''
  state.result = {}
  state.error = {}
}
const state = reactive<{
  name: string
  result: Record<string, boolean>
  error: Record<string, string>
}>({
  name: '',
  result: {},
  error: {}
})

const onClick = async () => {
  if (or(isEmpty(search.value), () => isLoading.value)) return
  isLoading.value = true
  if (isLength0(registries.value)) {
    registries.value = ['deno.land', 'nest.land', 'npm']
  }
  reset()
  const { name, result, hasError, error } = await registerable(search.value, {
    mode: 'universal',
    registry: registries.value
  })

  state.name = name
  state.result = result
  if (hasError) {
    state.error = error
  }

  isLoading.value = false
}

const searchable = computed(() => !isEmpty(search.value))
const registryPair = computed(() => Object.entries(state.result))
const resulted = computed<boolean>(() => N(isEmpty(props('name', state))))
</script>

<style>
body {
  @apply antialiased text-gray-600;
}

input[type='checkbox']:checked + label {
  @apply from-purple-400 via-pink-500 to-yellow-500 opacity-100 ring-3 md:ring-5 ring-yellow-300 ring-opacity-70 ring-offset-2 ring-offset-purple-500;
}
</style>
