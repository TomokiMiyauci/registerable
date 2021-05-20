<template>
  <header class="shadow p-2">Nameable</header>

  <div class="text-center m-3">
    <span>
      <input
        v-model="search"
        placeholder="Search"
        class="
          rounded-full
          shadow
          py-2
          px-4
          focus:ring-2
          outline-none
          ring-fuchsia-300
        "
      />
      <button @click="onClick">hoge</button>
    </span>

    {{ search }}
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

type Option = {
  mode: "server" | "universal";
  json: boolean;
  registry: [];
  languages: ["typescript", "javascript"];
};




const search = ref<string>('')

const onClick = () => {

}

const query = () => {
  fetch('')
}
</script>
