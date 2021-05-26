<template>
  <header class="shadow items-center justify-between flex text-3xl p-2 px-3">
    <h1><span class="text-red-600">N</span>ameable</h1>

    <a
      href="https://github.com/TomokiMiyauci/registerable/tree/main"
      target="_blank"
    >
      <logos-github-icon />
    </a>
  </header>

  <div class="container mx-auto lg:px-8">
    <section class="px-4 text-center p-5">
      <h1 class="text-4xl my-3">Registerable</h1>
      <p>Check module name</p>

      <div class="mt-8 m-1">
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
            hover:bg-gray-100
            focus-within:(ring-2
            text-red-400)
            ring-red-400
          "
        >
          <mdi-magnify class="ml-4 w-8 h-8" />
          <input
            v-model="search"
            placeholder="Check module name"
            spellcheck="false"
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
              flex
              transition
              duration-300
              h-full
              p-2
              outline-none
              hover:bg-red-200
              focus:(outline-none
              bg-red-200)
            "
            @click="onClick"
          >
            <mdi-send class="w-7 h-7" />
          </button>
        </span>
      </div>
    </section>

    <div class="p-4">
      <h2 class="mt-5 my-3 lg:mt-30 max-w-4xl mx-auto">
        <span class="text-2xl">Result</span>
        <code
          class="bg-gray-100 ml-2 p-0.5 shadow shadow-warm-gray-100 rounded"
          >{{ state.name }}</code
        >
      </h2>

      <table class="w-full max-w-4xl mx-auto border">
        <tr class="border">
          <th class="p-3">Registry</th>
          <th>useable</th>
        </tr>
        <tr v-for="[registry, is] in registryPair">
          <td class="p-3">
            <logos-deno
              v-if="registry === 'deno.land'"
              class="align-middle"
            /><logos-npm-icon
              v-else-if="registry === 'npm'"
              class="align-middle"
            /><mdi-egg-easter
              v-else-if="registry === 'nest.land'"
              class="align-middle text-green-400"
            />
            <span class="px-3">{{ registry }}</span>
          </td>
          <td class="text-left">
            <template v-if="is">
              <mdi-check-circle class="text-green-500 align-middle" />
              The name is available
            </template>
            <template v-else>
              <mdi-close-circle class="text-red-500 align-middle" />
              The name is not available
            </template>

            <template v-if="has(registry, state.error)">
              <p>
                <mdi-information class="align-middle" />
                {{ state.error[registry] }}
              </p>
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { checkName } from 'registerable'
import { has } from 'fonction'

type Option = {
  mode: 'server' | 'universal'
  json: boolean
  registry: []
  languages: ['typescript', 'javascript']
}

const search = ref<string>('')
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
  const { name, result, hasError, errors } = await checkName(search.value, {
    mode: 'universal',
    silent: true
  })

  state.name = name
  state.result = result
  if (hasError) {
    state.error = errors.reduce(
      (acc, [registry, msg]) => ({
        ...acc,
        [registry]: msg
      }),
      {}
    )
  }

  console.log(result)
}

const registryPair = computed(() => Object.entries(state.result))
</script>

<style>
body {
  @apply antialiased text-gray-700;
}
</style>
