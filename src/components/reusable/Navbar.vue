<script setup>
import { useRouter, useRoute } from 'vue-router'

import { onMounted, ref, computed, watch } from 'vue'
const query = ref('indonesia')
const router = useRouter()
const route = useRoute()

const getRouteQuery = computed(() => {
	if (route.query.q) return `/?q=${route.query.q}`
	else return '/?q=indonesia'
})

function handleSearch() {
	if (route.fullPath === '/') {
		router.push({
			query: {
				q: query.value,
			},
		})
	} else {
		router.push({
			path: '/',
			query: {
				q: query.value,
			},
		})
	}
}

watch(route, async newValue => {
	if (newValue) {
		query.value = newValue.query.q
	}
})
</script>

<template>
	<header class="my-4">
		<div
			class="flex flex-wrap items-center justify-between px-4 py-3 shadow-md"
		>
			<div>
				<input
					type="text"
					class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-grey-600"
					placeholder="Search"
					@keyup.enter="handleSearch"
					v-model="query"
				/>
			</div>
			<div class="block md:flex">
				<router-link
					:to="getRouteQuery"
					class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-50"
					>Home</router-link
				>
				<router-link
					to="recent"
					class="block px-2 py-1 text-black font-semibold rounded hover:bg-gray-50"
					>Recent News</router-link
				>
			</div>
		</div>
	</header>
</template>
