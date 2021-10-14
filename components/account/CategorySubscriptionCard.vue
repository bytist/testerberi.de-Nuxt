<template>
	<div
		id="category-subscription-card-component"
		class="rounded border border-tb-primary-dark flex items-center hover:border-tb-blue"
	>
		<div class="w-16 h-16 ml-8 mr-6 rounded-full relative img-wrapper bg-tb-primary">
			<img :src="require('~/assets/images/category/' + data.thumbnail)" class="absolute w-6" alt />
		</div>
		<div>
			<p class="font-normal text-tb-black mb-4">{{data.name}}</p>
			<div class="main-button-sm main-button-blood px-8 xl:px-12">Unsubscribe</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CategorySubscriptionCard",
	props: ["data"],
};
</script>

<style scoped>
.img-wrapper img {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>