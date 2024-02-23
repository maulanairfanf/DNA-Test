<script setup>
const props = defineProps({
	item: Object,
})
</script>

<template>
	<div class="rounded overflow-hidden shadow-lg w-full cursor-pointer h-full">
		<a :href="item.url" target="_blank">
			<img
				class="w-full h-72 object-cover"
				:src="item.urlToImage"
				:alt="item.title"
			/>
			<div class="px-6 py-4">
				<div class="font-bold text-xl mb-2">{{ item.title }}</div>
			</div>
		</a>
	</div>
</template>
