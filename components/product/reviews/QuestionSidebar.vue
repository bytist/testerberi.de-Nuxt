<template>
  <div id="question-sidebar-component">
    <div class="bg-tb-primary rounded p-4 xl:p-6">
      <div class="relative">
        <div
          v-if="productLoading"
          class="absolute top-0 left-0 h-full w-full bg-tb-primary py-1"
        >
          <client-only>
            <div class="overflow-hidden h-full rounded">
              <ContentLoader
                primaryColor="#FFFFFF"
                secondaryColor="#EFF2F5"
                :speed="1"
                class="content-loader-item"
              />
            </div>
          </client-only>
        </div>
        <p class="text-22 text-tb-black font-normal leading-tight">
          {{ data.total }} question about {{ productName }}
        </p>
      </div>
      <p class="text-tb-primary-dark mt-2 leading-5 mb-5">
        Um eine Frage stellen zu können, musst du dich zunächst
        <span class="underline">einloggen.</span>
      </p>
      <div class="questions-wrapper my-2 relative">
        <div
          v-if="productLoading"
          class="absolute top-0 left-0 h-full w-full bg-tb-primary py-1 z-10"
        >
          <client-only>
            <div class="overflow-hidden h-full rounded">
              <ContentLoader
                primaryColor="#FFFFFF"
                secondaryColor="#EFF2F5"
                :speed="1"
                class="content-loader-item"
              />
              <ContentLoader
                primaryColor="#FFFFFF"
                secondaryColor="#EFF2F5"
                :speed="1"
                class="content-loader-item"
              />
              <ContentLoader
                primaryColor="#FFFFFF"
                secondaryColor="#EFF2F5"
                :speed="1"
                class="content-loader-item"
              />
            </div>
          </client-only>
        </div>
        <SingleQuestion
          v-for="(item, index) in data.result"
          :key="index"
          :data="item"
          class="mb-5"
          :class="parseInt(index / 3) + 1 !== pageNumber && 'hidden'"
        />
      </div>
      <client-only>
        <Paginate
          v-model="pageNumber"
          :page-count="parseInt(data.total / 3) + (data.total % 3 && 1)"
          :page-range="5"
          :page-link-class="'text-xl w-8 mx-px text-center outline-none'"
          :margin-pages="0"
          :prev-link-class="
            'mr-5 product-pagination-arrow outline-none overflow-visible reviewQuestion-pagination-prev transform rotate-180' +
            (parseInt(data.total / 3) + (data.total % 3 && 1) < 6
              ? ' hidden'
              : '')
          "
          :next-link-class="
            'ml-5 product-pagination-arrow outline-none overflow-visible reviewQuestion-pagination-next' +
            (parseInt(data.total / 3) + (data.total % 3 && 1) < 6
              ? ' hidden'
              : '')
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
          :class="data.total <= 3 && 'hidden'"
        ></Paginate>
      </client-only>
    </div>
    <div class="rounded bg-tb-primary py-4 xl:py-6 mt-12">
      <p
        class="text-22 text-tb-black font-normal leading-tight px-4 xl:px-6 mb-5"
      >
        Die neuesten Fragen in der Kategorie Fernseher:
      </p>
      <div
        v-for="(item, index) in categoryQuestions"
        :key="index"
        @mouseenter="hoverQuestion = index"
        @mouseleave="hoverQuestion = 111"
        class="category-question-wrapper cursor-pointer last:border-transparent px-3 xl:px-6 first:pt-0 hover:bg-tb-blue group"
      >
        <div
          :class="
            hoverQuestion === index + 1 ? 'border-transparent' : 'border-white'
          "
          class="border-b group-hover:border-transparent py-4 relative"
        >
          <div
            v-if="productLoading"
            class="absolute top-0 left-0 h-full w-full bg-tb-primary py-3"
          >
            <client-only>
              <div class="overflow-hidden h-full rounded">
                <ContentLoader
                  primaryColor="#FFFFFF"
                  secondaryColor="#EFF2F5"
                  :speed="1"
                  class="content-loader-item"
                />
                <ContentLoader
                  primaryColor="#FFFFFF"
                  secondaryColor="#EFF2F5"
                  :speed="1"
                  class="content-loader-item"
                />
              </div>
            </client-only>
          </div>
          <p class="group-hover:text-white text-tb-blue">
            {{ item.title }}
          </p>
          <p class="group-hover:text-white text-tb-primary-dark mt-1">
            {{ item.product }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleQuestion from "@/components/product/reviews/SingleQuestion";
import { ContentLoader } from "vue-content-loader";

import { mapState, mapGetters } from "vuex";

export default {
  name: "QuestionSidebar",
  components: {
    SingleQuestion,
    ContentLoader,
  },
  props: ["productName"],
  data() {
    return {
      hoverQuestion: 111,
      pageNumber: 1,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.productData.productReview.questions,
      categoryQuestions: (state) =>
        state.productData.productReview.categoryQuestions,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
    }),
  },
  watch: {},
  updated() {
    var reviewQuestionNavPrev = this.$el.querySelector(
      ".reviewQuestion-pagination-prev"
    );
    if (reviewQuestionNavPrev != null) {
        reviewQuestionNavPrev.innerHTML = `<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#3099F2" />
                        <path
                            d="M12.3913 9.83733L12.3913 9.83733C12.5434 9.9895 12.5434 10.2362 12.3913 10.3883L12.3913 10.3884L9.51514 13.2645L9.51514 13.2645C9.36297 13.4166 9.1163 13.4166 8.96413 13.2645L8.96411 13.2645C8.81196 13.1123 8.81196 12.8656 8.96411 12.7134L8.96411 12.7134L11.5647 10.1128L8.96411 7.51224L8.96228 7.51041L8.96229 7.51039C8.81643 7.35939 8.81644 7.11998 8.96228 6.96897L12.3913 9.83733ZM12.3913 9.83733L9.51514 6.96121L9.51516 6.96119M12.3913 9.83733L9.51516 6.96119M9.51516 6.96119L9.51328 6.95938M9.51516 6.96119L9.51328 6.95938M9.51328 6.95938C9.35848 6.80988 9.11179 6.81417 8.96229 6.96897L9.51328 6.95938Z"
                            fill="white"
                            stroke="white"
                            stroke-width="0.3"
                        />
                    </svg>`;
    }
    var reviewQuestionNavNext = this.$el.querySelector(
      ".reviewQuestion-pagination-next"
    );
    if (reviewQuestionNavNext != null) {
        reviewQuestionNavNext.innerHTML = `<svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    myCallback(pageNo) {
      this.pageNumber = pageNo;
    },
  },
};
</script>

<style scoped>
.category-question-wrapper:last-child > div {
  border-color: transparent;
}
</style>
