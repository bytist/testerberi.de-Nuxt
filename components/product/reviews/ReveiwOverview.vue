<template>
  <div id="review-overview-component">
    <div
      class="rounded flex items-stretch gap-2 xl:gap-6 bg-tb-primary p-3 xl:p-6 relative"
    >
      <div
        v-if="productLoading"
        class="absolute top-0 left-0 h-full w-full bg-white py-1 z-10"
      >
        <client-only>
          <div class="overflow-hidden h-full rounded">
            <ContentLoader
              primaryColor="#EFF2F5"
              secondaryColor="#E5EAEE"
              :speed="1"
              class="content-loader-item"
            />
          </div>
        </client-only>
      </div>
      <div
        v-if="data.reviews.result.length > 0"
        class="rounded bg-white flex flex-col items-center justify-center w-1/5 py-6"
      >
        <p class="font-normal review-text-bg text-tb-orange leading-none">
          {{ data.averageRating }}
        </p>
        <client-only>
        <StarRating
          v-bind:rating="data.averageRating"
          v-bind:read-only="true"
          v-bind:show-rating="false"
          v-bind:star-size="19"
          active-color="#FF7000"
          glow-color="#00000000"
          v-bind:padding="1"
          v-bind:increment="0.1"
        ></StarRating>
        </client-only>
      </div>
      <div
        v-else
        class="rounded bg-white flex items-center justify-center w-1/5 py-8"
      >
        <p class="text-xs text-tb-primary-dark underline cursor-pointer">
          Be the first to rate
        </p>
      </div>
      <div class="w-5/12">
        <ReviewBarSm :data="data.countPerRating" />
      </div>
      <div>
        <p>
          <span class="font-normal text-tb-blue">{{ data.opinion.total }}</span>
          <span class="ml-1 text-tb-primary-dark">Meinungen</span>
        </p>
        <div v-for="(item, index) in data.opinion.from" :key="index">
          <div v-if="item.count">
            <span class="text-tb-primary-dark">davon</span>
            <span class="font-normal text-tb-blue ml-1">{{ item.count }}</span>
            <span class="text-tb-primary-dark ml-1">Rezensionen von</span>
            <span class="text-tb-primary-dark ml-1 underline">{{
              item.company
            }}</span>
          </div>
        </div>
        <p>
          <span class="text-tb-primary-dark">Stand:</span>
          <span class="text-tb-blue font-normal ml-1">{{
            data.opinion.date
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewBarSm from "@/components/product/reviews/ReviewBarSm";
import { ContentLoader } from "vue-content-loader";
import { mapState, mapGetters } from "vuex";

export default {
  name: "ReviewOverview",
  components: {
    ReviewBarSm,
    ContentLoader,
  },
  computed: {
    ...mapState({
      data: (state) => state.productData.productReview,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
    }),
  },
};
</script>

<style scoped>
.review-text-bg {
  font-size: 56px;
}
</style>
