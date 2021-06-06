import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/website/',
  plugins: [
    WindiCSS(),
    Components({
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: ''
      })
    }),
    ViteIcons()
  ]
})
