<script setup>
import { onMounted, ref, watch, reactive } from 'vue'
import Card from './Card.vue'
import api from '../../hooks/api'
import Skeleton from './Skeleton.vue'
import { useRoute } from 'vue-router'
import EmptyContent from '../reusable/EmptyContent.vue'

const data = reactive([])
const isLoading = ref(false)
const route = useRoute()
const query = ref('')
const page = ref(1)

async function fetchNews() {
	isLoading.value = true
	const params = {
		q: query.value,
		pageSize: 10,
		page: page.value,
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
	console.log(payload)
	const midIndex = Math.floor(payload.length / 2)
	const firstPart = payload.slice(0, midIndex)
	const secondPart = payload.slice(midIndex)
	data.push(firstPart)
	data.push(secondPart)
}

function setClass(index, layout) {
	if (layout % 2 === 0 && index === 0) {
		return true
	} else if (layout % 2 === 1 && index === 4) {
		return true
	} else return false
}

async function handleLoadMore() {
	isLoading.value = true
	page.value += 1
	await fetchNews()
	isLoading.value = false
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
	<div v-else-if="data.length === 0">
		<EmptyContent content="News with that keyword was not found" />
	</div>
	<div
		v-else
		v-for="(layout, indexLayout) in data"
		:key="indexLayout"
		class="grid grid-cols-10 md:grid-flow-col gap-4 auto-cols-auto auto-rows-auto mb-4"
	>
		<div
			v-for="(item, index) in layout"
			:key="index"
			:class="
				setClass(index, indexLayout)
					? 'col-span-10 md:col-span-4 md:row-span-2'
					: 'col-span-10 md:col-span-3'
			"
		>
			<Card :item="item" />
		</div>
	</div>
	<div
		class="full-width flex items-center justify-center my-4"
		v-if="data.length !== 0"
	>
		<button
			@click.stop="handleLoadMore()"
			class="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
		>
			Load More
		</button>
	</div>
</template>
