<template>
	<div id="main-card-component">
		<div class="rounded bg-tb-primary py-4 xl:py-8 px-4 xl:px-8">
			<input type="file" ref="imageLoad" class="hidden" />
			<p class="text-22 text-tb-black font-normal">My Profile</p>
			<p
				class="text-tb-primary-dark mt-1 leading-snug"
			>Please complete your profile by filling up the fields below</p>
			<div class="rounded border-tb-primary-dark border py-4 px-4 xl:px-8 flex justify-between mt-5">
				<div class="w-1/2 flex items-center">
					<img src="~/assets/images/profile.jpg" class="profile-img rounded-full" alt />
					<span class="text-tb-primary-dark leading-tight ml-4">
						You can upload jpg, png or gif images files
						Max size of 5mb.
					</span>
				</div>
				<div class="btn-wrapper flex items-center">
					<div
						class="main-button-sm main-button-yellow"
						@click="$refs.imageLoad.click()"
					>Upload new photo</div>
					<div class="main-button-sm ml-2 main-button-blood">Remove</div>
				</div>
			</div>
			<div class="flex gap-3 xl:gap-6 mt-5">
				<input
					type="text"
					class="form-input rounded-full border-transparent px-6 py-3 w-full"
					placeholder="First Name"
				/>
				<input
					type="text"
					class="form-input rounded-full border-transparent px-6 py-3 w-full"
					placeholder="Last Name"
				/>
			</div>
			<div class="flex gap-3 xl:gap-6 mt-4">
				<input
					type="text"
					class="form-input rounded-full border-transparent px-6 py-3 w-full"
					placeholder="Email"
				/>
				<input
					type="text"
					class="form-input rounded-full border-transparent px-6 py-3 w-full"
					placeholder="Phone Number"
				/>
			</div>
			<p class="text-22 text-tb-black font-normal mt-5">My Password</p>
			<p
				class="text-tb-primary-dark mt-1 leading-snug"
			>You login via email. you can set your password here</p>
			<div class="flex gap-3 xl:gap-6 mt-4">
				<input
					type="password"
					class="form-input rounded-full border-transparent px-6 py-3 w-full"
					placeholder="New Password"
				/>
				<input
					type="password"
					class="form-input rounded-full border-transparent px-6 py-3 w-full"
					placeholder="Repeat Password"
				/>
			</div>
			<div class="flex gap-3 xl:gap-6 mt-5">
				<div class="main-button w-full opacity-0 pointer-events-none"></div>
				<div class="main-button w-full">Update Profile</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MainCard",
};
</script>

<style scoped>
.profile-img {
	width: 58px;
}
</style>