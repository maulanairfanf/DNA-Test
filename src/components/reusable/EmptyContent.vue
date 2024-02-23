<script setup>
defineProps({
	content: {
		type: String,
		required: true,
	},
})
</script>

<template>
	<div
		class="flex justify-center items-center h-screen w-full text-4xl text-gray-600 font-medium"
	>
		{{ content }}
	</div>
</template>
