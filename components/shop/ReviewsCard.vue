<template>
  <div id="reviews-card">
    <div ref="reviewsCard" class="reviews-card-wrapper">
      <div class="rounded bg-tb-primary p-6 xl:p-8">
        <p class="text-22 text-tb-black font-normal -mt-3 mb-4">
          {{ totalReviews }} reviews for
          {{
            `${$route.params.shopName[0].toUpperCase()}${$route.params.shopName.slice(
              1
            )}`
          }}
        </p>
        <div
          v-for="(item, index) in reviews"
          :key="index"
          class="rounded bg-white p-6 xl:p-8 mb-5"
        >
          <div class="grid grid-cols-10 gap-3 xl:gap-5">
            <div class="col-span-7">
              <p class="text-base text-tb-black font-normal -mt-3">
                {{ item.anzeigeName }}
              </p>
              <div class="flex items-center -mt-px mb-px">
                <img src="~/assets/images/calender.svg" class="mr-1" alt="" />
                <span class="text-xs text-tb-primary-dark mr-1">{{
                  item.bewertungDatum
                }}</span>
                <!-- <span class="text-xs text-tb-primary-dark">{{
                                    item.additionalInfo
                                }}</span> -->
              </div>
              <client-only>
                <StarRating
                  :rating="item.bewertungSterne"
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
              <p class="text-22 text-tb-black mb-1">
                {{ item.bewertungTitel }}
              </p>
              <div
                class="text-base text-tb-black leading-5"
                v-html="item.bewertungTextKomplett"
              ></div>
            </div>
            <div class="col-span-3">
              <div class="rounded border border-tb-primary-dark px-2 xl:px-4">
                <div
                  v-for="(subItem, index) in item.contentDetails"
                  :key="index"
                  :class="index > 0 && 'border-t'"
                  class="border-tb-border py-2 grid grid-cols-10"
                >
                  <div class="col-span-6 truncate">
                    <span class="text-xs text-tb-primary-dark">{{
                      subItem.bewertungText
                    }}</span>
                  </div>
                  <div class="col-span-4">
                    <client-only>
                      <StarRating
                        :rating="subItem.bewertungStars"
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
                        class="mb-1"
                      ></StarRating>
                    </client-only>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <client-only>
          <paginate
            v-model="pageNum"
            :page-count="totalPages"
            :page-range="5"
            :page-link-class="'text-xl w-8 mx-px text-center outline-none'"
            :margin-pages="0"
            :prev-link-class="
              'mr-5 product-pagination-arrow product-pagination-prev outline-none transform rotate-180' +
              (totalPages < 6 ? ' hidden' : '')
            "
            :next-link-class="
              'ml-5 product-pagination-arrow product-pagination-next outline-none' +
              (totalPages < 6 ? ' hidden' : '')
            "
            :active-class="'text-tb-blue'"
            :disabled-class="'invisible'"
            :break-view-link-class="'hidden'"
            :no-li-surround="true"
            :click-handler="myPaginate"
            :prev-text="''"
            :next-text="''"
            :container-class="'flex justify-center items-center text-tb-primary-dark'"
            class="mt-8 mb-1"
          ></paginate>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewsCard",
  props: {
    reviews: {
      type: Array,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageNum: 1,
    };
  },
  updated() {
    var paginateNavPrev = this.$el.querySelector(".product-pagination-prev");
    if (paginateNavPrev != null) {
      paginateNavPrev.innerHTML = `<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#3099F2" />
                    <path
                        d="M12.3913 9.83733L12.3913 9.83733C12.5434 9.9895 12.5434 10.2362 12.3913 10.3883L12.3913 10.3884L9.51514 13.2645L9.51514 13.2645C9.36297 13.4166 9.1163 13.4166 8.96413 13.2645L8.96411 13.2645C8.81196 13.1123 8.81196 12.8656 8.96411 12.7134L8.96411 12.7134L11.5647 10.1128L8.96411 7.51224L8.96228 7.51041L8.96229 7.51039C8.81643 7.35939 8.81644 7.11998 8.96228 6.96897L12.3913 9.83733ZM12.3913 9.83733L9.51514 6.96121L9.51516 6.96119M12.3913 9.83733L9.51516 6.96119M9.51516 6.96119L9.51328 6.95938M9.51516 6.96119L9.51328 6.95938M9.51328 6.95938C9.35848 6.80988 9.11179 6.81417 8.96229 6.96897L9.51328 6.95938Z"
                        fill="white"
                        stroke="white"
                        stroke-width="0.3"
                    />
                </svg>`;
    }
    var paginateNavNext = this.$el.querySelector(".product-pagination-next");
    if (paginateNavNext != null) {
      paginateNavNext.innerHTML = `<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#3099F2" />
                    <path
                        d="M12.3913 9.83733L12.3913 9.83733C12.5434 9.9895 12.5434 10.2362 12.3913 10.3883L12.3913 10.3884L9.51514 13.2645L9.51514 13.2645C9.36297 13.4166 9.1163 13.4166 8.96413 13.2645L8.96411 13.2645C8.81196 13.1123 8.81196 12.8656 8.96411 12.7134L8.96411 12.7134L11.5647 10.1128L8.96411 7.51224L8.96228 7.51041L8.96229 7.51039C8.81643 7.35939 8.81644 7.11998 8.96228 6.96897L12.3913 9.83733ZM12.3913 9.83733L9.51514 6.96121L9.51516 6.96119M12.3913 9.83733L9.51516 6.96119M9.51516 6.96119L9.51328 6.95938M9.51516 6.96119L9.51328 6.95938M9.51328 6.95938C9.35848 6.80988 9.11179 6.81417 8.96229 6.96897L9.51328 6.95938Z"
                        fill="white"
                        stroke="white"
                        stroke-width="0.3"
                    />
                </svg>`;
    }
  },
  methods: {
    myPaginate(pageNumber) {
      this.$emit("paginate", pageNumber);
      let scrollTarget = this.$refs.reviewsCard;
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style>
</style>