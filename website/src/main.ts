import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import './assets/style.css'
import smoothscroll from 'smoothscroll-polyfill'

// kick off the polyfill!
smoothscroll.polyfill()
createApp(App).mount('#app')
