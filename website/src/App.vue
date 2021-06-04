<template>
  <the-header />

  <div class="container mx-auto lg:px-8">
    <section class="px-4 text-center pt-10 py-4 md:(pt-30)">
      <h1 class="text-4xl my-3 font-bold">Registerable</h1>
      <p>Check if package name can be registered</p>

      <div class="mt-8 md:my-12 m-1">
        <span
          title="Search"
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
            v-model.trim="search"
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
            title="Clear"
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

      <div class="mt-9 md:mt-12 flex justify-center">
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
            :title="registry"
            class="
              mx-3
              cursor-pointer
              inline-flex
              opacity-70
              border
              p-2
              w-22
              h-22
              bg-gradient-to-br
              md:(
              mx-4
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
            <RegistryIcon
              :icon="registry"
              class="w-12 h-12 md:(w-16 h-16) text-green-400"
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

    <transition name="expand">
      <div ref="div" v-show="!isLoading && resulted" class="p-4">
        <Result
          :result="registryPair"
          :error="state.error"
          :name="state.name"
        />
      </div>
    </transition>
  </div>

  <the-footer />

  <Overlay
    v-model="isLoading"
    class="flex backdrop-filter backdrop-blur items-center justify-center"
  >
    <SearchLoader />
  </Overlay>

  <transition name="slide-left">
    <div
      v-show="notice"
      class="
        fixed
        inset-x-0
        bottom-0
        md:(
        left-0
        inset-x-auto
        space-x-20
        )
        shadow
        hover:(shadow-md)
        p-3
        text-xl text-white
        bg-gradient-to-br
        border
        from-cyan-400
        via-teal-500
        to-yellow-500
        rounded-xl
        m-2
        flex
        items-center
        justify-between
      "
    >
      <span class="space-x-3">
        <mdi-check class="align-middle" />
        <span class="align-middle">Cheking is done</span>
      </span>

      <button @click="onClickClose" class="focus:outline-none">
        <mdi-close class="align-middle" />
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { registerable } from 'registerable'
import SearchLoader from './components/SearchLoader.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import Result from './components/Result.vue'
import Overlay from './components/Overlay.vue'
import RegistryIcon from './components/RegistryIcon.vue'
import { isEmpty, or, pipe, isLength0, N, props, ifElse } from 'fonction'
import { changeSearchQuery, safeFocus } from './_utils'
import { isNumber } from '@miyauci/is-valid'

const choiseRegistries = ['deno.land', 'nest.land', 'npm'] as const
const registries = ref<('deno.land' | 'nest.land' | 'npm')[]>([
  'deno.land',
  'nest.land',
  'npm'
])
const notice = ref<boolean>(false)
const input = ref<HTMLInputElement>()
const div = ref<HTMLDivElement>()
const isLoading = ref<boolean>(false)
const search = ref<string>(new URLSearchParams(location.search).get('q') ?? '')

watch(search, (now) =>
  changeSearchQuery(location.href, ifElse(isEmpty(now), '', { q: now }))
)

const onClickClose = (): void => {
  notice.value = false
  clearInter()
}

const useSetTimeout = (handler: TimerHandler, mili: number) => {
  let timeoutId: number | undefined = undefined

  const set = () => {
    clear()
    timeoutId = setTimeout(handler, mili)
  }

  const clear = () => {
    if (isNumber(timeoutId)) {
      clearTimeout(timeoutId)
    }
  }

  return { set, clear }
}

const clear = pipe(
  () => {
    search.value = ''
  },
  () => {
    safeFocus(input.value)
  }
)

type RegisterableResult = {
  name: string
  result: Record<string, boolean>
  error: Record<string, string>
}

const state = reactive<RegisterableResult>({
  name: '',
  result: {},
  error: {}
})

const chagneState = (
  state: RegisterableResult,
  { name, result, error }: RegisterableResult
) => {
  state.name = name
  state.result = result
  state.error = error
}

const { set, clear: clearInter } = useSetTimeout(() => {
  notice.value = false
}, 3000)

const onClick = async () => {
  if (or(isEmpty(search.value), () => isLoading.value)) return
  input.value?.blur()
  isLoading.value = true
  await nextTick()
  if (isLength0(registries.value)) {
    registries.value = ['deno.land', 'nest.land', 'npm']
  }

  const { name, result, error } = await registerable(search.value, {
    mode: 'universal',
    registry: registries.value
  })
  notice.value = true
  set()
  chagneState(state, { name, result, error })
  isLoading.value = false
  await nextTick()
  div.value?.scrollIntoView({
    behavior: 'smooth'
  })
}

const searchable = computed(() => !isEmpty(search.value))
const registryPair = computed(() => Object.entries(state.result))
const resulted = computed<boolean>(() => N(isEmpty(props('name', state))))
</script>

<style scoped>
input[type='checkbox']:checked + label {
  @apply from-purple-400 via-pink-500 to-yellow-500 opacity-100 ring-3 md:ring-5 ring-yellow-300 ring-opacity-70 ring-offset-2 ring-offset-purple-500;
}
</style>

<style>
.slide-left-enter-from,
.slide-left-leave-to {
  @apply opacity-0 transform -translate-x-full;
}

.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.expand-enter-from,
.expand-leave-to {
  @apply scale-0 transform origin-top;
}

.expand-enter-active,
.expand-leave-active {
  @apply transition-all duration-300;
}
</style>
