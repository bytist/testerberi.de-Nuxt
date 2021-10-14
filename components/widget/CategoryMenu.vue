<template>
    <div
        ref="categoryRef"
        class="category-data-wrapper w-full border border-tb-semi-dark rounded bg-white tb-shadow-2 flex flex-wrap"
    >
        <div class="category-level-1-wrapper w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
            <div
                class="category-level-1 w-full px-3 py-5 flex flex-col justify-between overflow-y-auto max-h-visible nice-scroll nice-scroll-bg"
            >
                <div
                    v-for="(item, index) in categoryData"
                    :key="index"
                    @mouseover="toggleCategory(index)"
                    class="category-level-1-item flex items-center my-1 mt-2 cursor-pointer"
                >
                    <span
                        class="category-item-icon w-12 text-center text-2xl leading-5"
                    >
                        <span :class="'icon-' + item.icon"></span>
                    </span>
                    <NuxtLink
                        v-bind:class="
                            activeCategory === index
                                ? 'text-tb-blue'
                                : 'text-tb-black'
                        "
                        class="category-item-name text-base ml-1 font-normal"
                        @click.native="$emit('close')"
                        :to="{ path: `/${item.url}/` }"
                        >{{ item.name }}</NuxtLink
                    >
                </div>
            </div>
        </div>
        <div
            class="category-level-2-wrapper w-full sm:w-1/2 lg:w-2/3 xl:w-3/4 bg-tb-primary"
        >
            <div class="category-level-2 w-full px-3 flex flex-wrap overflow-y-auto max-h-visible nice-scroll nice-scroll-bg transform translate-x-px">
                <div
                    v-for="(item, index) in categoryData[activeCategory][
                        'data'
                    ]"
                    :key="index"
                    class="category-level-3-wrapper w-1/3 xl:w-1/4 py-8 border-b"
                    :class="index > borderLimitId ? 'border-transparent' : 'border-white'"
                >
                    <div class="category-level-3 flex flex-col">
                        <div class="category-level-3-item my-1 mt-2">
                            <NuxtLink
                                @click.native="$emit('close')"
                                :to="{
                                    path: `/${item.url}/`,
                                }"
                            >
                                <span class="text-tb-blue">{{
                                    item.name
                                }}</span>
                            </NuxtLink>
                        </div>
                        <div
                            v-for="(subItem, id) in item['data']"
                            :key="id"
                            class="category-level-3-item my-1 mt-2 cursor-pointer"
                        >
                            <NuxtLink
                                @click.native="$emit('close')"
                                :to="{
                                    path: `/${subItem.kategorieURL}/`,
                                }"
                                >{{ subItem.kategorieName }}</NuxtLink
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CategoryMenu",
    data() {
        return {
            activeCategory: 0,
            borderLimitId: -1
        };
    },
    methods: {
        toggleCategory: function (index) {
            this.activeCategory = index;
        },
        closeCategory(e) {
            if (
                !this.$refs.categoryRef.contains(e.target) &&
                !this.mainRef.contains(e.target)
            ) {
                this.activeOpen = false;
            }
        },
    },
    props: ["open", "mainRef", "categoryData"],
    computed: {
        activeOpen: {
            get() {
                return this.open;
            },
            set() {
                this.$emit("close");
            },
        },
    },
    watch: {
        activeCategory: {
            deep: true,
            immediate: true,
            handler: function () {
                this.borderLimitId =  this.categoryData[this.activeCategory].data.length - (this.categoryData[this.activeCategory].data.length % 4) - 1;
            }
        },
    },
    beforeMount() {
        document.getElementsByTagName("BODY")[0].classList.add('overflow-hidden-i');
        window.addEventListener("click", this.closeCategory);
    },
    beforeDestroy() {
        document.getElementsByTagName("BODY")[0].classList.remove('overflow-hidden-i');
        window.removeEventListener("click", this.closeCategory);
    },
};
</script>

<style scoped>
.max-h-visible {
    max-height: 80vh;
}
</style>
