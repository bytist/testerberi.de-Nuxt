<template>
    <div class="container mx-auto select-none">
        <p class="font-normal text-xl text-tb-black mb-5">Popular Categories</p>
        <div class="flex justify-between items-stretch gap-3 xl:gap-6">
            <div
                v-for="(item, index) in catData"
                :key="index"
                class="relative w-full group"
            >
                <NuxtLink
                :to="`${item.link}/`"
                    class="absolute h-full w-full rounded top-0 left-0 transition duration-200 border-0 group-hover:border border-tb-blue z-10"
                ></NuxtLink>
                <div
                    class="popular-category-item bg-tb-primary rounded px-4 flex h-full"
                >
                    <div
                        class="category-thumbnail-wrapper w-1/2 xl:w-7/12 relative mx-1"
                    >
                        <img
                            :src="require('~/assets/images/p-category-' + item.thumbnail +'.png')"
                            alt
                            class="mx-auto absolute max-w-full h-24 z-0"
                        />
                    </div>
                    <div
                        class="category-text-wrapper w-1/2 xl:w-5/12 py-6 flex flex-col justify-between"
                    >
                        <div>
                            <p class="text-tb-black font-normal text-lg break-words">
                                {{ item.name }}
                            </p>
                            <p class="text-tb-black text-base">
                                {{ item.test.toLocaleString() }} Tests
                            </p>
                        </div>
                        <NuxtLink to="/">
                            <div class="flex">
                                <span class="text-tb-blue text-base"
                                    >Check out</span
                                >
                                <img
                                    src="~/assets/images/circle-arrow-right.svg"
                                    alt
                                    class="ml-2"
                                />
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import popularCategories from "@/json/homePopularCategory";

export default {
    name: "HomePopularCategory",
    data() {
        return {
            catData: popularCategories,
        };
    },
};
</script>

<style scoped>
.category-thumbnail-wrapper .absolute {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
