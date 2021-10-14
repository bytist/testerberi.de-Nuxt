<template>
  <div
    id="search-lightbox-component"
    class="search-lightbox-wrapper z-40 pt-12 pb-24 fixed top-0 left-0 h-full w-full overflow-y-auto flex justify-center"
  >
    <div
      class="absolute top-0 left-0 w-full h-full bg-tb-primary-dark opacity-50 z-0"
      @click="$emit('close')"
    ></div>
    <div
      class="search-box-container w-full static z-20"
      :class="!expandResult && 'h-0'"
    >
      <div
        class="rounded-full bg-white w-full py-6 h-20 shadow-custom z-20 relative"
      >
        <div class="relative h-full pl-12 pr-20 flex items-center py-px">
          <div
            class="w-full h-full pl-4 pr-10 border-r border-tb-semi-dark relative flex items-center"
          >
            <input
              ref="searchInput"
              type="text"
              class="w-full h-full border-none outline-none focus:outline-none bg-none text-22 placeholder-tb-black caret-blue transition-colors duration-150"
              :class="isInputFocus ? 'text-tb-black' : 'text-tb-primary-dark'"
              placeholder="Search"
              v-model="searchText"
              @focus="isInputFocus = true"
              @blur="isInputFocus = false"
            />
            <transition name="fade">
              <img
                v-if="searchText.length"
                @click="searchText = ''"
                src="~/assets/images/times.svg"
                alt="clear"
                class="absolute right-0 mr-4 cursor-pointer"
              />
            </transition>
          </div>
          <img
            src="~/assets/images/search-blue.svg"
            class="h-6 absolute left-0 ml-5 transform translate-x-1 transition-opacity duration-150"
            :class="!isInputFocus && 'opacity-50'"
            alt="search"
          />
          <div
            @click="$emit('close')"
            class="absolute right-0 mr-5 text-tb-primary-dark hover:text-tb-blue text-base cursor-pointer"
          >
            Cancel
          </div>
        </div>
      </div>
      <transition name="fade">
        <client-only>
          <div
            v-if="expandResult"
            class="rounded pt-12 pb-8 bg-tb-primary -mt-10 z-0 relative h-full"
          >
            <div class="grid grid-cols-12 mt-2 h-full">
              <div
                ref="sideScroller"
                class="col-span-4 nice-scroll overflow-auto"
                @keydown="
                  (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                "
              >
                <div class="py-1">
                  <p
                    v-if="dataLength[0]"
                    class="text-base ml-6 text-tb-blue font-normal"
                  >
                    Products
                  </p>
                  <div class="pr-4 mt-2">
                    <div
                      v-for="(item, index) in searchResult.products"
                      :key="index"
                      :id="`child${totalItemCount(0) + index}`"
                      :data-target-url="`/produkte/${item._source.url}`"
                    >
                      <div>
                        <div
                          class="h-px ml-5"
                          :class="
                            index != 0 && !item.hideBorder
                              ? 'bg-white'
                              : 'bg-transparent'
                          "
                        ></div>
                        <div
                          class="-mr-1 rounded-r border-l-2 border-transparent group cursor-pointer"
                          @click="closeAndPush(`/produkte/${item._source.url}`)"
                          @mouseover="checkHoverOn(0, index)"
                          @mouseout="checkHoverOut(0, index)"
                          :class="
                            keyKey == totalItemCount(0) + index
                              ? 'border-tb-blue bg-white'
                              : 'border-transparent'
                          "
                        >
                          <div
                            class="pr-5 pl-5 py-2 grid grid-cols-12 gap-2 xl:gap-3"
                          >
                            <div
                              class="col-span-3 px-px flex flex-col justify-center"
                            >
                              <div
                                class="flex h-16 p-1 mx-px justify-center items-center border rounded bg-white"
                                :class="
                                  keyKey == totalItemCount(0) + index
                                    ? 'border-transparent'
                                    : 'border-tb-primary-dark'
                                "
                              >
                                <img
                                  :src="`//img.testbericht.de${item._source.img}`"
                                  class="max-w-full max-h-full"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div class="col-span-8">
                              <text-highlight
                                :queries="searchKeywords"
                                :caseSensitive="false"
                                highlightClass="text-tb-blue highlight-mark"
                                class="text-base leading-tight text-tb-black"
                                >{{ item._source.name }}</text-highlight
                              >
                              <div class="text-xs mt-1">
                                <span class="text-tb-primary-dark">
                                  {{ item._source.score }}/100 ({{
                                    item._source.test
                                  }}
                                  Test) ab
                                </span>
                                <span class="text-tb-black"> from </span>
                                <span class="text-tb-blue">
                                  <vue-intl-numberformat
                                    locale="de"
                                    formatStyle="currency"
                                    currency="EUR"
                                    :number="item.price || 0"
                                  ></vue-intl-numberformat>
                                </span>
                              </div>
                            </div>
                            <div
                              class="col-span-1"
                              :class="
                                keyKey == totalItemCount(0) + index
                                  ? 'block'
                                  : 'hidden'
                              "
                            >
                              <div
                                class="flex w-full h-full justify-end items-center"
                              >
                                <img src="~/assets/images/return.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="py-1">
                  <p
                    v-if="dataLength[1]"
                    class="text-base ml-6 text-tb-blue font-normal"
                  >
                    Category
                  </p>
                  <div class="pr-4 mt-2">
                    <div
                      v-for="(item, index) in searchResult.category"
                      :key="index"
                      :id="`child${totalItemCount(1) + index}`"
                      :data-target-url="item._source.url"
                    >
                      <div>
                        <div
                          class="h-px ml-5"
                          :class="
                            index != 0 && !item.hideBorder
                              ? 'bg-white'
                              : 'bg-transparent'
                          "
                        ></div>
                        <div
                          class="-mr-1 rounded-r border-l-2 group cursor-pointer"
                          @click="closeAndPush(item._source.url)"
                          @mouseover="checkHoverOn(1, index)"
                          @mouseout="checkHoverOut(1, index)"
                          :class="
                            keyKey == totalItemCount(1) + index
                              ? 'border-tb-blue bg-white'
                              : 'border-transparent'
                          "
                        >
                          <div
                            class="pr-5 pl-5 py-2 grid grid-cols-10 gap-2 xl:gap-3 h-12"
                          >
                            <!-- <div class="col-span-2">
														<div
															class="flex h-16 py-1 justify-center items-center"
														>
															<img
																:src="item._source.img"
																class="max-w-full max-h-full"
																alt=""
															/>
														</div>
													</div> -->
                            <div
                              class="col-span-9 flex flex-col justify-center"
                            >
                              <text-highlight
                                :queries="searchKeywords"
                                :caseSensitive="false"
                                highlightClass="text-tb-blue highlight-mark"
                                class="text-base leading-tight text-tb-black"
                                >{{ item._source.title }}</text-highlight
                              >
                            </div>
                            <div
                              class="col-span-1"
                              :class="
                                keyKey == totalItemCount(1) + index
                                  ? 'block'
                                  : 'hidden'
                              "
                            >
                              <div
                                class="flex w-full h-full justify-end items-center"
                              >
                                <img src="~/assets/images/return.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="py-1">
                  <p
                    v-if="dataLength[2]"
                    class="text-base ml-6 text-tb-blue font-normal"
                  >
                    Manufacturer
                  </p>
                  <div class="pr-4 mt-2">
                    <div
                      v-for="(item, index) in searchResult.hersteller"
                      :key="index"
                      :id="`child${totalItemCount(2) + index}`"
                      :data-target-url="`/man/${item._source.url}/`"
                    >
                      <div>
                        <div
                          class="h-px ml-5"
                          :class="
                            index != 0 && !item.hideBorder
                              ? 'bg-white'
                              : 'bg-transparent'
                          "
                        ></div>
                        <div
                          class="-mr-1 rounded-r border-l-2 group cursor-pointer"
                          @click="closeAndPush(`/man/${item._source.url}/`)"
                          @mouseover="checkHoverOn(2, index)"
                          @mouseout="checkHoverOut(2, index)"
                          :class="
                            keyKey == totalItemCount(2) + index
                              ? 'border-tb-blue bg-white'
                              : 'border-transparent'
                          "
                        >
                          <div
                            class="pr-5 pl-5 py-2 grid grid-cols-10 gap-2 xl:gap-3 h-12"
                          >
                            <!-- <div v-if="!item.hideSecond" class="col-span-2">
														<div
															class="flex h-16 py-1 justify-center items-center"
														>
															<img
																v-if="!item.showFirst"
																:src="
																	`https://producer.testbericht.de/${item._source.url}.svg`
																"
																class="max-w-full max-h-full"
																@error="$set(item, 'showFirst', true)"
															/>
															<img
																v-else
																:src="
																	`https://producer.testbericht.de/${item._source.url}.png`
																"
																class="max-w-full max-h-full"
																@error="$set(item, 'hideSecond', true)"
															/>
														</div>
													</div> -->
                            <!-- <div
														class="flex items-center"
														:class="
															!item.hideSecond ? 'col-span-7' : 'col-span-9'
														"
													> -->
                            <div class="flex items-center col-span-9">
                              <text-highlight
                                :queries="searchKeywords"
                                :caseSensitive="false"
                                highlightClass="text-tb-blue highlight-mark"
                                class="text-base leading-tight text-tb-black"
                                >{{ item._source.title }}</text-highlight
                              >
                            </div>
                            <div
                              class="col-span-1"
                              :class="
                                keyKey == totalItemCount(2) + index
                                  ? 'block'
                                  : 'hidden'
                              "
                            >
                              <div
                                class="flex w-full h-full justify-end items-center"
                              >
                                <img src="~/assets/images/return.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="py-1">
                  <p
                    v-if="dataLength[3]"
                    class="text-base ml-6 text-tb-blue font-normal"
                  >
                    Popular Searches
                  </p>
                  <div class="pr-4">
                    <div
                      v-for="(item, index) in searchResult.popularSearch"
                      :key="index"
                      :id="`child${totalItemCount(3) + index}`"
                      :data-target-url="`${item._source.url}/`"
                    >
                      <div>
                        <div
                          class="h-px ml-5"
                          :class="
                            index != 0 && !item.hideBorder
                              ? 'bg-white'
                              : 'bg-transparent'
                          "
                        ></div>
                        <div
                          @click="closeAndPush(`${item._source.url}/`)"
                          class="highlight-field -mr-1 rounded-r border-l-2 group cursor-pointer pl-5 h-12 flex items-center"
                          @mouseover="checkHoverOn(3, index)"
                          @mouseout="checkHoverOut(3, index)"
                          :class="
                            keyKey == totalItemCount(3) + index
                              ? 'border-tb-blue bg-white'
                              : 'border-transparent'
                          "
                        >
                          <text-highlight
                            :queries="searchKeywords"
                            :caseSensitive="false"
                            highlightClass="text-tb-blue highlight-mark"
                            >{{ item._source.title }}</text-highlight
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="!isPanelLoading"
                class="col-span-8 pl-1 pr-4 xl:pr-5 h-full overflow-y-auto nice-scroll"
              >
                <div class="bg-white ml-px rounded">
                  <div class="px-4 py-6">
                    <div class="grid grid-cols-3 gap-4 xl:gap-6">
                      <div class="col-span-2">
                        <div class="grid grid-cols-4 gap-2 items-end">
                          <div class="col-span-3 pb-1">
                            <div class="flex items-center">
                              <div class="text-xs text-tb-primary-dark">
                                From:
                              </div>
                              <div class="pl-3">
                                <vue-intl-numberformat
                                  locale="de"
                                  formatStyle="currency"
                                  currency="EUR"
                                  :number="
                                    parseFloat(productInfo.min_price || 0)
                                  "
                                  class="text-22 text-tb-black font-normal"
                                ></vue-intl-numberformat>
                                -
                                <vue-intl-numberformat
                                  locale="de"
                                  formatStyle="currency"
                                  currency="EUR"
                                  :number="
                                    parseFloat(productInfo.max_price || 0)
                                  "
                                  class="text-22 text-tb-black font-normal"
                                ></vue-intl-numberformat>
                              </div>
                            </div>
                            <div class="flex items-center mt-2">
                              <div class="text-xs text-tb-primary-dark">
                                Share to:
                              </div>
                              <div class="pl-3 flex gap-4">
                                <img
                                  src="~/assets/images/social/facebook.svg"
                                  class="h-6 w-6"
                                  alt
                                />
                                <img
                                  src="~/assets/images/social/twitter.svg"
                                  class="h-6 w-6"
                                  alt
                                />
                                <img
                                  src="~/assets/images/social/instagram.svg"
                                  class="h-6 w-6"
                                  alt
                                />
                                <img
                                  src="~/assets/images/social/pinterest.svg"
                                  class="h-6 w-6"
                                  alt
                                />
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-center items-center">
                            <div class="relative badge-wrapper">
                              <img
                                src="~/assets/images/badge-frame.svg"
                                class="absolute top-0 left-0 max-h-full max-w-full z-0"
                                alt=""
                              />
                              <div class="relative">
                                <div
                                  class="text-center text-xs mt-4 text-tb-black"
                                >
                                  {{ productInfo.tests || 0 }}
                                  Tests
                                </div>
                                <div
                                  class="text-white font-normal text-lg text-center leading-3 mt-px"
                                >
                                  {{ productInfo.score || 0 }}/100
                                </div>
                                <div
                                  class="text-white text-xs text-center pb-px"
                                >
                                  {{ productInfo.testNoteText }}
                                </div>
                                <div
                                  class="rounded bg-white border border-tb-blue flex justify-center site-logo-badge-frame items-center mx-auto mt-px pt-px"
                                >
                                  <img
                                    src="~/assets/images/site-logo.svg"
                                    class="w-11/12"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="grid grid-cols-12 gap-1 bg-tb-primary h-8 py-px rounded mt-2"
                        >
                          <div
                            class="col-span-2 rounded flex items-center justify-center text-base text-white font-normal"
                            :class="classBg(productInfo.eek || '')"
                          >
                            {{ productInfo.eek || "" }}
                          </div>
                          <div class="col-span-4 py-1">
                            <div
                              class="h-full flex items-center justify-center border-r border-white text-tb-primary-dark text-xs"
                            >
                              {{ productInfo.score || 0 }}/100 ({{
                                productInfo.tests || 0
                              }}
                              Tests)
                            </div>
                          </div>
                          <div class="col-span-3 py-1">
                            <div
                              class="h-full flex items-center justify-center text-tb-primary-dark text-xs"
                            >
                              {{ productInfo.offers_count || 0 }}
                              offers
                            </div>
                          </div>
                          <div
                            class="col-span-3 rounded bg-tb-blue flex items-center justify-center text-white text-xs"
                          >
                            {{ productInfo.testNoteText || "" }}
                          </div>
                        </div>
                      </div>
                      <div class="flex items-end">
                        <div>
                          <div class="flex items-center">
                            <img src="~/assets/images/subscribe.svg" alt="" />
                            <div class="ml-1 text-base text-tb-blue underline">
                              Subscribe to this Product
                            </div>
                          </div>
                          <div class="h-20 py-px mt-1">
                            <div class="grid grid-cols-7 h-full py-px">
                              <div
                                class="col-span-3 rounded border border-tb-primary-dark flex flex-col justify-center items-center cursor-pointer"
                              >
                                <img
                                  src="~/assets/images/pricealarm.svg"
                                  alt=""
                                />
                                <div class="text-xs text-tb-primary-dark mt-1">
                                  Price alarm
                                </div>
                              </div>
                              <div></div>
                              <div
                                class="col-span-3 rounded bg-tb-primary flex flex-col justify-center items-center"
                              >
                                <div
                                  class="text-32 text-tb-orange mt-1 font-normal leading-4"
                                >
                                  {{
                                    parseFloat(productInfo.mark || 0).toFixed(1)
                                  }}
                                </div>
                                <div class="flex justify-center -mb-px">
                                  <star-rating
                                    :rating="parseFloat(productInfo.mark || 0)"
                                    :increment="0.1"
                                    :read-only="true"
                                    :show-rating="false"
                                    :star-size="10"
                                    active-color="#FF7000"
                                    glow-color="#00000000"
                                    :padding="1"
                                    :inline="true"
                                  ></star-rating>
                                </div>
                                <div
                                  class="text-xs text-center underline text-tb-primary-dark -mt-px"
                                >
                                  Write a review
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        productInfo.popularOffers &&
                        productInfo.popularOffers.length
                      "
                      class="mt-5"
                    >
                      <div class="rounded border border-tb-primary-dark p-5">
                        <div class="p-2">
                          <div class="flex justify-between">
                            <div class="text-base font-normal text-tb-black">
                              Popular offers
                            </div>
                            <div
                              class="text-base underline text-tb-primary-dark"
                            >
                              More details
                            </div>
                          </div>
                          <div>
                            <div
                              v-for="(
                                item, index
                              ) in productInfo.popularOffers.slice(0, 3)"
                              :key="index"
                              class="grid grid-cols-9 gap-1 py-4 border-b border-tb-border last:border-transparent"
                            >
                              <div class="col-span-2">
                                <div>
                                  <vue-intl-numberformat
                                    locale="de"
                                    formatStyle="currency"
                                    currency="EUR"
                                    :number="parseFloat(item.price)"
                                    class="text-22 text-tb-blue font-normal leading-tight"
                                  ></vue-intl-numberformat>
                                </div>
                                <div class="flex text-xs text-tb-primary-dark">
                                  Shipping:
                                  <vue-intl-numberformat
                                    locale="de"
                                    formatStyle="currency"
                                    currency="EUR"
                                    :number="parseFloat(item.shipping)"
                                    class="ml-1"
                                  ></vue-intl-numberformat>
                                </div>
                              </div>
                              <div class="col-span-2 flex items-center">
                                <img
                                  :src="
                                    require(`~/assets/images/${
                                      item.availability == 'Available'
                                        ? 'shipping-green'
                                        : 'shipping-yellow'
                                    }.svg`)
                                  "
                                  alt=""
                                />
                                <div class="ml-2 text-xs text-tb-primary-dark">
                                  {{ item.availability }}
                                </div>
                              </div>
                              <div class="col-span-2 flex items-center">
                                <div
                                  class="w-full h-8 flex justify-end items-center"
                                >
                                  <img
                                    :src="`
                                  ${siteImgGoogle}shops/${item.shopLogo}`"
                                    class="max-w-full max-h-full"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div
                                class="col-span-3 flex items-center justify-end"
                              >
                                <a
                                  :href="item.shopAddress"
                                  target="_blank"
                                  class="main-button px-6 xl:px-8"
                                >
                                  Go to the store
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-6 grid grid-cols-2 gap-4 xl:gap-5">
                      <div
                        v-if="productInfo.up && productInfo.up.length"
                        class="rounded bg-tb-white-green px-5 py-8"
                      >
                        <div
                          v-for="(item, index) in productInfo.up"
                          :key="index"
                          class="flex items-start"
                        >
                          <img
                            src="~/assets/images/thumbup.svg"
                            class="mt-1"
                            alt=""
                          />
                          <div
                            class="text-base text-tb-black ml-4 leading-7 -mt-px"
                          >
                            {{ item }}
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="productInfo.down && productInfo.down.length"
                        class="rounded bg-tb-white-pink px-5 py-8"
                      >
                        <div
                          v-for="(item, index) in productInfo.down"
                          :key="index"
                          class="flex items-start"
                        >
                          <img
                            src="~/assets/images/thumbdown.svg"
                            class="mt-1"
                            alt=""
                          />
                          <div
                            class="text-base text-tb-black ml-4 leading-7 -mt-px"
                          >
                            {{ item }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </client-only></transition
      >
    </div>
  </div>
</template>

<script>
import { SITE_IMG_GOOGLE } from "@/common/constant";
import {
  getProductsBySearch,
  getCategoriesBySearch,
  getProducersBySearch,
  getPricesBySearch,
  getKeywordsBySearch,
} from "@/services/service";
import { mapActions } from "vuex";
export default {
  name: "SearchLightbox",
  data() {
    return {
      searchText: "",
      isInputFocus: true,
      expandResult: false,
      siteImgGoogle: SITE_IMG_GOOGLE,
      keyKey: 0,
      isPanelLoading: false,
      dataLength: [0, 0, 0, 0],
      searchKeywords: [],
      searchResult: {
        products: [],
        category: [],
        hersteller: [],
        popularSearch: [],
      },
      groupNamesArr: ["products", "category", "hersteller", "popularSearch"],
      productInfo: {
        min_price: "0",
        max_price: "0",
        offers_count: 0,
        tests: 6,
        eek: "B",
        score: 0,
        testNoteText: "",
        mark: "0",
        popularOffers: [
          {
            shopName: "",
            shopLogo: "2412.png",
            price: "0",
            shipping: "0",
            shopAddress: "",
            availability: "",
          },
          {
            shopName: "",
            shopLogo: "2412.png",
            price: "0",
            shipping: "0",
            shopAddress: "",
            availability: "",
          },
        ],
        up: [
          "tolles Display",
          "ordentlicher Stereo-Sound",
          "gute Kameraqualität",
        ],
        down: [],
      },
    };
  },
  watch: {
    searchText: {
      deep: true,
      immediate: false,
      handler: function () {
        if (!this.searchText.length) {
          this.expandResult = false;
          this.isPanelLoading = true;
          this.searchKeywords = [];
          this.searchResult = {
            products: [],
            category: [],
            hersteller: [],
            popularSearch: [],
          };
          return;
        }
        this.searchKeywords = this.searchText.split(" ");
        this.getSearchData();
      },
    },
    keyKey: {
      deep: false,
      immediate: false,
      handler: function (val) {
        if (
          !this.searchResult.products.length ||
          this.keyKey > this.dataLength[0] - 1
        )
          return;
        this.getRightPanelData(val);
      },
    },
  },
  mounted() {
    document.getElementsByTagName("BODY")[0].classList.add("overflow-hidden-i");

    document.addEventListener("keydown", this.checkKey);

    this.$refs.searchInput.focus();
  },
  beforeDestroy() {
    document
      .getElementsByTagName("BODY")[0]
      .classList.remove("overflow-hidden-i");

    document.removeEventListener("keydown", this.checkKey);
  },
  methods: {
    ...mapActions("search", ["getProductById"]),
    totalItemCount(groupId) {
      let countVal = 0;
      for (let index = 0; index < groupId; index++) {
        const element = this.dataLength[index];
        countVal += element;
      }
      return countVal;
    },
    checkKey({ keyCode }) {
      if (keyCode == 13) {
        let activeChild = document.getElementById(`child${this.keyKey}`);
        let targetUrl = activeChild.getAttribute("data-target-url");
        this.closeAndPush(targetUrl);
      }
      if (!this.expandResult || (keyCode != 38 && keyCode != 40)) return;
      if (keyCode == 38) {
        this.keyKey =
          this.keyKey == 0 ? this.totalItemCount(4) - 1 : this.keyKey - 1;
      } else {
        this.keyKey =
          this.keyKey == this.totalItemCount(4) - 1 ? 0 : this.keyKey + 1;
      }
      // this.$refs.searchInput.blur();
      let sideScroller = this.$refs.sideScroller;
      let activeChild = document.getElementById(`child${this.keyKey}`);
      let outTop =
        activeChild.getBoundingClientRect().top -
        sideScroller.getBoundingClientRect().top;
      let outBottom =
        sideScroller.getBoundingClientRect().bottom -
        activeChild.getBoundingClientRect().bottom;
      if (outTop < 0 || outBottom < 0) {
        activeChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    checkHoverOn(groupId, index) {
      let groupName = this.groupNamesArr[groupId];
      this.$set(this.searchResult[groupName][index], "hideBorder", true);
      if (index < this.searchResult[groupName].length - 1)
        this.$set(this.searchResult[groupName][index + 1], "hideBorder", true);
      this.keyKey = this.totalItemCount(groupId) + index;
    },
    checkHoverOut(groupId, index) {
      let groupName = this.groupNamesArr[groupId];
      this.$set(this.searchResult[groupName][index], "hideBorder", false);
      if (index < this.searchResult[groupName].length - 1)
        this.$set(this.searchResult[groupName][index + 1], "hideBorder", false);
    },
    closeAndPush(url) {
      this.$router.push({ path: url });
      this.$emit("close");
    },
    getSearchData() {
      // this.dataLength = [0, 0, 0, 0];
      let searchTextCpy = this.searchText;
      getProductsBySearch(searchTextCpy).then(
        (res) => {
          if (searchTextCpy != this.searchText) return;
          this.searchResult.products = res.hits.hits;
          this.$set(this.dataLength, 0, res.hits.hits.length);
          this.keyKey = 0;
          if (this.searchResult.products.length) {
            this.getRightPanelData(this.keyKey);
          }
          getCategoriesBySearch(searchTextCpy).then(
            (response) => {
              this.searchResult.category = response.hits.hits;
              this.$set(this.dataLength, 1, response.hits.hits.length);
            },
            (err) => console.log(err)
          );

          getProducersBySearch(searchTextCpy).then(
            (response) => {
              this.searchResult.hersteller = response.hits.hits;
              this.$set(this.dataLength, 2, response.hits.hits.length);
            },
            (err) => console.log(err)
          );

          getKeywordsBySearch(searchTextCpy).then((response) => {
            this.searchResult.popularSearch = response.hits.hits;
            this.$set(this.dataLength, 3, response.hits.hits.length);
          });
          this.expandResult = true;
          for (
            let index = 0;
            index < this.searchResult.products.length;
            index++
          ) {
            let element = this.searchResult.products[index];
            getPricesBySearch(element._source.id).then((result) => {
              element.price = parseFloat(result.hits.hits[0]._source.price);
              this.$set(this.searchResult.products, index, element);
            });
          }
        },
        (err) => {
          console.log(err);
          this.expandResult = true;
        }
      );
    },
    async getRightPanelData(val) {
      let productID = this.searchResult.products[val]._source.id;
      if (!productID) return;
      let result = await this.getProductById(productID);
      Object.assign(this.productInfo, result.data);
      this.isPanelLoading = false;
    },
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
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: 0.1s;
  transition-delay: 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.search-box-container {
  max-width: 1100px;
}
.shadow-custom {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
}
.badge-wrapper {
  height: 87px;
  width: 87px;
}
.site-logo-badge-frame {
  width: 78px;
  height: 14px;
}
.text-32 {
  font-size: 2rem;
}
</style>
