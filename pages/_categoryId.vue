<template>
  <div id="Category">
    <div class="category-page px-3 pt-2 mb-12">
      <div class="container mx-auto">
        <Breadcrumb :link-array="linkData" />
        <div v-if="loadDone" class="products-navigation-wrapper mt-6">
          <div v-if="productFlag">
            <div
              class="products-navigation-header-wrapper flex justify-between items-center mb-4"
            >
              <div class="products-header-left-wrapper">
                <p
                  class="category-product-label text-22 text-tb-black font-normal capitalize"
                >
                  {{ linkData[0].label }} Test
                </p>
                <p class="text-xs text-tb-primary-dark">
                  {{ paginationInfomation }}
                </p>
              </div>
              <div class="products-header-right-wrapper flex items-center">
                <div class="flex items-center cursor-pointer">
                  <img src="~/assets/images/subscribe.svg" alt />
                  <span class="text-tb-blue ml-px underline"
                    >Subscribe to this Category</span
                  >
                </div>
                <div
                  @mouseover="sortDropdownShow = true"
                  @mouseleave="sortDropdownShow = false"
                  class="rounded-full text-tb-primary-dark border cursor-pointer border-tb-border ml-5 pl-5 pr-6 py-3 flex justify-between items-center w-48 relative"
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
            <div class="products-wrapper flex justify-between">
              <FilterSidebar
                class="filter-sidebar"
                :filters="paginationData.filters"
                :price-range="{
                  min: paginationData.min,
                  max: paginationData.max,
                }"
                @applyPriceRange="applyPriceRange"
              />
              <ProductsPagination
                :page-data="paginationData"
                @change-page-number="changePageNumber"
                class="productsPagination"
              />
            </div>
          </div>
          <div v-else class="px-4 py-8 xl:px-5 xl:py-10 bg-tb-primary">
            <div class="mb-8 xl:mb-10">
              <p
                class="text-4xl mb-6 xl:mb-8 text-tb-black font-normal capitalize"
              >
                {{ linkData[0].label }}
              </p>
              <p class="text-xs text-22 font-normal text-tb-black">
                Categories
              </p>
            </div>

            <div class="products-wrapper flex justify-between">
              <CategoryIems :page-data="paginationData" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CategoryGuide
      v-if="loadDone && paginationData.guide"
      :data="paginationData.guide"
    />
    <NuxtChild />
  </div>
</template>

<script>
import { getSubCategories } from "@/services/service";
import Breadcrumb from "@/components/widget/Breadcrumb";
import FilterSidebar from "@/components/category/FilterSidebar";
import ProductsPagination from "@/components/category/ProductsPagination";
import CategoryIems from "@/components/category/CategoryItems";
import CategoryGuide from "@/components/category/CategoryGuide";
import categoryProducts from "@/json/categoryProducts.json";

