<template>
  <div id="advanced-option-component" class="relative">
    <div
      ref="dynawidth"
      class="swiper-outer-wrapper overflow-hidden mx-auto bg-tb-primary px-3 py-1"
    >
      <Swiper v-if="nowRender" :options="swiperOption" class="swiper-wrapper">
        <SwiperSlide
          v-for="(option, index) in options"
          :key="index"
          class="option-card-wrapper"
        >
          <div class="px-4 py-6">
            <div
              class="transition duration-200 hover:tb-shadow-1 bg-white hover:z-10 rounded"
            >
              <SerieCard
                :key="JSON.stringify(option)"
                :item="option"
                class="rounded"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="navigator-box absolute h-full top-0 left-0">
      <div class="relative h-full">
        <div
          class="swiper-navigation-right swiper-navigation-arrow outline-none right-0"
          :class="options.length < (windowInnerWidth < 1280 ? 5 : 6) && 'hidden'"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#3099F2" />
            <path
              d="M12.3913 9.83733L12.3913 9.83733C12.5434 9.9895 12.5434 10.2362 12.3913 10.3883L12.3913 10.3884L9.51514 13.2645L9.51514 13.2645C9.36297 13.4166 9.1163 13.4166 8.96413 13.2645L8.96411 13.2645C8.81196 13.1123 8.81196 12.8656 8.96411 12.7134L8.96411 12.7134L11.5647 10.1128L8.96411 7.51224L8.96228 7.51041L8.96229 7.51039C8.81643 7.35939 8.81644 7.11998 8.96228 6.96897L12.3913 9.83733ZM12.3913 9.83733L9.51514 6.96121L9.51516 6.96119M12.3913 9.83733L9.51516 6.96119M9.51516 6.96119L9.51328 6.95938M9.51516 6.96119L9.51328 6.95938M9.51328 6.95938C9.35848 6.80988 9.11179 6.81417 8.96229 6.96897L9.51328 6.95938Z"
              fill="white"
              stroke="white"
              stroke-width="0.3"
            />
          </svg>
        </div>
        <div
          class="swiper-navigation-left swiper-navigation-arrow outline-none"
          :class="options.length < (windowInnerWidth < 1280 ? 5 : 6) && 'hidden'"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="transform rotate-180"
          >
            <circle cx="10" cy="10" r="10" fill="#3099F2" />
            <path
              d="M12.3913 9.83733L12.3913 9.83733C12.5434 9.9895 12.5434 10.2362 12.3913 10.3883L12.3913 10.3884L9.51514 13.2645L9.51514 13.2645C9.36297 13.4166 9.1163 13.4166 8.96413 13.2645L8.96411 13.2645C8.81196 13.1123 8.81196 12.8656 8.96411 12.7134L8.96411 12.7134L11.5647 10.1128L8.96411 7.51224L8.96228 7.51041L8.96229 7.51039C8.81643 7.35939 8.81644 7.11998 8.96228 6.96897L12.3913 9.83733ZM12.3913 9.83733L9.51514 6.96121L9.51516 6.96119M12.3913 9.83733L9.51516 6.96119M9.51516 6.96119L9.51328 6.95938M9.51516 6.96119L9.51328 6.95938M9.51328 6.95938C9.35848 6.80988 9.11179 6.81417 8.96229 6.96897L9.51328 6.95938Z"
              fill="white"
              stroke="white"
              stroke-width="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SerieCard from "@/components/widget/SerieCard";

export default {
  name: "AdvancedOption",
  components: {
    SerieCard,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        followFinger: false,
        threshold: 50,
        navigation: {
          nextEl: ".swiper-navigation-right",
          prevEl: ".swiper-navigation-left",
          disabledClass: "nav-disabled",
        },
        // breakpoints: {
        //     1320: {
        //         slidesPerView: 5,
        //         spaceBetween: 24,
        //     },
        // },
      },
      minusWidth: 0,
      nowRender: false,
      activeOption: -1,
    };
  },
  computed: {
    ...mapState({
      options: (state) => state.productData.extraProduct,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
    }),
    windowInnerWidth() {
      return process.client ? window.innerWidth : 1280;
    },
  },
  mounted() {
    let box = this.$refs.dynawidth.getBoundingClientRect();
    if (window.innerWidth - box.width < 130) {
      this.minusWidth = 130 - (window.innerWidth - box.width);
      let element = this.$refs.dynawidth;
      element.style.width = "calc(100% - " + this.minusWidth + "px)";
      this.nowRender = true;
    } else {
      this.nowRender = true;
    }
  },
};
</script>

<style scoped>
.swiper-wrapper {
  width: calc(100% - 6px);
  margin-left: 3px;
}
.navigator-box {
  left: 50%;
  transform: translateX(-50%);
  width: calc(100vw - 40px);
  max-width: 1420px;
}
@media screen and (min-width: 1200px) and (max-width: 1279px) {
  .navigator-box {
    width: calc(100vw - 120px);
  }
}
.swiper-navigation-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.swiper-navigation-arrow:hover circle {
  fill: #1f84da;
}
.nav-disabled circle {
  fill: #7891a6 !important;
}
.nav-disabled {
  display: none;
}
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
