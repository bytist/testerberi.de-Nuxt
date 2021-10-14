<template>
  <div id="producer-page-component">
    <div class="producer-page px-3 pt-2 mb-12">
      <div class="container mx-auto">
        <Breadcrumb :link-array="linkData" />
        <div class="mt-6">
          <div class="mb-4">
            <p class="text-22 text-tb-black font-normal">
              {{ $route.params.producer }}
            </p>
            <p class="text-xs text-tb-primary-dark">(1-36 von 1.997)</p>
          </div>
          <div>
            <div class="grid grid-cols-4 gap-4 xl:gap-6">
              <div>
                <FilterSidebar
                  :data="filterData"
                  @handleCheckedChange="handleCheckedChange"
                />
              </div>
              <div class="col-span-3">
                <div class="p-4 xl:p-6 rounded bg-tb-primary">
                  <div class="grid grid-cols-3 gap-4 xl:gap-6">
                    <ProductCard
                      v-for="item in productsArray"
                      :key="JSON.stringify(item)"
                      :item="item"
                      class="
                        transition
                        duration-200
                        hover:tb-shadow-1
                        bg-white
                        hover:z-10
                        rounded
                      "
                    />
                  </div>
                  <client-only>
                    <Paginate
                      v-model="pageNumber"
                      :page-count="totalPageCount"
                      :page-range="5"
                      :page-link-class="'text-xl w-8 mx-px text-center outline-none'"
                      :margin-pages="0"
                      :prev-link-class="
                        'mr-5 producer-product-pagination-arrow producer-product-pagination-prev outline-none transform rotate-180' +
                        (totalPageCount < 6 ? ' hidden' : '')
                      "
                      :next-link-class="
                        'ml-5 producer-product-pagination-arrow producer-product-pagination-next outline-none' +
                        (totalPageCount < 6 ? ' hidden' : '')
                      "
                      :active-class="'text-tb-blue'"
                      :disabled-class="'invisible'"
                      :break-view-link-class="'hidden'"
                      :no-li-surround="true"
                      :click-handler="myCallback"
                      :prev-text="''"
                      :next-text="''"
                      :container-class="'flex justify-center items-center text-tb-primary-dark'"
                      class="mt-5"
                    />
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/widget/Breadcrumb";

import FilterSidebar from "@/components/producer/FilterSidebar";
import ProductCard from "@/components/widget/ProductCard";

import { getProductsByProducer } from "@/services/service";

export default {
  name: "Producer",
  scrollToTop: true,
  components: {
    Breadcrumb,
    FilterSidebar,
    ProductCard,
  },
  data() {
    return {
      linkData: [
        {
          url: "/",
          label: this.$route.params.producer,
        },
      ],
      productsArray: [],
      pageNumber: 1,
      totalPageCount: 1,
      filterData: [],
      filterArray: [],
    };
  },
  watch: {
    "$route.params": {
      deep: true,
      immediate: false,
      handler: function () {
        this.pageNumber = 1;
        this.getProducts([]);
        this.linkData = [
          {
            url: "/",
            label: this.$route.params.producer,
          },
        ];
      },
    },
  },
  created() {
    this.getProducts("");
  },
  updated() {
    var paginateNavPrev = this.$el.querySelector(
      ".producer-product-pagination-prev"
    );
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
    var paginateNavNext = this.$el.querySelector(
      ".producer-product-pagination-next"
    );
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
    myCallback(pageNum) {
      this.pageNumber = pageNum;
      this.getProducts(this.filterArray);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    handleCheckedChange(dataArray) {
      this.filterArray = dataArray;
      this.pageNumber = 1;
      this.getProducts(dataArray);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    getProducts(filters) {
      let url = this.$route.params.producer + "/" + this.pageNumber;
      if (filters.length) {
        url += "?filter=";
        for (let index = 0; index < filters.length; index++) {
          const element = filters[index];
          url += `${index == 0 ? "" : ","}${element}`;
        }
      }
      getProductsByProducer(url).then((res) => {
        let prodArray = [];
        if (!filters.length) {
          let filterArr = [];
          for (const key in res.contentFilter.filter) {
            if (Object.hasOwnProperty.call(res.contentFilter.filter, key)) {
              const element = res.contentFilter.filter[key];
              filterArr.push(element);
            }
          }
          this.filterData = filterArr;
        }
        res.contentProdukte.forEach((element) => {
          prodArray.push({
            name: element.produktName,
            link: element.produktLink.substring(
              element.produktLink.lastIndexOf("/") + 1
            ),
            thumbnail: element.produktBildURL,
            class: element.eek,
            percentage: element.score,
            tests: element.anzahlTests,
            color: element.circleColor,
            size: 138,
            width: 3840,
            height: 2160,
            tags: ["HDR", "OLED"],
            price: parseInt(element.produktPreis),
            rate: element.anzahlSterne,
            rateCount: element.anzahlMeinungen,
            events: element.anzahlAngebote,
          });
        });
        this.productsArray = prodArray;
        this.pageNumber = res.pageNumber;
        this.totalPageCount = res.totalPageCount;
      });
    },
  },
};
</script>

<style>
</style>