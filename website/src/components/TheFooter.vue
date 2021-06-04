<template>
  <footer
    class="
      border-t
      p-6
      md:p-10
      from-gray-50
      to-white
      h-full
      mt-40
      bg-gradient-to-b
    "
  >
    <span class="space-x-2"
      ><span class="uppercase font-bold text-black">Deploys by</span>
      <logos-vercel class="w-20 h-10 md:(w-24 h-14) align-middle"
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
        <logos-github-icon class="align-middle w-10 h-10" />
      </a>
    </p>
    <p class="text-center text-sm md:text-base text-gray-500">
      Copyright © 2021 Registerable Contributers. All rights reserved.
    </p>
  </footer>
</template>
