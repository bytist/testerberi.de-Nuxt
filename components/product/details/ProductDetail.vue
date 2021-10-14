<template>
    <div id="product-detail-component">
        <div class="text-22 text-tb-black font-normal leading-none">
            {{ productTitle }} Product Information
        </div>
        <div class="relative" :class="!showMore && `overflow-hidden h-80`">
            <div class="flex justify-between gap-2 xl:gap-6">
                <div class="w-full">
                    <ProductSubDetail
                        v-for="(item, index) in data.slice(0, breakPoint)"
                        :key="index"
                        :detailData="item"
                    />
                </div>
                <div class="w-full">
                    <ProductSubDetail
                        v-for="(item, index) in data.slice(breakPoint)"
                        :key="index"
                        :detailData="item"
                    />
                </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full">
                <div
                    v-if="!showMore"
                    class="h-48 bg-gradient-to-t from-white via-white"
                ></div>
                <div
                    @click="showMore = !showMore"
                    class="text-tb-blue text-base underline absolute bottom-0 w-full flex justify-center items-center cursor-pointer"
                    :class="showMore && '-mb-5'"
                >
                    <img
                        src="~/assets/images/circle-arrow-right.svg"
                        class="mr-1 transform h-4"
                        :class="showMore ? '-rotate-90' : 'rotate-90'"
                        alt=""
                    />
                    Show {{ showMore ? "Less" : "More" }} Info
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductSubDetail from "@/components/product/details/ProductSubDetail";
import { mapState } from "vuex";

export default {
    name: "ProductDetail",
    components: {
        ProductSubDetail,
    },
    props: ["productTitle"],
    data() {
        return {
            showMore: false,
        };
    },
    computed: {
        ...mapState({
            data: (state) => state.productData.productDetail,
            breakPoint: (state) => (state.productData.productDetail.length + 1) / 2,
        }),
    },
};
</script>

<style scoped>
.h-80 {
    height: 20rem;
}
</style>
