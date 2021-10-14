<template>
  <div id="product-pricing-component" class="flex flex-col justify-between">
    <div class="flex gap-2 xl:gap-6 items-stretch justify-between">
      <div class="w-7/12 xl:w-2/3 flex flex-col justify-between relative">
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
        <div class="flex items-center">
          <span class="text-xs text-tb-primary-dark">From:</span>
          <span class="text-22 text-tb-black font-normal ml-3">
            <client-only>
              <vue-intl-numberformat
                locale="de"
                formatStyle="currency"
                currency="EUR"
                :number="productData['priceRange']['min']"
                class="font-normal"
              ></vue-intl-numberformat>
              -
              <vue-intl-numberformat
                locale="de"
                formatStyle="currency"
                currency="EUR"
                :number="productData['priceRange']['max']"
                class="font-normal"
              ></vue-intl-numberformat>
            </client-only>
          </span>
        </div>
        <div class="flex items-center">
          <span class="text-xs text-tb-primary-dark">Share to:</span>
          <img
            src="~/assets/images/social/facebook.svg"
            class="ml-3 h-6 w-6"
            alt
          />
          <img
            src="~/assets/images/social/twitter.svg"
            class="ml-3 h-6 w-6"
            alt
          />
          <img
            src="~/assets/images/social/instagram.svg"
            class="ml-3 h-6 w-6"
            alt
          />
          <img
            src="~/assets/images/social/pinterest.svg"
            class="ml-3 h-6 w-6"
            alt
          />
        </div>
        <div class="flex items-stretch bg-tb-primary text-center h-8">
          <div
            v-bind:class="classBg(productData.class)"
            class="text-white w-1/7 rounded flex justify-center items-center py-1"
          >
            {{ productData.class }}
          </div>
          <div
            class="test-field-wrapper text-tb-primary-dark text-xs flex justify-center items-center py-1"
          >
            <p class="border-r border-white w-full">
              {{ productData.percentage }}/100 ({{ productData.test }}
              Tests)
            </p>
          </div>
          <div
            class="text-xs text-tb-primary-dark w-1/4 flex justify-center items-center py-1"
          >
            {{ productData.offer }} offers
          </div>
          <div
            class="text-xs text-white bg-tb-blue rounded w-1/4 flex justify-center items-center py-1"
          >
            {{ productData.testNoteText }}
          </div>
        </div>
      </div>
      <div class="5/12 xl:w-1/3 flex flex-col items-center gap-2">
        <div
          @click="openNewsModal = true"
          class="text-tb-blue underline flex items-center w-full justify-center cursor-pointer"
        >
          <img src="~/assets/images/subscribe.svg" alt />
          <span class="vue">Subscribe to this Product</span>
        </div>
        <transition name="fade">
          <NewsModal v-if="openNewsModal" @close="openNewsModal = false" />
        </transition>
        <div class="flex justify-between items-stretch gap-3 xl:gap-5 w-full">
          <div
            @click="openPriceAlarmLightbox = true"
            class="flex flex-col items-center justify-center rounded border w-full border-tb-primary-dark cursor-pointer group hover:border-tb-blue"
          >
            <i class="icn-pricealarm text-22"></i>
            <p
              class="text-xs text-tb-primary-dark mt-1 group-hover:text-tb-blue"
            >
              Price alarm
            </p>
          </div>
          <transition name="fade">
            <PriceAlarmLightbox
              v-if="openPriceAlarmLightbox"
              @close="openPriceAlarmLightbox = false"
              :name="productData.name"
              :price="productData['priceRange']['min']"
            />
          </transition>
          <div
            class="flex flex-col justify-center items-center rounded bg-tb-primary py-1 w-full"
          >
            <p
              class="text-tb-orange text-3xl text-center leading-none font-normal"
            >
              {{ productData.rate.toFixed(1) }}
            </p>
            <div class="flex flex-col justify-start items-center -mt-2">
              <client-only>
                <StarRating
                  :rating="productData.rate"
                  :increment="0.1"
                  :read-only="true"
                  :show-rating="false"
                  :star-size="10"
                  active-color="#FF7000"
                  glow-color="#00000000"
                  :padding="1"
                  :inline="true"
                ></StarRating>
              </client-only>
              <p
                @click="openFeedbackLightbox = true"
                class="text-xs text-tb-primary-dark underline cursor-pointer -mt-1 mb-px pb-px"
              >
                Write a review
              </p>
              <transition name="fade">
                <LeaveFeedbackLightbox
                  v-if="openFeedbackLightbox"
                  :data="productData.name"
                  @close="openFeedbackLightbox = false"
                />
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 rounded border border-tb-primary-dark py-6 px-2 xl:px-6">
      <div class="flex justify-between items-center">
        <p class="text-tb-black font-normal">Popular offers</p>
        <p
          @click="scrollToOffers"
          class="text-tb-primary-dark underline cursor-pointer"
        >
          More details
        </p>
      </div>
      <div class="mt-1">
        <div v-if="productLoading || !popularOffers[0].dummy">
          <div
            v-for="(item, index) in popularOffers.slice(0, 3)"
            :key="index"
            class="grid grid-cols-9 gap-4 xl:gap-6 items-center border-b border-tb-border last:border-transparent mt-3 pb-3 relative"
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
            <div class="col-span-2">
              <p class="text-22 text-tb-blue font-normal">
                <client-only>
                  <vue-intl-numberformat
                    locale="de"
                    formatStyle="currency"
                    currency="EUR"
                    :number="item.price"
                    class="font-normal"
                  ></vue-intl-numberformat>
                </client-only>
              </p>
              <p class="text-xs text-tb-primary-dark">
                {{
                  item.shipping > 0
                    ? "Shipping: " + item.shipping + " €"
                    : "Free Shipping"
                }}
              </p>
            </div>
            <div class="col-span-2 flex items-center">
              <img
                :src="
                  item.shippingPeriod.includes('Verfügbar')
                    ? require('~/assets/images/shipping-green.svg')
                    : require('~/assets/images/shipping-yellow.svg')
                "
                class="mr-2"
                alt=""
              />
              <div
                class="text-xs text-tb-primary-dark overflow-hidden line-clamp-3"
              >
                {{ item.shippingPeriod }}
              </div>
            </div>
            <div class="col-span-2">
              <v-lazy-image
                :src="item.logo"
                :key="item.logo"
                alt
                class="max-w-full float-right"
              />
            </div>
            <div class="col-span-3">
              <a :href="item.shopURL" target="_blank">
                <div
                  class="go-to-store rounded-full bg-tb-blue text-lg text-white text-center hover:bg-tb-blue-dark transition duration-75 cursor-pointer"
                >
                  Go to the store
                </div>
              </a>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="h-48 flex gap-4 items-center justify-center flex-col">
            <img src="~/assets/images/no-offer.svg" alt="" />
            <p class="text-22 text-tb-black font-normal">
              Currently no Offers listed
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeaveFeedbackLightbox from "@/components/product/LeaveFeedbackLightbox";
import PriceAlarmLightbox from "@/components/product/PriceAlarmLightbox";
import { ContentLoader } from "vue-content-loader";
import { mapState, mapGetters } from "vuex";
import NewsModal from "@/components/widget/NewsModal.vue";

