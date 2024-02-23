<script setup>
import { onMounted, ref } from 'vue'
import Card from './Card.vue'
import Skeleton from './Skeleton.vue'
import EmptyContent from '../reusable/EmptyContent.vue'

const data = ref([])
const isLoading = ref(false)

onMounted(() => {
	isLoading.value = true
	data.value = localStorage.getItem('news')
		? JSON.parse(localStorage.getItem('news'))
		: []
	console.log(data.value)
	isLoading.value = false
})
</script>
<template>
	<div>
		<Skeleton v-if="isLoading" />
		<div v-else-if="data.length === 0">
			<EmptyContent content="No recently read news" />
		</div>
		<div
			v-else
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-cols-auto auto-rows-auto mb-4"
		>
			<div v-for="(item, index) in data" :key="index">
				<Card :item="item" />
			</div>
		</div>
	</div>
</template>
