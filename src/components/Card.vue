<script setup>
import { formateDate } from '../hooks/formatting'
defineProps({
	item: Object,
})
</script>

<template>
	<div class="rounded overflow-hidden shadow-lg w-full border h-full">
		<img class="w-full" :src="item.urlToImage" alt="Sunset in the mountains" />
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">{{ item.title }}</div>
			<p class="text-gray-700 text-base">{{ item.description }}</p>
		</div>
		<div class="px-6 pt-4 pb-2">
			<span
				class="inline-block bg-yellow-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
				>Source: {{ item.source.name }}</span
			>
			<span
				class="inline-block bg-blue-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
				>Author: {{ item.author }}
			</span>
			<span
				class="inline-block bg-green-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
				>Published: {{ formateDate(item.publishedAt) }}
			</span>
		</div>
	</div>
</template>