export default {
  name: "Category",
  scrollToTop: true,
  components: {
    CategoryGuide,
    Breadcrumb,
    FilterSidebar,
    ProductsPagination,
    CategoryIems,
  },
  data() {
    return {
      sortMethods: ["Popularity", "High to Low", "Low to High", "Best Seller"],
      activeSortKey: 0,
      sortDropdownShow: false,
      linkData: [
        {
          url: "/",
          label: this.$route.params.categoryId,
        },
      ],
      paginationData: categoryProducts,
      productFlag: false,
      loadDone: false,
      currentPageNumber: 1,
      priceRange: [],
      paginationInfomation: '',
    };
  },
  watch: {
    "$route.params": {
      handler() {
        this.currentPageNumber = 1;
        this.getSubCategories();
        this.makeBreadCrumbLinkData();
        this.linkData = [
          {
            url: "/",
            label: this.$route.params.categoryId,
          },
        ];
      },
      immediate: true,
    },
    // getNavbarMenuCategory: {
    //     handler(newVal, oldVal) {
    //         if (oldVal !== undefined && oldVal !== newVal) {
    //             this.makeBreadCrumbLinkData();
    //         }
    //     },
    //     immediate: true,
    // },
  },
  methods: {
    changeSortMethod(index) {
      this.activeSortKey = index;
      this.sortDropdownShow = false;
    },
    changePageNumber(pageNum) {
      this.currentPageNumber = pageNum;
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.getSubCategories();
    },
    changePaginationInfo() {
      this.paginationInfomation = '( ' + this.paginationData.from + ' - ' + this.paginationData.to
                                + ' von ' + this.paginationData.totalProducts.toLocaleString() + ' )';
    },
    getSubCategories() {
      let url = this.$route.path;
      while (url.charAt(0) === "/") {
        url = url.substring(1);
      }
      while (url.charAt(url.length - 1) === "/") {
        url = url.slice(0, -1);
      }
      url = url
        .replace(/ /g, "-")
        // .replace(/\//g, "-")
        .replace(/,/g, "-")
        .toLowerCase();

      url = url + "/" + this.currentPageNumber;

      if (this.priceRange.length) {
        url = url + `?min=${this.priceRange[0]}&max=${this.priceRange[1]}`;
      }

      getSubCategories(url)
        .then((res) => {
          this.loadDone = true;
          if (Object.prototype.hasOwnProperty.call(res, "kategorieBoxen")) {
            this.productFlag = false;
            this.paginationData.products = [];

            res.kategorieBoxen.forEach((category) => {
              this.paginationData.products.push({
                name: category.kategorieName,
                thumbnail: category.kategorieBildLink,
                link: category.kategorieLink,
                hasSubCats: category.kategorieChildBox.length ? true : false,
                childCats: category.kategorieChildBox,
              });
            });
          } else {
            this.productFlag = true;
            const contentProdukte = res.contentProdukte;
            this.paginationData.products = [];
            this.paginationData.pageNumber = res.currentPage;
            this.paginationData.totalPages = res.maxPage;
            this.paginationData.guide = res.contentText.kategorieText;
            this.paginationData.filters = res.contentFilter.filter;
            this.paginationData.min = parseInt(res.minVal ? res.minVal : 0);
            this.paginationData.max = parseInt(res.maxVal ? res.maxVal : 10000);
            this.paginationData.totalProducts = res.totalProductCount;
            this.paginationData.from = res.currentPage == res.maxPage ?
              res.totalProductCount - res.contentProdukte.length + 1:
              res.contentProdukte.length * (res.currentPage - 1) + 1;
            if (res.contentProdukte.length == 0)
              this.paginationData.from = 0;
            this.paginationData.to = res.currentPage == res.maxPage ?
              res.totalProductCount :
              res.contentProdukte.length * res.currentPage;
            this.changePaginationInfo();

            contentProdukte.forEach((produkt) => {
              const item = {
                name: produkt.produktName,
                link: produkt.produktURL.substring(
                  produkt.produktURL.lastIndexOf("/") + 1
                ),
                thumbnail: produkt.produktBildURL,
                class: produkt.eek,
                percentage: produkt.score,
                tests: produkt.anzahlTests,
                color: produkt.circleColor,
                size: 138,
                width: 3840,
                height: 2160,
                datenblatt: produkt.datenblatt,
                tags: ["HDR", "OLED"],
                price: produkt.produktPreis ? parseFloat(produkt.produktPreis.replace(',', '')) : 0,
                rate: produkt.anzahlSterne,
                rateCount: produkt.anzahlMeinungen,
                events: produkt.anzahlAngebote,
              };

              this.paginationData.products.push(item);
            });
          }
        })
        .catch((err) => {
          console.log("Request Err: ", err);
          //   this.$router.push({ name: "PageNotFound" });
          return this.$nuxt.error({ statusCode: 404, message: err.message });
        });
    },
    makeBreadCrumbLinkData() {
      // const t = this.path(
      //     this.getNavbarMenuCategory,
      //     this.$route.params.firstId,
      //     "Testbericht.com"
      // );
    },
    path(c, name, v, currentPath, t) {
      currentPath = currentPath || "Testbericht.de";

      for (var i in c) {
        if (i == name && c[i] == v) {
          t = currentPath;
        } else if (typeof c[i] == "object") {
          return this.path(c[i], name, v, currentPath + "/" + i);
        }
      }

      return t + "/" + name;
    },
    applyPriceRange(range) {
      this.priceRange = range;
      this.changePageNumber(1);
    },
  },
};
</script>

<style>
.sortby-select {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 209px;
}
.filter-sidebar {
  width: 24%;
}
.productsPagination {
  width: 74%;
}
.dropdown-wrapper {
  top: 50px;
}
.v-lazy-image {
  opacity: 0;
  transition: opacity 0.2s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
</style>
