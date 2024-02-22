<script setup>
import Card from './Card.vue'
import api from '../hooks/api'
import { onMounted, ref, watch } from 'vue'
import Skeleton from './Skeleton.vue'
import { useRoute } from 'vue-router'

const data = ref([])
const isLoading = ref(false)
const route = useRoute()
const query = ref('')

async function fetchNews() {
	isLoading.value = true
	const params = {
		q: query.value,
		pageSize: 10,
	}
	try {
		const response = await api.get('everything', { params })
		if (response) {
			data.value = response.data.articles
			splitData(data.value)
		}
	} catch (error) {
		console.log('error', error)
	}
	isLoading.value = false
}

function splitData(payload) {
	const midIndex = Math.floor(payload.length / 2)
	const firstPart = payload.slice(0, midIndex)
	const secondPart = payload.slice(midIndex)
	data.value = [firstPart, secondPart]
}

function setClass(index, layout) {
	if (layout === 0 && index === 0) {
		return true
	} else if (layout === 1 && index === 4) {
		return true
	} else return false
}

onMounted(async () => {
	if (route.query.q) query.value = route.query.q
	if (query.value !== '') await fetchNews()
})

watch(route, async newValue => {
	if (newValue) {
		query.value = newValue.query.q
		await fetchNews()
	}
})
</script>

<template>
	<div v-if="isLoading">
		<Skeleton />
	</div>
	<div
		v-else
		v-for="(layout, indexLayout) in data"
		:key="indexLayout"
		class="grid grid-cols-10 grid-flow-col gap-4 auto-cols-auto auto-rows-auto mb-4"
	>
		<div
			v-for="(item, index) in layout"
			:key="index"
			:class="
				setClass(index, indexLayout) ? 'col-span-4 row-span-2' : 'col-span-3'
			"
		>
			<Card :item="item" />
		</div>
	</div>
</template>
