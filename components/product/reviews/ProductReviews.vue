<template>
  <div ref="productReviewsBox" id="product-reviews-component" class="pb-12">
    <div class="grid grid-cols-3 gap-2 xl:gap-6">
      <div class="col-span-2">
        <div class="grid grid-cols-4 gap-2 items-center mb-4">
          <div
            class="col-span-3 truncate text-tb-black font-normal text-22 relative"
          >
            <div
              v-if="productLoading"
              class="absolute top-0 left-0 h-full w-full bg-white py-1"
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
            {{ productReviewData.opinion.total }} opinions about
            {{ productTitle }}
          </div>
          <div>
            <div
              @mouseover="sortDropdownShow = true"
              @mouseleave="sortDropdownShow = false"
              class="rounded-full text-tb-primary-dark border cursor-pointer border-tb-border ml-auto mr-0 pl-5 pr-6 py-3 flex justify-between items-center w-48 relative"
            >
              <span>{{ sortMethods[activeSortKey] }}</span>
              <img
                src="~/assets/images/accordion-arrow.svg"
                class="transform rotate-90 opacity-50"
                alt
              />
              <div
                @mouseover="sortDropdownShow = true"
                @mouseleave="sortDropdownShow = false"
                v-if="sortDropdownShow"
                class="dropdown-wrapper absolute w-48 left-0 rounded tb-shadow-4 bg-white z-10"
              >
                <div
                  @click="changeSortMethod(index)"
                  v-for="(item, index) in sortMethods"
                  :key="index"
                  class="px-4 py-2 border-b border-tb-border text-tb-primary-dark hover:text-tb-blue last:border-transparent"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 xl:gap-6">
      <div class="col-span-2">
        <ReviewOverview />
        <div
          v-if="productReviewData.reviews.result.length > 0"
          class="feedback-wrapper"
        >
          <Feedback
            v-for="(item, index) in productReviewData.reviews.result.slice(
              (feedbackPageNumber - 1) * 5,
              feedbackPageNumber * 5
            )"
            :key="index"
            :data="item"
          />
          <client-only>
            <Paginate
              v-if="productReviewData.reviews.totalPages > 1"
              v-model="pageNumber"
              :page-count="productReviewData.reviews.totalPages"
              :page-range="5"
              :page-link-class="'text-xl w-8 mx-px text-center outline-none'"
              :margin-pages="0"
              :prev-link-class="
                'mr-5 product-pagination-arrow outline-none overflow-visible feedback-pagination-prev transform rotate-180' +
                (productReviewData.reviews.totalPages < 6 ? ' hidden' : '')
              "
              :next-link-class="
                'ml-5 product-pagination-arrow outline-none overflow-visible feedback-pagination-next' +
                (productReviewData.reviews.totalPages < 6 ? ' hidden' : '')
              "
              :active-class="'text-tb-blue'"
              :disabled-class="'invisible'"
              :break-view-link-class="'hidden'"
              :no-li-surround="true"
              :click-handler="myCallback"
              :prev-text="''"
              :next-text="''"
              :container-class="'flex justify-center items-center text-tb-primary-dark'"
              class="mt-8"
            ></Paginate>
          </client-only>
        </div>
        <div class="rounded bg-tb-primary py-5 flex justify-center mt-8">
          <div
            @click="openFeedbackLightbox = true"
            class="main-button my-px w-80"
          >
            Write a review
          </div>
          <transition name="fade">
            <LeaveFeedbackLightbox
              v-if="openFeedbackLightbox"
              :data="productTitle"
              @close="openFeedbackLightbox = false"
            />
          </transition>
        </div>
        <LeaveFeedback :data="linkData[0]['label']" class="hidden" />
      </div>
      <div>
        <QuestionSidebar
          :productName="linkData[0]['label']"
          :data="productReviewData.questions"
          :category-questions="productReviewData.categoryQuestions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReviewOverview from "@/components/product/reviews/ReveiwOverview";
import Feedback from "@/components/product/reviews/Feedback";
import LeaveFeedback from "@/components/product/reviews/LeaveFeedback";
import LeaveFeedbackLightbox from "@/components/product/LeaveFeedbackLightbox";
import QuestionSidebar from "@/components/product/reviews/QuestionSidebar";
import { ContentLoader } from "vue-content-loader";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ProductReviews",
  components: {
    ReviewOverview,
    Feedback,
    LeaveFeedback,
    LeaveFeedbackLightbox,
    QuestionSidebar,
    ContentLoader,
  },
  props: ["linkData", "productTitle"],
  data() {
    return {
      sortMethods: ["Most Recent", "High to Low", "Low to High"],
      openFeedbackLightbox: false,
      activeSortKey: 0,
      sortDropdownShow: false,
      feedbackPageNumber: 1,
      pageNumber: 1
    };
  },
  computed: {
    ...mapState({
      productReviewData: (state) => state.productData.productReview,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
    }),
  },
  mounted() {
    // this.sortProductReview(0);
  },
  updated() {
    var feedbackNavPrev = this.$el.querySelector(".feedback-pagination-prev");
    if (feedbackNavPrev != null) {
      feedbackNavPrev.innerHTML = `<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#3099F2" />
                    <path
                        d="M12.3913 9.83733L12.3913 9.83733C12.5434 9.9895 12.5434 10.2362 12.3913 10.3883L12.3913 10.3884L9.51514 13.2645L9.51514 13.2645C9.36297 13.4166 9.1163 13.4166 8.96413 13.2645L8.96411 13.2645C8.81196 13.1123 8.81196 12.8656 8.96411 12.7134L8.96411 12.7134L11.5647 10.1128L8.96411 7.51224L8.96228 7.51041L8.96229 7.51039C8.81643 7.35939 8.81644 7.11998 8.96228 6.96897L12.3913 9.83733ZM12.3913 9.83733L9.51514 6.96121L9.51516 6.96119M12.3913 9.83733L9.51516 6.96119M9.51516 6.96119L9.51328 6.95938M9.51516 6.96119L9.51328 6.95938M9.51328 6.95938C9.35848 6.80988 9.11179 6.81417 8.96229 6.96897L9.51328 6.95938Z"
                        fill="white"
                        stroke="white"
                        stroke-width="0.3"
                    />
                </svg>`;
    }
    var feedbackNavNext = this.$el.querySelector(".feedback-pagination-next");
    if (feedbackNavNext != null) {
      feedbackNavNext.innerHTML = `<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    ...mapActions({
      addMeinungenBox: "productData/addMeinungenBox",
    }),
    myCallback(currentPageNo) {
      let productName = this.$route.params.product;
      this.addMeinungenBox({ productName, pageNumber: currentPageNo, sortMode: this.activeSortKey !== undefined ? this.activeSortKey : 1});
      let scrToBox = this.$refs.productReviewsBox;
      scrToBox.scrollIntoView({ behavior: "smooth" });
    },
    changeSortMethod(index) {
      this.myCallback(this.pageNumber);
      this.activeSortKey = index;
      this.sortDropdownShow = false;
    },
  },
};
</script>

<style scoped>
.dropdown-wrapper {
  top: 50px;
}
.w-80 {
  width: 20rem;
}
.fade-enter-active {
  transition: 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
