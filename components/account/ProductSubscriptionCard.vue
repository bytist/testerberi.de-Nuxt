<template>
	<div
		id="product-subscription-card-component"
		class="rounded border border-tb-primary-dark flex items-center hover:border-tb-blue"
	>
		<div class="w-24 ml-5 mr-6 h-24 flex justify-center items-center">
			<img :src="require('~/assets/images/product/' + data.thumbnail)" class="max-h-full" alt />
		</div>
		<div>
			<p class="font-normal text-tb-black mb-4">{{data.name}}</p>
			<span class="main-button-sm main-button-blood px-8 xl:px-12">Unsubscribe</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProductSubscriptionCard",
	props: ["data"],
};
</script>

<style scoped>
</style>