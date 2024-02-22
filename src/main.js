import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

import Home from './pages/Home.vue'
import Recent from './pages/Recent.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/recent', component: Recent },
	],
})

app.use(router)
app.mount('#app')
