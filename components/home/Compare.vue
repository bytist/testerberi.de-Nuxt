<template>
    <div v-if="compareData.length" class="container mx-auto">
        <p class="text-tb-black text-xl font-normal mb-2">Aktuelle Vergleiche</p>
        <div class="compare-content-wrapper flex flex-wrap justify-between items-stretch">
            <div
                v-for="(item, index) in compareData"
                :key="index"
                class="compare-item my-3 group"
            >
                <div
                    class="compare-item-card rounded bg-tb-border py-6 flex justify-evenly h-full select-none border border-tb-border hover:border-tb-blue transition-colors duration-100"
                >
                    <div class="logo-wrapper w-3/12">
                        <img
                            :src="item.testerLogoLink"
                            alt
                            class="mx-auto mt-1"
                        />
                    </div>
                    <div class="compare-desc-wrapper w-7/12">
                        <NuxtLink to="/">
                            <p class="text-tb-black font-normal">{{ item.title }}</p>
                        </NuxtLink>
                        <p class="text-tb-blue mb-2">{{ item.ausgabe }} - {{ item.testerName }}</p>
                        <p class="text-tb-black leading-5">{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getLatestComparisons } from "@/services/service";

export default {
    name: "HomeCompare",
    data() {
        return {
            compareData: [],
        };
    },
    created() {
        this.getLatestComparisons();
    },
    methods: {
        async getLatestComparisons() {
            const data = await getLatestComparisons();

            for (const item of data) {
                if (!item.testerLogoLink.includes("png") && !item.testerLogoLink.includes("svg")) {
                    item.testerLogoLink += "png";
                }
            }

            this.compareData = data;
        }
    }
};
</script>

<style scoped>
.compare-item {
    width: calc(33.33% - 16px);
}
</style>
