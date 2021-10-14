<template>
  <div id="product-page" class='disableselect disabledrag'>
    <div class="px-3">
      <div class="container mx-auto pt-2">
        <Breadcrumb :link-array="linkData" />
        <div class="product-detail-wrapper mt-10">
          <div
            ref="productHeaderWrapper"
            class="product-header border-b border-tb-border flex justify-between items-end"
            :class="
              showStickyHeader
                ? 'fixed top-0 z-30 mx-auto container mt-12 xl:mt-16 bg-white py-4'
                : 'min-h-12'
            "
          >
            <div
              class="font-normal text-tb-black whitespace-no-wrap w-1/2 truncate relative"
            >
              <div
                v-if="productLoading"
                class="absolute top-0 left-0 h-full w-full bg-white py-1"
              >
                <div class="overflow-hidden h-full rounded">
                  <ContentLoader
                    primaryColor="#EFF2F5"
                    secondaryColor="#E5EAEE"
                    :speed="1"
                    class="content-loader-item"
                  />
                </div>
              </div>
              <span
                ref="productHeaderName"
                class="whitespace-no-wrap transition-all duration-200 font-normal"
                :style="`font-size: ${
                  !showStickyHeader && titleScaleRate > 0.63
                    ? titleScaleRate * 32 - 1
                    : 20
                }px;`"
              >
                {{ productTitle }}
              </span>
            </div>
            <client-only>
              <scrollactive
                class="flex items-end text-tb-primary-dark transition-all duration-200"
                :class="
                  showStickyHeader ? 'text-lg xl:text-xl' : 'text-xl xl:text-22'
                "
                :active-class="'product-tab-active'"
                :highlightFirstItem="true"
                :offset="115"
                :modifyUrl="false"
              >
                <a
                  href="#testing-target"
                  class="scrollactive-item product-tab-normal border-transparent font-normal px-2 cursor-pointer xl:px-3 mx-2 hover:text-tb-blue"
                >
                  Testing
                </a>
                <a
                  href="#offers-target"
                  class="scrollactive-item product-tab-normal border-transparent font-normal px-2 cursor-pointer xl:px-3 mx-2 hover:text-tb-blue"
                >
                  Offers
                </a>
                <a
                  href="#review-target"
                  class="scrollactive-item product-tab-normal border-transparent font-normal px-2 cursor-pointer xl:px-3 mx-2 hover:text-tb-blue"
                >
                  Customer review
                </a>
                <a
                  href="#product-info-target"
                  class="scrollactive-item product-tab-normal border-transparent font-normal px-2 cursor-pointer xl:px-3 mx-2 hover:text-tb-blue"
                >
                  Product info
                </a>
              </scrollactive>
            </client-only>
          </div>
          <div
            class="tab-contents-wrapper mt-12"
            :style="
              showStickyHeader &&
              `margin-top: 84px !important; padding-top: 36px;`
            "
          >
            <div>
              <div class="flex items-stretch gap-2 xl:gap-6">
                <div class="product-gallery-wrapper w-full">
                  <ProductGallery
                    :img-array="productData.gallery"
                    :video="productData.video"
                  />
                </div>
                <div class="product-pricing-wrapper w-full">
                  <ProductPricing @openoffers="activeTab = 1" />
                </div>
              </div>
              <div class="mt-8">
                <AdvancedOption
                  :options="productData.advanced"
                />
              </div>
            </div>
            <div>
              <div id="testing-target" class="tab-content-wrapper">
                <div
                  class="toggleWrapper relative"
                  :class="!toggleWrapperOpen && `overflow-hidden h-56`"
                >
                  <div
                    v-if="productLoading"
                    class="absolute top-0 left-0 h-full w-full bg-white py-1 z-20"
                  >
                    <client-only>
                      <div class="overflow-hidden h-full rounded">
                        <ContentLoader
                          primaryColor="#EFF2F5"
                          secondaryColor="#E5EAEE"
                          :speed="1"
                          class="content-loader-item"
                        />
                        <ContentLoader
                          primaryColor="#EFF2F5"
                          secondaryColor="#E5EAEE"
                          :speed="1"
                          class="content-loader-item"
                        />
                      </div>
                    </client-only>
                  </div>
                  <Description
                    class="mt-8"
                    :descData="productData.description"
                  />
                  <ProductDetailSmall class="mt-4 mb-20" :data="productData" />
                  <div class="absolute bottom-0 left-0 w-full">
                    <div
                      v-if="!toggleWrapperOpen"
                      class="h-24 bg-gradient-to-t from-white via-white"
                    ></div>
                    <div
                      @click="toggleWrapperOpen = !toggleWrapperOpen"
                      class="text-tb-blue text-base underline absolute bottom-0 w-full flex justify-center items-center cursor-pointer"
                      :class="toggleWrapperOpen && '-mb-5'"
                    >
                      <img
                        src="~/assets/images/circle-arrow-right.svg"
                        class="mr-1 transform h-4"
                        :class="toggleWrapperOpen ? '-rotate-90' : 'rotate-90'"
                        alt=""
                      />
                      Show
                      {{ toggleWrapperOpen ? "Less" : "More" }}
                      Info
                    </div>
                  </div>
                </div>
                <ConsumerMagazine class="mt-8" :data="productData" />
              </div>
              <div id="offers-target" class="tab-content-wrapper">
                <div
                  v-if="productOffers.length > 0"
                  class="bg-tb-primary rounded p-5 xl:p-8 mt-5"
                >
                  <div class="flex justify-between items-center mb-3">
                    <div class="relative">
                      <div
                        v-if="productLoading"
                        class="absolute top-0 left-0 h-full w-full bg-tb-primary py-1 z-20"
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
                      <p class="text-22 text-tb-black font-normal">
                        {{ productTotalOffers }}
                        Angebote zu
                        {{ productTitle }}
                      </p>
                    </div>
                    <div class="text-xs text-tb-primary-dark relative">
                      <div
                        v-if="productLoading"
                        class="absolute top-0 left-0 h-full w-full bg-tb-primary py-1 z-20"
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
                      Data from 08/09/2020 04:19
                    </div>
                  </div>
                  <div
                    v-for="(item, index) in productOffers"
                    :key="index"
                    @mouseenter="hoveredOffer = index"
                    @mouseleave="hoveredOffer = -1"
                    class="items-center content-center transition duration-150 hover:shadow-lg py-6 xl:py-8 px-8 xl:px-10 rounded bg-white mb-5 grid grid-cols-12 gap-3 xl:gap-6 relative"
                  >
                    <div
                      v-if="productLoading"
                      class="absolute top-0 left-0 h-full w-full bg-tb-primary py-1 z-20"
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
                    <div>
                      <v-lazy-image
                        :src="item.thumbnail"
                        :key="item.thumbnail"
                        class="max-h-full max-w-full"
                        alt
                      />
                    </div>
                    <div class="col-span-4">
                      <p
                        class="text-xl xl:text-18 leading-6 text-tb-primary-dark col-span-4 truncate-2"
                      >
                        {{ item.name }}
                      </p>
                    </div>
                    <div class="flex flex-col items-center">
                      <v-lazy-image
                        :src="item.shop.shopLogo"
                        :key="item.shop.shopLogo"
                        class="max-h-full max-w-full"
                        alt
                      />
                      <div class="flex">
                        <client-only>
                          <StarRating
                            :rating="item.stars"
                            :read-only="true"
                            :show-rating="false"
                            :star-size="7"
                            :increment="0.1"
                            active-color="#FF7000"
                            inactive-color="#FFFFFF"
                            glow-color="#00000000"
                            :padding="2"
                            :inline="true"
                            border-color="#FF7000"
                            :border-width="2"
                            class="-mt-px"
                          ></StarRating>
                        </client-only>
                        <div class="text-xs text-tb-primary-dark ml-1 mt-1">
                          {{ item.rateCount || 0 }}
                        </div>
                      </div>
                      <div
                        class="text-xs text-tb-blue cursor-pointer"
                        @click="openOfferBox(index)"
                      >
                        Offer Info
                      </div>
                    </div>
                    <div class="col-span-2">
                      <span class="flex">
                        <img src="~/assets/images/truck.svg" alt />
                        <span
                          class="ml-2 text-xs text-tb-blue overflow-hidden line-clamp-3"
                        >
                          Delivery: Usually ships
                          <br />
                          {{ item.delivery }}
                        </span>
                      </span>
                    </div>
                    <div class="col-span-2">
                      <p class="text-22 text-tb-black font-normal">
                        <client-only>
                          <vue-intl-numberformat
                            locale="de"
                            formatStyle="currency"
                            currency="EUR"
                            :number="parseFloat(item.price)"
                            class="font-normal"
                          ></vue-intl-numberformat>
                        </client-only>
                      </p>
                      <p class="text-xs text-tb-primary-dark">
                        Shipping:
                        <client-only>
                          <vue-intl-numberformat
                            locale="de"
                            formatStyle="currency"
                            currency="EUR"
                            :number="parseFloat(item.shipping)"
                          ></vue-intl-numberformat>
                        </client-only>
                      </p>
                      <p class="text-xs text-tb-primary-dark">
                        Total:
                        <client-only>
                          <vue-intl-numberformat
                            locale="de"
                            formatStyle="currency"
                            currency="EUR"
                            :number="parseFloat(item.total)"
                          ></vue-intl-numberformat>
                        </client-only>
                      </p>
                    </div>
                    <div class="col-span-2">
                      <a
                        :href="item.shop.link"
                        target="_blank"
                        class="main-button px-1"
                      >
                        Go to the store
                      </a>
                    </div>
                  </div>
                  <transition name="fade">
                    <ProductOfferLightbox
                      v-if="showOfferBox"
                      @close="showOfferBox = false"
                      :data="productOffers[offerBoxDataId]"
                    />
                  </transition>
                </div>
                <div v-else>
                  <div
                    class="rounded w-full bg-tb-primary flex flex-col justify-center items-center gap-4 h-64 mt-5"
                  >
                    <img src="~/assets/images/no-offer.svg" alt="" />
                    <p class="text-22 text-tb-black font-normal">
                      Currently no Offers listed
                    </p>
                  </div>
                  <hr class="mt-12 border-t border-tb-border w-full" />
                </div>
              </div>
              <div id="review-target" class="tab-content-wrapper">
                <ProductReviews
                  :link-data="linkData"
                  :product-title="productTitle"
                  class="mt-5"
                />
              </div>
              <div
                id="product-info-target"
                class="tab-content-wrapper relative"
              >
                <div
                  v-if="productLoading"
                  class="absolute top-0 left-0 h-full w-full bg-white py-1 z-20"
                >
                  <client-only>
                    <div class="overflow-hidden h-full rounded">
                      <ContentLoader
                        primaryColor="#EFF2F5"
                        secondaryColor="#E5EAEE"
                        :speed="1"
                        class="content-loader-item"
                      />
                      <ContentLoader
                        primaryColor="#EFF2F5"
                        secondaryColor="#E5EAEE"
                        :speed="1"
                        class="content-loader-item"
                      />
                    </div>
                  </client-only>
                </div>
                <ProductDetail
                  v-if="productDetail"
                  :product-title="productTitle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts class="mt-10" :data="productData.relatedProducts" />
    </div>
    <PopularSearch class="mt-8" />
  </div>
</template>

<script>
import Breadcrumb from "@/components/widget/Breadcrumb";

import productSingleJson from "@/json/productSingle.json";

import ProductGallery from "@/components/product/ProductGallery";
import ProductPricing from "@/components/product/ProductPricing";
import AdvancedOption from "@/components/product/AdvancedOption";
import SerieVariations from "@/components/series/SerieVariations";
import Description from "@/components/product/Description";
import ProductDetailSmall from "@/components/product/ProductDetailSmall";
import ConsumerMagazine from "@/components/product/ConsumerMagazine";
import RelatedProducts from "@/components/product/RelatedProducts";
import PopularSearch from "@/components/product/PopularSearch";
import ProductDetail from "@/components/product/details/ProductDetail";
import ProductReviews from "@/components/product/reviews/ProductReviews";
import ProductOfferLightbox from "@/components/product/ProductOfferLightbox.vue";
import { ContentLoader } from "vue-content-loader";

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: "Product",
  scrollToTop: true,
  components: {
    Breadcrumb,
    ProductGallery,
    ProductPricing,
    AdvancedOption,
    Description,
    ProductDetailSmall,
    ConsumerMagazine,
    RelatedProducts,
    PopularSearch,
    ProductDetail,
    ProductReviews,
    ProductOfferLightbox,
    ContentLoader,
    SerieVariations,
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        }
      ]
    }
  },
  data() {
    return {
      linkData: [
        {
          url: "/",
          label: this.$route.params.product,
        },
      ],
      productData: productSingleJson,
      activeTab: 0,
      toggleWrapperOpen: false,
      titleScaleRate: 1,
      hoveredOffer: -1,
      showStickyHeader: false,
      tabBar: null,
      tabBarSticky: null,
      scrOffset: this.windowInnerWidth < 1280 ? 48 : 64,
      showOfferBox: false,
      offerBoxDataId: 0,
      title: '',
      preOption: -1,
      intervalTitleChanged: 1000 * 60 * 60,
      description: '',
    };
  },
  computed: {
    ...mapState({
      productTitle: (state) => state.productData.productPricing.name,
      productTotalOffers: (state) => state.productData.productPricing.totalOffers,
      productDetail: (state) => state.productData.productDetail,
      productDataForTitle: (state) => {
        return state.productData;
      },
    }),
    ...mapGetters('productData', {
      productOffers: "productPopularOffers",
      productLoading: "productLoading",
    }),
    windowInnerWidth() {
      return process.client ? window.innerWidth : 1280;
    },
  },
  watch: {
    productTitle: {
      deep: false,
      immediate: false,
      handler: function () {
        setTimeout(() => {
          let productHeaderWrapperWidth =
            this.$refs.productHeaderWrapper.getBoundingClientRect().width / 2;
          let productHeaderNameWidth = this.$refs.productHeaderName.getBoundingClientRect()
            .width;
          this.titleScaleRate =
            productHeaderWrapperWidth / productHeaderNameWidth < 1.0
              ? productHeaderWrapperWidth / productHeaderNameWidth
              : 1;
        }, 50);
        setTimeout(() => {
          this.updateProductLoading(false);
        }, 150);
        setTimeout(this.writeTitle, 3000);
        setTimeout(this.writeDescription, 3000);
      },
    },
    "$route.params": {
      deep: true,
      immediate: false,
      handler: function () {
        this.loadData();
        this.updateProductLoading(true);
      },
    },
  },
  created() {
    this.updateProductLoading(true);
  },
  mounted() {
    this.loadData();
    this.tabBar = this.$refs.productHeaderWrapper;
    this.tabBarSticky = this.tabBar.offsetTop;
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("copy", event => event.preventDefault());
    window.addEventListener("cut", event => event.preventDefault());
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("copy", event => event.preventDefault());
    window.removeEventListener("cut", event => event.preventDefault());
  },
  methods: {
    ...mapActions('productData', [
      "addBoxSummary",
      "addTopProductBox",
      "addConsumerMagazine",
      "addMeinungenBox",
      "addFragenBox",
      "addInformationenBox",
      "addAngeboteBox",
      "updateProductLoading",
      "addMoreSearch",
    ]),
    toggleAction() {
      this.toggleWrapperOpen = this.toggleWrapperOpen ? false : true;
    },
    loadData() {
      let productName = this.$route.params.product;

      this.addBoxSummary(productName);
      this.addTopProductBox(productName);
      this.addConsumerMagazine(productName);
      this.addMeinungenBox({ productName, pageNumber: 1, sortMode: 1 });
      this.addFragenBox(productName);
      this.addInformationenBox(productName);
      this.addAngeboteBox(productName);
      this.addMoreSearch(productName);
    },
    handleScroll() {
      if (window.pageYOffset + this.scrOffset >= this.tabBarSticky) {
        this.showStickyHeader = true;
      } else {
        this.showStickyHeader = false;
      }
    },
    openOfferBox(index) {
      this.offerBoxDataId = index;
      this.showOfferBox = true;
    },
    writeTitle() {
      var newTitle = '';
      let productTitle = this.productDataForTitle.productPricing.name;
      let currentDate = new Date();
      let nIconCounts = 2;
      let nOptionCounts = 3;
      let icons = ['☀️', '❤️'];
      let icon = Math.floor(Math.random() * nIconCounts);
      let nOption = Math.floor(Math.random() * nOptionCounts);
      if (this.preOption == nOption)
        nOption = (nOption + 1) % nOptionCounts;

      newTitle = productTitle + " " + icons[icon] + " ";
      if (nOption === 0) {
        newTitle += ' Jetzt ab ' + this.productDataForTitle.productPricing.priceRange.min;
        newTitle += ' € (' + currentDate.toLocaleDateString('de-DE', {year: 'numeric', month: 'short'}) + ') Testbericht.de';
      } else if (nOption === 1) {
        newTitle += '| Testbericht.de-Note: ' + this.productDataForTitle.productPricing.percentage + '/100 vom ';
        newTitle += currentDate.toLocaleDateString('de-DE', {year: 'numeric', month: 'short'}) + ' Testbericht.de';
      } else if (nOption === 2) {
        newTitle += ' Testbericht.de-Note: ' + this.productDataForTitle.productPricing.testNoteText + ' vom ';
        newTitle += currentDate.toLocaleDateString('de-DE', {year: 'numeric', month: 'short'}) + ' Testbericht.de';
      }

      this.title = newTitle;
      this.preOption = nOption;
      setTimeout(this.writeTitle, this.intervalTitleChanged);
    },
    writeDescription() {
      var newDescription = '';
      let productTitle = this.productDataForTitle.productPricing.name;
      let currentDate = new Date();
      let nIconCounts = 2;
      let nOptionCounts = 3;
      let icons = ['☀️', '❤️'];
      let pfeil = "➤"; //"&#x27a4;"; // "➤"
      let haken = "✓"; //"&#x2713;"; // "✓"
      let icon = Math.floor(Math.random() * nIconCounts);
      let nOption = Math.floor(Math.random() * nOptionCounts);
      if (this.preOption == nOption)
        nOption = (nOption + 1) % nOptionCounts;
      newDescription += productTitle + ' Test ' + icons[icon];

      if (this.productDataForTitle.productOffers.length > 0)
        newDescription += this.productDataForTitle.productOffers.length + ' Angebot';

      newDescription += this.productDataForTitle.productPricing.test + ' Testbericht';
      const customerPros = this.productDataForTitle.consumerMagazine.customerPros;
      if (customerPros.length > 0) {
        newDescription += " (" + customerPros[Math.floor(Math.random() * customerPros.length)] + ")"
        newDescription += ', ' + haken + 'Kundenmeinungen &' + haken + 'Bewertungen ';
        newDescription += this.productDataForTitle.consumerMagazine.customerFeedback[0].text;
      } else if(this.productDataForTitle.productOffers.length > 0) {
        newDescription = " en, ab " + this.productDataForTitle.productPricing.priceRange.min + '€ ' +
          haken + ', echten Käufermeinungen ' + haken + ', große Shopvielfalt sowie Produktinformationen auf ';
      }

      newDescription += " - Infos vom (" + currentDate.toLocaleDateString('de-DE', {year: 'numeric', month: 'numeric', day: 'numeric'}) + ") auf " + 'Testbericht.de.';
      this.description = newDescription;
      setTimeout(this.writeDescription, this.intervalTitleChanged);
    },
  },
};
</script>

<style scoped>
.product-tab-normal {
  border-bottom: 3px solid transparent;
}
.product-tab-active {
  border-color: #3099f2;
  color: #3099f2;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.content-loader-item * {
  rx: 0;
  ry: 0;
}
.min-h-12 {
  min-height: 47px;
}
/* Disables the selection */
.disableselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge*/
  user-select: none;          /* Non-prefixed version, currently
                                  not supported by any browser */
}

/* Disables the drag event
(mostly used for images) */
.disabledrag{
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}
</style>
