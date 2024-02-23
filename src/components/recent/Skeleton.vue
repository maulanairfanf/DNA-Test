<script setup>
import CardSkeleton from '../reusable/CardSkeleton.vue'
</script>

<template>
	<div class="grid grid-cols-3 gap-4 auto-cols-auto auto-rows-auto mb-4">
		<div v-for="index in 8" :key="index">
			<CardSkeleton />
		</div>
	</div>
</template>