export default {
  name: "ProductPricing",
  components: {
    LeaveFeedbackLightbox,
    PriceAlarmLightbox,
    ContentLoader,
    NewsModal,
  },
  data() {
    return {
      openFeedbackLightbox: false,
      openPriceAlarmLightbox: false,
      openNewsModal: false,
    };
  },
  computed: {
    ...mapState({
      productData: (state) => state.productData.productPricing,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
      popularOffers: "productData/popularOffers",
    }),
  },
  methods: {
    classBg(clas) {
      let firstLetter = clas;
      if (firstLetter) {
        switch (firstLetter[0]) {
          case "A":
            return "bg-tb-energy-a";
          case "B":
            return "bg-tb-energy-b";
          case "C":
            return "bg-tb-energy-c";
          case "D":
            return "bg-tb-energy-d";
          case "E":
            return "bg-tb-energy-e";
          case "F":
            return "bg-tb-energy-f";
          case "G":
            return "bg-tb-energy-g";
          default:
            return "";
        }
      } else return "";
    },
    scrollToOffers() {
      let offersTarget = document.getElementById("offers-target");
      // offersTarget.scrollIntoView({ behavior: "smooth" });
      var headerOffset = 100;
      var elementPosition = offersTarget.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.test-field-wrapper {
  width: 35.7142857%;
}
.company-badge {
  margin-top: 7px;
}
.go-to-store {
  padding-top: 11px;
  padding-bottom: 11px;
}
.fade-enter-active {
  transition: 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>