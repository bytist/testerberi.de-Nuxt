<template>
  <div class="home-product-slider-wrapper relative mx-auto">
    <div class="slider-outer-box container mx-auto">
      <p class="text-tb-black text-xl font-normal -mb-5">Top Produkte</p>
      <div class="slider-inner-box overflow-x-hidden">
        <div class="slider-final-box">
          <swiper
            ref="topProductSwiper"
            @transitionEnd="updateActive"
            :options="swiperOption"
          >
            <swiper-slide v-for="(product, index) in productArray" :key="index">
              <div
                class="product-content-wrapper flex flex-col justify-between items-center single-slide px-4 pt-4 relative"
                @mouseenter="removeBorderL(index + 1)"
                @mouseleave="recoverBorderL()"
              >
                <NuxtLink
                  :to="'/produkte' + product.purl"
                  :class="borderLessItem === index ? '' : 'border-l'"
                  class="absolute hover-box h-full top-0 transition duration-75 w-full left-0 border-tb-border"
                ></NuxtLink>
                <div class="product-thumbnail-wrapper h-24 mb-6">
                  <img
                    :src="product.img"
                    alt
                    class="mx-auto max-w-full max-h-full"
                  />
                </div>
                <div class="product-desc-wrapper h-24">
                  <p
                    class="product-name text-tb-black text-base truncate-2 h-12"
                  >
                    {{ product.title }}
                  </p>
                  <p class="text-xs">
                    <span class="text-tb-primary-dark">
                      {{ product.score }}/100 ({{ product.tests }}
                      Test) ab
                      <span class="text-tb-blue">
                        <client-only>
                          <vue-intl-numberformat
                            locale="de"
                            formatStyle="currency"
                            currency="EUR"
                            :number="parseInt(product.preis)"
                          ></vue-intl-numberformat>
                        </client-only>
                      </span>
                    </span>
                  </p>
                  <div class="rating-wrapper">
                    <client-only>
                      <star-rating
                        :rating="product.meinungenStars"
                        :increment="0.1"
                        :read-only="true"
                        :show-rating="false"
                        :star-size="12"
                        active-color="#FF7000"
                        glow-color="#00000000"
                        :padding="1"
                        :inline="true"
                      ></star-rating>
                    </client-only>
                    <span class="text-xs text-tb-primary-dark"
                      >({{ product.meinungen }})</span
                    >
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div
      class="pagination-wrapper absolute bottom-4 transform w-full flex justify-center text-center z-20"
    >
      <div
        v-for="(item, index) in bulletNumbers"
        :key="index"
        @click="slideSwiperTo(item)"
        :class="{
          'swiper-pagination-bullet-active': activeBullet === index,
        }"
        class="swiper-pagination-bullet rounded-full cursor-pointer"
      ></div>
    </div>
    <div
      class="home-top-prod-next swiper-navigation-next product-slider-next swiper-navigation-arrow z-10"
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
      class="home-top-prod-prev swiper-navigation-prev product-slider-prev swiper-navigation-arrow z-10"
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
</template>

<script>
// import StarRating from "vue-star-rating";
import sliderProductData from "@/json/homeProductSlider.json";
import { getTopProducts } from "@/services/service";

export default {
  name: "HomeProductSlider",

  data() {
    return {
      swiperOption: {
        loop: false,
        slidesPerView: 5,
        followFinger: false,
        threshold: 50,
        navigation: {
          nextEl: ".home-top-prod-next",
          prevEl: ".home-top-prod-prev",
        },
        breakpoints: {
          // when window width is >= 1024px
          1280: {
            slidesPerView: 6,
          },
        },
      },
      productArray: sliderProductData,
      activeBullet: 0,
      borderLessItem: 9999,
      itemCount: 0,
      bulletNumbers: [],
      wWdh: this.css < 1280 ? 5 : 6,
    };
  },

  computed: {
    swiper() {
      return this.$refs.topProductSwiper.$swiper;
    },
    css() {
      return process.client ? window.innerWidth : 1200;
    },
  },

  created() {
    this.getPopularProducts();
  },

  methods: {
    slideSwiperTo(index) {
      this.swiper.slideTo(index);
    },

    updateActive() {
      this.activeBullet = parseInt(this.swiper.activeIndex / this.wWdh);
    },

    removeBorderL(id) {
      this.borderLessItem = id;
    },

    recoverBorderL() {
      this.borderLessItem = 9999;
    },

    async getPopularProducts() {
      let data = await getTopProducts();
      this.itemCount = data.length;

      for (
        let index = 0;
        index < parseInt(this.itemCount / this.wWdh);
        index++
      ) {
        this.bulletNumbers.push(index * this.wWdh);
      }

      if (this.itemCount % this.wWdh)
        this.bulletNumbers.push(this.itemCount - (this.itemCount % this.wWdh));

      for (let item of data) {
        item.purl = item.purl.substring(9);
      }

      this.productArray = data.reverse();
    },
  },
};
</script>

<style scoped>
.home-product-slider-wrapper {
  max-width: 1420px;
}
.slider-final-box {
  width: calc(100% + 2px);
  margin-left: -1px;
}
.swiper-navigation-arrow {
  position: absolute;
  bottom: 186px;
  transform: translateY(50%);
}
.swiper-navigation-arrow:focus {
  outline: none;
}
.swiper-navigation-arrow:hover circle {
  fill: #1f84da;
}
.swiper-navigation-next {
  right: 20px;
}
.swiper-navigation-prev {
  left: 20px;
}
.hover-box:hover {
  width: calc(100% - 2px);
  left: 1px;
  border: 1px solid #3099f2;
  border-radius: 4px;
}
.home-product-slider-wrapper .swiper-button-disabled circle {
  fill: #7891a6 !important;
}
.home-product-slider-wrapper .swiper-button-disabled {
  display: none;
}
</style>
