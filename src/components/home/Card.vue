<script setup>
import { formateDate } from '../../hooks/formatting'

const props = defineProps({
	item: Object,
})

function handleSaveToLocalStorage() {
	const array = localStorage.getItem('news')
		? JSON.parse(localStorage.getItem('news'))
		: []

	const news = {
		title: props.item.title,
		urlToImage: props.item.urlToImage,
		url: props.item.url,
	}

	const isAlready = array.some(item => item.url === props.item.url)

	if (!isAlready) {
		array.unshift(news)
		localStorage.setItem('news', JSON.stringify(array))
	}
}
</script>

<template>
	<div class="rounded overflow-hidden shadow-lg w-full cursor-pointer h-full">
		<a :href="item.url" target="_blank" @click="handleSaveToLocalStorage()">
			<img
				class="w-full h-72 object-cover"
				:src="item.urlToImage"
				:alt="item.title"
			/>
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
		</a>
	</div>
</template>
