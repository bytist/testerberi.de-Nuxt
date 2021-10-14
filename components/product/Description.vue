<template>
    <div id="description-component">
        <div class="flex gap-2 xl:gap-6">
            <div class="w-full">
                <p
                    v-for="(paragraph, index) in descData.slice(0, breakPoint)"
                    :key="index"
                    class="text-tb-black font-normal leading-6"
                >
                    {{ paragraph }}
                    <br v-if="paragraph.length > 1" />
                    <br v-if="paragraph.length > 1" />
                </p>
            </div>
            <div class="w-full">
                <p
                    v-for="(paragraph, index) in descData.slice(
                        breakPoint,
                        descData.length
                    )"
                    :key="index"
                    class="text-tb-black font-normal leading-6"
                >
                    {{ paragraph }}
                    <br v-if="paragraph.length > 1" />
                    <br v-if="paragraph.length > 1" />
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: "Description",
    data() {
        return {
        };
    },
    computed: {
        ...mapState({
            descData: (state) => state.productData.productDescription,
        }),
        ...mapGetters('productData', {
            breakPoint: "productDescriptionBreakPoint"
        })
    },
};
</script>

<style></style>
