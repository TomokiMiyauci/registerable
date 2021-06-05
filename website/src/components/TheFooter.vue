<template>
  <footer
    class="
      border-t
      p-6
      md:p-10
      from-gray-50
      to-white
      dark:border-gray-500
      dark:from-gray-800
      dark:to-gray-900
      h-full
      mt-40
      bg-gradient-to-b
    "
  >
    <span class="space-x-2"
      ><span class="uppercase font-bold text-black dark:text-gray-200"
        >Deploys by</span
      >
      <logos-vercel
        class="
          w-20
          h-10
          stroke-4
          dark:stroke-gray-200
          md:(w-24
          h-14)
          align-middle
        "
    /></span>

    <p class="text-center space-x-6 p-2 py-6 md:(p-10 space-x-10)">
      <a
        href="https://twitter.com/tomoki_miyauci/"
        title="Twitter"
        target="_blank"
      >
        <logos-twitter class="align-middle w-10 h-10" />
      </a>
      <a
        href="https://github.com/TomokiMiyauci/"
        title="GitHub"
        target="_blank"
      >
        <mdi-github
          class="align-middle text-gray-700 dark:text-gray-200 w-10 h-10"
        />
      </a>
    </p>
    <p class="text-center text-sm md:text-base text-gray-500">
      Copyright © 2021 Registerable Contributers. All rights reserved.
    </p>
  </footer>
</template>
