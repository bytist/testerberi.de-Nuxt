<template>
    <div
        class="p-4 rounded border border-transparent bg-white hover:border-tb-blue transition duration-150 flex relative w-full"
    >
        <div
            v-if="item.hasSubCats"
            @click="$emit('open-cat-box', item.name, item.link)"
            class="absolute h-full w-full top-0 left-0 cursor-pointer z-10"
        >
            <div class="absolute top-0 left-0 h-8 w-8">
                <div
                    class="w-full h-full border border-tb-blue rounded-tl rounded-br -mt-px -ml-px bg-tb-blue flex justify-center items-center"
                >
                    <svg
                        width="9"
                        height="6.5"
                        viewBox="0 0 7 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.7488 4.03747L3.7488 4.03747C3.61406 4.18751 3.38827 4.1875 3.25354 4.03748L3.25353 4.03747L0.944723 1.46596L0.944715 1.46595C0.818424 1.32527 0.818435 1.10323 0.944708 0.962551L0.94473 0.962526C1.07946 0.812491 1.30527 0.812491 1.43999 0.962526L1.44 0.962535L3.50116 3.25822L5.56233 0.962535L5.56406 0.960611L5.56407 0.960626C5.69796 0.816574 5.91722 0.816585 6.05112 0.960615L3.7488 4.03747ZM3.7488 4.03747L6.05761 1.46596L6.05762 1.46598M3.7488 4.03747L6.05762 1.46598M6.05762 1.46598L6.05932 1.46402M6.05762 1.46598L6.05932 1.46402M6.05932 1.46402C6.18303 1.32135 6.18002 1.09928 6.05112 0.960618L6.05932 1.46402Z"
                            fill="#FFFFFF"
                            stroke="#FFFFFF"
                            stroke-width="0.3"
                        />
                    </svg>
                </div>
            </div>
        </div>
        <NuxtLink
            v-else
            :to="{ path: `${item.link}` }"
            class="absolute h-full w-full top-0 left-0 z-10"
        >
        </NuxtLink>
        <div
            class="thumbnail-wrapper align-middle w-1/2 pr-1 relative flex flex-col justify-center z-0"
        >
            <v-lazy-image
                :src="item.thumbnail"
                class="thumbnail-img object-contain mx-auto block max-w-full max-h-full"
                alt
            />
        </div>
        <div
            class="detail-wrapper h-auto w-1/2 flex flex-col px-0 xl:px-3 py-0 xl:py-1 justify-between"
        >
            <div>
                <div
                    class="font-normal text-tb-black leading-4 text-lg mb-2 break-words"
                >
                    {{ item.name }}
                </div>
                <p class="text-tb-black text-base">
                    {{ (1992).toLocaleString() }} Tests
                </p>
            </div>
            <div class="flex">
                <span class="text-tb-blue text-base">Check out</span>
                <img
                    src="~/assets/images/circle-arrow-right.svg"
                    alt
                    class="ml-2"
                />
            </div>
        </div>

        <div v-if="item.childCats && item.childCats.length" class="hidden">
            <div v-for="(item, index) in item.childCats" :key="index">
                <NuxtLink :to="item.kategorieLink">
                    <span>
                        <img :src="item.kategorieBildLink" :alt="item.kategorieName">
                    </span>
                    <span>{{item.kategorieName}}</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductCard",
    data() {
        return {};
    },
    props: ["item"],
};
</script>

<style scoped>
</style>