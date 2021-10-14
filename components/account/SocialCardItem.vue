<template>
	<div id="social-card-item-componen">
		<div
			v-bind:class="connected ? 'border border-tb-dark-green bg-tb-white-green' : 'bg-tb-primary border border-tb-primary'"
			class="rounded p-3 xl:p-5 pb-4 xl:pb-6 flex items-start justify-between gap-3 xl:gap-6"
		>
			<img :src="require('~/assets/images/' + network + '-circle.svg')" alt />
			<div class="w-3/4 xl:w-4/5">
				<p
					class="text-tb-primary-dark leading-snug mb-4"
				>{{connected ? 'You are Successfully connected to facebook, you can easily log in using your facebook account' : 'Connect your facebook with one click account so that you can easily log in using your facebook account'}}</p>
				<div
					v-bind:class="connected? 'main-button-blood' : 'main-button-green'"
					class="rounded-full text-white text-sm cursor-pointer w-40 xl:w-48 connect-btn text-center"
				>{{connected? 'Remove connection' : 'Connect to ' + network}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SocialCardItem",
	props: ["connected", "network"],
};
</script>

<style scoped>
.connect-btn {
	padding: 5px 0;
}
</style>