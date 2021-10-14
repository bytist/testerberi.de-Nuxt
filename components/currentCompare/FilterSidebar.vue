<template>
	<div id="filter-sidebar">
		<div class="rounded bg-tb-primary py-3">
			<div class="filter-wrapper">
				<div class="accordion">
					<div class="accordion-nav flex justify-between gap-5 items-center px-4 select-none py-2">
						<span
							@click="accordionActive.byDate = !accordionActive.byDate"
							class="flex items-center cursor-pointer w-full"
						>
							<img
								src="~/assets/images/accordion-arrow.svg"
								alt
								v-bind:class="accordionActive.byDate?'rotate-90':''"
								class="transition duration-200 transform"
							/>
							<span class="text-tb-black ml-2 text-base">Ausgaben</span>
						</span>
						<span @click="checkedFilter.byDate = []" class="reload-icon cursor-pointer">
							<img src="~/assets/images/reset.svg" class="transition transform duration-200" v-bind:class="{'scale-75': !accordionActive.byDate}" alt />
						</span>
					</div>
					<transition name="fade">
						<div v-if="accordionActive.byDate" class="accordion-content h-88 overflow-y-hidden">
							<div class="content-wrapper py-1 w-full">
								<div class="byDate-search mb-2 px-4">
									<input
										type="text"
										class="form-input rounded-full border-transparent px-4 py-3 placeholder-tb-primary-dark w-full"
										placeholder="Search Ausgaben"
									/>
								</div>

								<div class="h-72 overflow-y-auto nice-scroll pl-4 mr-5">
									<label
										v-for="(item, index) in filterData.byDate"
										:key="index"
										class="category-check-item flex items-center my-1"
									>
										<input
											type="checkbox"
											name="byDate"
											class="form-checkbox rounded-full border-transparent"
											:value="index"
											v-model="checkedFilter.byDate"
											id
										/>
										<span class="text-tb-blue text-sm ml-4">{{item}}</span>
									</label>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<div class="accordion mt-2">
					<div class="accordion-nav flex justify-between gap-5 items-center px-4 select-none py-2">
						<span
							@click="accordionActive.byCategory = !accordionActive.byCategory"
							class="flex items-center cursor-pointer w-full"
						>
							<img
								src="~/assets/images/accordion-arrow.svg"
								alt
								v-bind:class="accordionActive.byCategory?'rotate-90':''"
								class="transition duration-200 transform"
							/>
							<span class="text-tb-black ml-2 text-base">Kategorien</span>
						</span>
						<span @click="checkedFilter.byCategory = []" class="reload-icon cursor-pointer">
							<img src="~/assets/images/reset.svg" class="transition transform duration-200" v-bind:class="{'scale-75': !accordionActive.byCategory}" alt />
						</span>
					</div>
					<transition name="fade">
						<div v-if="accordionActive.byCategory" class="accordion-content h-88 overflow-y-hidden">
							<div class="content-wrapper py-1 w-full">
								<div class="byCategory-search mb-2 px-4">
									<input
										type="text"
										class="form-input rounded-full border-transparent px-4 py-3 placeholder-tb-primary-dark w-full"
										placeholder="Search Kategorien"
									/>
								</div>

								<div class="h-72 overflow-y-auto nice-scroll pl-4 mr-5">
									<label
										v-for="(item, index) in filterData.byCategory"
										:key="index"
										class="category-check-item flex items-center my-1"
									>
										<input
											type="checkbox"
											name="byCategory"
											class="form-checkbox rounded-full border-transparent"
											:value="index"
											v-model="checkedFilter.byCategory"
											id
										/>
										<span class="text-tb-blue text-sm ml-4">{{item}}</span>
									</label>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "FilterSidebar",
	props: {
		filterData: {
			type: Object
		}
	},
	data() {
		return {
			accordionActive: {
				byDate: {type: Boolean, default: true},
				byCategory: {type: Boolean, default: true},
			},
			checkedFilter: {
				byDate: [],
				byCategory: [],
			},
		};
	},
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: 0.4s;
	transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	height: 0 !important;
}
	.reload-icon img {
	transform-origin: 100% 50%;
	height: 17px;
	width: 17px;
}
.h-88 {
	height: 352px;
}
.h-72 {
	height: 288px;
}
</style>