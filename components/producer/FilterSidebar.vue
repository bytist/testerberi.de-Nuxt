<template>
    <div id="producer-filter-sidebar-component">
        <div class="rounded bg-tb-primary py-4 xl:py-5">
            <div class="accordion">
                <div
                    class="accordion-nav flex justify-between gap-5 items-center px-4 select-none py-2"
                >
                    <span
                        @click="accordionOpen = !accordionOpen"
                        class="flex items-center cursor-pointer w-full"
                    >
                        <img
                            src="~/assets/images/accordion-arrow.svg"
                            alt
                            v-bind:class="
                                accordionOpen ? 'rotate-90' : ''
                            "
                            class="transition duration-200 transform"
                        />
                        <span class="text-tb-black ml-2">Kategorien</span>
                    </span>
                    <span
                        @click="checkedFilter = []"
                        class="reload-icon cursor-pointer"
                    >
                        <img
                            src="~/assets/images/reset.svg"
                            class="transition transform duration-200"
                            v-bind:class="{ 'scale-75': !accordionOpen }"
                            alt
                        />
                    </span>
                </div>
                <transition name="fade">
                    <div
                        v-if="accordionOpen"
                        class="accordion-content h-80 overflow-y-hidden"
                    >
                        <div class="content-wrapper w-full">
                            <div
                                class="h-80 overflow-y-auto nice-scroll pl-4 mr-5"
                            >
                                <label
                                    v-for="(item, index) in data"
                                    :key="index"
                                    class="category-check-item flex items-center my-1"
                                >
                                    <input
                                        type="checkbox"
                                        name="type"
                                        class="form-checkbox rounded-full border-transparent"
                                        :value="item.url"
                                        @change="handleCheckedChange"
                                        v-model="checkedFilter"
                                        id
                                    />
                                    <span class="text-tb-blue text-sm ml-4"
                                        >{{ item.name }} ({{
                                            item.anzahl
                                        }})</span
                                    >
                                </label>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterSidebar",
    props: ["data"],
    data() {
        return {
            accordionOpen: true,
            checkedFilter: []
        }
    },
    methods: {
        handleCheckedChange() {
            this.$emit("handleCheckedChange", this.checkedFilter);
        }
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
.h-80 {
    height: 320px;
}
</style>