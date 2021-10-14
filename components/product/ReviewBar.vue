<template>
    <div id="review-bar-component">
        <div class="h-full flex flex-col justify-evenly pr-0 xl:pr-6">
            <div
                v-for="(item, index) in data"
                :key="index"
                class="flex gap-1 xl:gap-2 items-center"
            >
                <div class="w-6/12 xl:w-2/5 text-tb-primary-dark">
                    {{ item.status }}
                </div>
                <div class="w-full rounded-full bg-white progress-bar">
                    <div
                        :style="
                            parseInt(item.a) > 0
                                ? 'width:' +
                                  ((item.a / maxRate) * 100).toFixed(2) +
                                  '%'
                                : 'width:10px;'
                        "
                        :class="'rounded-full h-full bg-tb-' + item.c"
                    ></div>
                    <div class="bg-tb-limegreen hidden"></div>
                </div>
                <div class="text-tb-primary-dark">{{ item.a }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ReviewBar",
    data() {
        return {
            maxRate: 1,
        };
    },
    computed: {
        ...mapState({
            data: (state) => state.productData.consumerMagazine.customerReviews,
        }),
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function () {
                this.maxRate = Math.max.apply(Math, (this.data || []).map(function(o) { return o.a; }));
            },
        },
    },
};
</script>

<style scoped>
.progress-bar {
    height: 10px;
}
</style>
