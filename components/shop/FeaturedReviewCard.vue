<template>
  <div id="featured-review-card">
    <div class="featured-review-card-wrapper">
      <div class="rounded bg-tb-primary p-6 xl:p-8">
        <div>
          <div class="flex items-center -mt-3">
            <img
              src="~/assets/images/thumbup.svg"
              class="h-4 w-auto mr-4"
              alt=""
            />
            <span class="text-22 text-tb-black font-normal"
              >Most recent positive</span
            >
          </div>
          <div class="bg-white rounded p-6 xl:p-8 mt-4">
            <p class="text-tb-black text-base font-normal -mt-3">
              {{ lastOpinion.anzeigeName }}
            </p>
            <div class="flex items-center mt-px -mb-px">
              <img src="~/assets/images/calender.svg" class="mr-1" alt="" />
              <span class="text-xs text-tb-primary-dark">{{
                lastOpinion.bewertungDatum
              }}</span>
            </div>
            <client-only>
              <StarRating
                :rating="lastOpinion.bewertungSterne"
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
                class="mt-1 mb-1"
              ></StarRating>
            </client-only>
            <div
              v-html="lastOpinion.bewertungTextKomplett"
              class="text-tb-black text-base leading-5"
            ></div>
          </div>
        </div>
        <div class="mb-3">
          <div class="flex items-center mt-4">
            <img
              src="~/assets/images/thumbdown.svg"
              class="h-4 w-auto mr-4"
              alt=""
            />
            <span class="text-22 text-tb-black font-normal"
              >Latest critical review</span
            >
          </div>
          <div class="bg-white rounded p-6 xl:p-8 mt-4">
            <p class="text-tb-black text-base font-normal -mt-3">
              {{ firstOpinion.anzeigeName }}
            </p>
            <div class="flex items-center mt-px -mb-px">
              <img src="~/assets/images/calender.svg" class="mr-1" alt="" />
              <span class="text-xs text-tb-primary-dark">{{
                firstOpinion.bewertungDatum
              }}</span>
            </div>
            <client-only>
              <StarRating
                :rating="firstOpinion.bewertungSterne"
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
                class="mt-1 mb-1"
              ></StarRating>
            </client-only>
            <div
              v-html="firstOpinion.bewertungTextKomplett"
              class="text-tb-black text-base leading-5"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeaturedReviewCard",
  props: ["lastOpinion", "firstOpinion"],
};
</script>

<style>
</style>