<template>
  <div id="review-card">
    <div class="review-card-wrapper">
      <div class="rounded border border-tb-primary-dark px-4 xl:px-6">
        <div
          v-for="(item, index) in reviewsByScore"
          :key="index"
          :class="index > 0 && 'border-t'"
          class="py-2 border-tb-border"
        >
          <client-only>
            <StarRating
              :rating="parseInt(item.sterne)"
              :read-only="true"
              :show-rating="false"
              :star-size="7"
              active-color="#FF7000"
              inactive-color="#FFFFFF"
              glow-color="#00000000"
              :padding="2"
              :inline="true"
              border-color="#FF7000"
              :border-width="2"
              class="mb-1 mr-3"
            ></StarRating>
          </client-only>
          <span class="text-xs text-tb-primary-dark">{{ item.anzahl }}</span>
        </div>
      </div>
      <div class="rounded border border-tb-primary-dark mt-5 px-4 xl:px-6">
        <div
          v-for="(item, index) in reviewsByDetail"
          :key="index"
          :class="index > 0 && 'border-t'"
          class="py-2 border-tb-border grid grid-cols-12"
        >
          <div class="col-span-8 xl:col-span-7">
            <span class="text-xs text-tb-primary-dark">{{
              item.bewertungText
            }}</span>
          </div>
          <div class="col-span-4 xl:col-span-5">
            <client-only>
              <StarRating
                :rating="parseFloat(item.bewertungStars)"
                :read-only="true"
                :increment="0.5"
                :show-rating="false"
                :star-size="7"
                active-color="#FF7000"
                inactive-color="#FFFFFF"
                glow-color="#00000000"
                :padding="2"
                :inline="true"
                border-color="#FF7000"
                :border-width="2"
                class="mb-1"
              ></StarRating>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewCard",
  props: {
    reviewsByScore: {
      type: Array,
    },
    reviewsByDetail: {
      type: Array,
    },
  },
};
</script>

<style>
</style>