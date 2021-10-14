<template>
    <div id="serie-variations-component">
        <div class="serie-variations-wrapper">
            <div
                class="rounded bg-tb-primary p-5 xl:p-6 grid grid-cols-4 gap-6 xl:gap-8"
            >
                <ProductCard
                    v-for="(item, index) in variationsArray"
                    :key="index"
                    :item="item"
                    class="transition duration-200 hover:tb-shadow-1 bg-white hover:z-10 rounded"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ProductCard from "@/components/widget/ProductCard";
import {getSubCategories} from '@/services/service'
export default {
    name: "SerieVariations",
    components: { ProductCard },
    data() {
        return {
            variationsArray: [],
        };
    },
    created() {
        this.justDemoData();
    },
    methods: {
        justDemoData() {
            const requestUrl = `fernseher/1`;

            getSubCategories(requestUrl).then(
                (res) => {
                    const contentProdukte = res.contentProdukte;
                    this.variationsArray = [];

                    contentProdukte.forEach((produkt) => {
                        if (this.variationsArray.length > 3) return;
                        const item = {
                            name: produkt.produktName,
                            link: produkt.produktURL.substring(
                                produkt.produktURL.lastIndexOf("/") + 1
                            ),
                            thumbnail: produkt.produktBildURL,
                            class: produkt.eek,
                            percentage: produkt.score,
                            tests: produkt.anzahlTests,
                            color: produkt.circleColor,
                            size: 138,
                            width: 3840,
                            height: 2160,
                            tags: ["HDR", "OLED"],
                            price: parseInt(produkt.produktPreis),
                            rate: produkt.anzahlSterne,
                            rateCount: produkt.anzahlMeinungen,
                            events: produkt.anzahlAngebote,
                        };

                        this.variationsArray.push(item);
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
        },
    },
};
</script>

<style>
</style>