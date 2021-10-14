<template>
  <div class="home-top-slider-wrapper relative overflow-x-hidden">
    <swiper
      ref="topswiper"
      @transitionEnd="updateActive"
      :options="swiperOption"
      class="home-top-slider select-none bg-tb-primary overflow-visible mb-16"
    >
      <swiper-slide
        v-for="(item, index) in sliderData"
        :key="index"
        class="slide -mb-16 pb-16"
      >
        <div class="slide-content-wrapper bg-tb-primary" v-if="index % 2 == 0">
          <div
            class="slide-content container lg:w-1024 xl:w-1280 mx-auto flex py-32"
          >
            <div
              data-swiper-parallax-opacity="0"
              data-swiper-parallax-scale="0.5"
              class="slide-text-wrapper w-1/2"
            >
              <div class="slide-text-content mx-auto xl:w-3/4">
                <h1
                  data-swiper-parallax="600"
                  class="slide-text-title text-5xl font-extrabold text-tb-black"
                >
                  {{ item.title }}
                </h1>
                <p class="text-tb-black mt-2 mb-10 text-xl">
                  {{ item.descr }}
                </p>
                <div data-swiper-parallax="-500">
                  <NuxtLink
                    :to="{ path: item.cat }"
                    class="main-button w-56"
                    data-swiper-parallax="-600"
                    >Find out more</NuxtLink
                  >
                </div>
              </div>
            </div>
            <div
              data-swiper-parallax-opacity="0"
              data-swiper-parallax="-1000"
              data-swiper-parallax-duration="300"
              class="slide-img-wrapper w-1/2 relative"
            >
              <img
                :src="`${siteImgGoogle}slider/${item.img}.jpg`"
                alt
                class="slide-img mx-auto absolute top-0 transform -translate-y-5 xl:translate-x-32 transition duration-1000 ease-in-out hover:-translate-y-8"
              />
            </div>
          </div>
        </div>

        <div class="slide-content-wrapper bg-tb-primary" v-else>
          <div
            class="slide-content container lg:w-1024 xl:w-1280 mx-auto flex py-32"
          >
            <div
              data-swiper-parallax-opacity="0"
              data-swiper-parallax="-1000"
              data-swiper-parallax-duration="300"
              class="slide-img-wrapper w-1/2 relative"
            >
              <img
                :src="`${siteImgGoogle}slider/${item.img}.jpg`"
                alt
                class="slide-img mx-auto absolute top-0 transform -translate-y-5 xl:translate-x-32 transition duration-1000 ease-in-out hover:-translate-y-8"
              />
            </div>
            <div
              data-swiper-parallax-opacity="0"
              data-swiper-parallax-scale="0.5"
              class="slide-text-wrapper w-1/2"
            >
              <div class="slide-text-content mx-auto xl:w-3/4">
                <h1
                  data-swiper-parallax="600"
                  class="slide-text-title text-5xl font-extrabold text-tb-black"
                >
                  {{ item.title }}
                </h1>
                <p class="text-tb-black mt-2 mb-10 text-xl">
                  {{ item.descr }}
                </p>
                <div data-swiper-parallax="-500">
                  <NuxtLink
                    :to="{ path: item.cat }"
                    class="main-button w-56"
                    data-swiper-parallax="-600"
                    >Find out more</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div
      class="pagination-wrapper absolute bottom-24 transform w-full flex justify-center text-center z-20"
      :class="slidersLoaded ? '' : 'hidden'"
    >
      <div
        v-for="(item, index) in sliderData"
        :key="index"
        @click="slideSwiperTo(index + 1)"
        :class="{
          'swiper-pagination-bullet-active': activeBullet === index + 1,
        }"
        class="swiper-pagination-bullet rounded-full cursor-pointer"
      ></div>
    </div>
    <div
      class="home-swiper-nav-attr-next swiper-navigation-next swiper-navigation-arrow top-0 absolute h-full px-10 focus:outline-none pt-48 z-10 right-0"
    >
      <img src="~/assets/images/arrow-bg.svg" alt />
    </div>
    <div
      class="home-swiper-nav-attr-prev swiper-navigation-prev swiper-navigation-arrow top-0 absolute h-full px-10 focus:outline-none pt-48 z-10 left-0"
    >
      <img
        src="~/assets/images/arrow-bg.svg"
        class="transform rotate-180"
        alt
      />
    </div>
  </div>
</template>

<script>
import { getTopSliders } from "@/services/service";

import { SITE_IMG_GOOGLE } from "@/common/constant";

export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperOption: {
        speed: 1000,
        navigation: {
          nextEl: ".home-swiper-nav-attr-next",
          prevEl: ".home-swiper-nav-attr-prev",
        },
        parallax: true,
        loop: true,
      },
      sliderData: [{}],
      siteImgGoogle: SITE_IMG_GOOGLE,
      slidersLoaded: false,
      activeBullet: 1,
    };
  },
  computed: {
    swiper() {
      return this.$refs.topswiper.$swiper;
    },
  },
  created() {
    this.getTopSliders();
  },
  methods: {
    slideSwiperTo(index) {
      this.swiper.slideTo(index);
    },
    updateActive() {
      this.activeBullet = this.swiper.activeIndex;
    },
    async getTopSliders() {
      let data = await getTopSliders();
      if (data) this.sliderData = data;
      this.slidersLoaded = true;
    },
  },
};
</script>

<style scoped>
.container.slide-content {
  max-width: calc(100% - 150px);
}
.slide-text-wrapper {
  min-height: 222px;
}
</style>
