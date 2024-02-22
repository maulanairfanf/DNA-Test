<script setup>
import CardSkeleton from './CardSkeleton.vue'
</script>

<template>
	<div
		class="grid grid-cols-10 grid-flow-col gap-4 auto-cols-auto auto-rows-auto mb-4"
	>
		<div
			v-for="index in 5"
			:key="index"
			:class="index === 1 ? 'col-span-4 row-span-2' : 'col-span-3'"
		>
			<CardSkeleton />
		</div>
	</div>
</template>
