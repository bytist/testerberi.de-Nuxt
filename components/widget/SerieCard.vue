<template>
  <router-link v-if="item" :to="'/produkte/' + item.link">
    <div
      @mouseenter="hoverStart"
      @mouseleave="hoverEnd"
      class="p-2 xl:p-4 rounded overflow-hidden relative"
    >
      <div class="flex flex-col justify-between items-center">
        <div class="thumbnail-wrapper px-2 pb-3 align-middle">
          <v-lazy-image
            :src="item.thumbnail"
            class="object-contain mx-auto h-32 xl:h-40"
            alt
            @load="setLoadDone"
          />
        </div>
        <div class="detail-wrapper h-auto w-full">
          <div
            class="badge-wrapper bg-tb-primary flex items-stretch justify-between flex-1 mb-3 h-8 rounded"
          >
            <div
              v-bind:class="classBg(item.class)"
              class="class-wrapper rounded text-white font-normal w-1/5 text-center py-1"
            >
              {{ item.class }}
            </div>
            <div
              class="test-wrapper text-center text-xs flex items-center text-tb-primary-dark"
            >
              {{
                item.tests > 0
                  ? item.percentage + "/100" + " (" + item.tests + " Tests)"
                  : "No Tests"
              }}
            </div>
            <div
              class="checkout-wrapper rounded flex justify-center items-center text-white text-xs w-1/3 bg-tb-blue"
            >
              Sehr gut
            </div>
          </div>
          <div class="font-normal text-tb-black mb-1 truncate-2 h-12">
            {{ item.name }}
          </div>
          <div class="w-full flex justify-between items-center">
            <div class="price-wrapper">
              <span class="text-tb-black">ab</span>
              <span class="price-text text-22 text-tb-blue font-normal pl-1">
                <client-only>
                  <vue-intl-numberformat
                    locale="de"
                    formatStyle="currency"
                    currency="EUR"
                    :number="item.price"
                    class="font-normal"
                  ></vue-intl-numberformat></client-only
              ></span>
            </div>
            <div class="rate-wrapper">
              <client-only>
                <StarRating
                  :rating="item.rate"
                  :increment="0.1"
                  :read-only="true"
                  :show-rating="false"
                  :star-size="12"
                  active-color="#FF7000"
                  glow-color="#00000000"
                  :padding="1"
                  :inline="true"
                ></StarRating>
              </client-only>
              <span class="text-xs text-tb-primary-dark ml-1"
                >({{ item.rateCount }})</span
              >
            </div>
          </div>
          <div class="text-xs text-tb-primary-dark -mt-1">
            {{ item.events }} Angebote
          </div>
        </div>
      </div>
      <div
        v-if="!loadDone"
        class="content-load-over absolute top-0 left-0 w-full h-full bg-white"
      >
        <client-only>
          <div class="p-2 xl:p-4 h-full">
            <div class="h-32 xl:h-40 overflow-hidden rounded mb-3">
              <ContentLoader
                primaryColor="#EFF2F5"
                secondaryColor="#E5EAEE"
                :speed="1"
                height="100"
                width="190"
                class="h-32 xl:h-40 -ml-2"
              >
              </ContentLoader>
            </div>
            <div>
              <ContentLoader
                primaryColor="#EFF2F5"
                secondaryColor="#E5EAEE"
                :speed="1"
                height="300"
              >
                <rect x="0" y="0" rx="4" ry="4" height="52" class="w-full" />
                <rect x="0" y="68" rx="4" ry="4" height="46" class="w-1/2" />
              </ContentLoader>
            </div>
            <div class="flex justify-between">
              <div class="w-5/12 h-8 overflow-hidden">
                <ContentLoader
                  primaryColor="#EFF2F5"
                  secondaryColor="#E5EAEE"
                  :speed="1"
                  height="30"
                  width="150"
                  class="h-8 -ml-2"
                ></ContentLoader>
              </div>
              <div class="w-5/12 h-8 overflow-hidden">
                <ContentLoader
                  primaryColor="#EFF2F5"
                  secondaryColor="#E5EAEE"
                  :speed="1"
                  height="30"
                  width="150"
                  class="h-8 -ml-2"
                ></ContentLoader>
              </div>
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </router-link>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  name: "SerieCard",
  components: {
    ContentLoader,
  },
  props: ["item"],
  data() {
    return {
      routeData: [this.$route.params.firstId, this.$route.params.secondId],
      loadDone: false,
    };
  },
  // watch: {
  //     "item.thumbnail": {
  //         deep: true,
  //         immediate: true,
  //         handler: function () {
  //             this.loadDone = false;
  //         },
  //     },
  // },
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
    hoverStart() {
      this.$emit("hoverstart");
    },
    hoverEnd() {
      this.$emit("hoverend");
    },
    setLoadDone() {
      this.loadDone = true;
    },
  },
};
</script>

<style scoped>
.prod-card-chk-list {
  margin-left: 6px;
}
.prod-card-chk-list li span {
  position: relative;
  left: -6px;
}
.truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>