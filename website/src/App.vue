<template>
  <the-header />

  <div class="container mx-auto lg:px-8">
    <section class="px-4 text-center pt-10 py-4 md:(pt-30)">
      <h1 class="text-4xl my-3 font-bold">Registerable</h1>
      <p>Check if package name can be registered</p>

      <div class="mt-8 md:my-12 m-1" id="anchor">
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
            dark:bg-gray-600
            hover:(bg-gray-100
            dark:bg-gray-600
            dark:opacity-75)
            focus-within:(ring-4
            scale-103
            shadow-md)
            dark:ring-offset-purple-100
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
              dark:placeholder-gray-200
              dark:text-gray-200
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
            @click="onClickClear('')"
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
              bg-gray-200
              dark:bg-gray-800)
              not-disabled:hover:(bg-gray-300
              text-gray-800
              dark:text-gray-600
              dark:bg-gray-400)
              disabled:(text-gray-300
              dark:text-gray-900
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
              dark:border-gray-500
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
              dark:from-purple-800
              dark:via-pink-800
              dark:bg-opacity-30
              dark:to-yellow-800
              shadow-md)
              dark:bg-gray-700
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

            <span
              class="text-xs md:text-lg mt-1 text-gray-800 dark:text-gray-200"
              >{{ registry }}</span
            >
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

  <transition name="fade">
    <button
      v-show="!isHideTopButton"
      title="To Top"
      class="
        animate-bounce
        fixed
        bottom-20
        md:bottom-6
        rounded-full
        p-2
        right-6
        w-13
        h-13
        md:(w-15
        h-15)
        shadow
        bg-gradient-to-br
        from-purple-400
        via-pink-500
        to-yellow-500
        text-gray-200
      "
      @click="onClick2Top"
    >
      <akar-icons-arrow-up width="1.5em" height="1.5em" />
    </button>
  </transition>

  <Overlay
    v-model="isLoading"
    class="flex backdrop-filter backdrop-blur items-center justify-center"
  >
    <SearchLoader @stop="abc" />
  </Overlay>

  <transition name="slide-left">
    <div
      v-show="notice.isShow"
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
        rounded-xl
        m-2
        flex
        items-center
        justify-between
      "
      :class="notice.class"
    >
      <span class="space-x-3">
        <mdi-check v-if="notice.icon === 'check'" class="align-middle" />
        <mdi-cancel v-else class="align-middle" />
        <span class="align-middle">{{ notice.message }}</span>
      </span>

      <button @click="onClickClose" class="focus:outline-none">
        <mdi-close class="align-middle" />
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { registerable } from 'registerable'
import SearchLoader from './components/SearchLoader.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import Result from './components/Result.vue'
import Overlay from './components/Overlay.vue'
import RegistryIcon from './components/RegistryIcon.vue'
import {
  isEmpty,
  or,
  pipe,
  isLength0,
  N,
  props,
  ifElse,
  tap,
  first
} from 'fonction'
import { changeSearchQuery, safeFocus } from './_utils'
import { isNumber } from '@miyauci/is-valid'

const choiseRegistries = ['deno.land', 'nest.land', 'npm'] as const
const registries = ref<('deno.land' | 'nest.land' | 'npm')[]>([
  'deno.land',
  'nest.land',
  'npm'
])

const input = ref<HTMLInputElement>()
const div = ref<HTMLDivElement>()
const isLoading = ref<boolean>(false)
const search = ref<string>(new URLSearchParams(location.search).get('q') ?? '')
const changeSearch = (val: string): void => {
  search.value = val
}

const noticeOkClass = 'from-cyan-400 via-teal-500 to-yellow-500'
const notice = reactive({
  isShow: false,
  message: 'Cheking is done',
  class: noticeOkClass,
  icon: 'check'
})

const onClick2Top = () =>
  scroll({
    top: 0,
    behavior: 'smooth'
  })

const isHideTopButton = ref<boolean>(true)

const observer = new IntersectionObserver((a) => {
  isHideTopButton.value = first(a).isIntersecting
})

onMounted(() => {
  const target = document.querySelector('#anchor')
  if (target) {
    observer.observe(target)
  }
})

watch(search, (now) =>
  changeSearchQuery(location.href, ifElse(isEmpty(now), '', { q: now }))
)

const onClickClose = (): void => {
  notice.isShow = false
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

const onClickClear = pipe(
  tap(changeSearch),
  tap(() => {
    safeFocus(input.value)
  })
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
  notice.isShow = false
}, 3000)

let abortController: AbortController | undefined

const abc = () => {
  abortController?.abort()
}

const onClick = async () => {
  if (or(isEmpty(search.value), () => isLoading.value)) return
  abortController = new AbortController()
  isLoading.value = true
  input.value?.blur()

  await nextTick()
  if (isLength0(registries.value)) {
    registries.value = ['deno.land', 'nest.land', 'npm']
  }

  try {
    const { name, result, error } = await registerable(search.value, {
      mode: 'universal',
      registry: registries.value,
      signal: abortController.signal
    })
    notice.message = 'Cheking is done'
    notice.class = noticeOkClass
    notice.icon = 'check'
    notice.isShow = true

    set()
    chagneState(state, { name, result, error })
    isLoading.value = false

    await nextTick()
    div.value?.scrollIntoView({
      behavior: 'smooth'
    })
  } catch {
    chagneState(state, { name: '', result: {}, error: {} })
    isLoading.value = false
    notice.message = 'Request has canceled'
    notice.class = 'from-purple-400 via-pink-500 to-yellow-500'
    notice.icon = 'cancel'
    notice.isShow = true
    set()
  }
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
