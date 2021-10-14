<template>
  <div id="customer-review-list">
    <div
      v-for="(item, index) in showMore ? data : data.slice(0, 5)"
      :key="index"
    >
      <hr>
      <div
        class="
          py-5
          flex
          justify-between
          items-stretch
          last:border-transparent
          last:pb-4
          relative
        "
      >
        <div
          v-if="productLoading"
          class="absolute top-0 left-0 h-full w-full bg-white py-3"
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
        <div
          :class="!item.percentage && 'invisible'"
          class="h-24 flex items-center"
        >
          <div class="relative mt-1">
            <PercentageCircle
              :percent="item.percentage"
              size="large"
              class="circle-outer-wrapper"
              :class="
                item.percentage > 80
                  ? `verygood`
                  : item.percentage > 60
                  ? `good`
                  : item.percentage > 40
                  ? `fine`
                  : item.percentage > 20
                  ? `notbad`
                  : `bad`
              "
            />
            <div
              class="
                absolute
                bg-white
                circle-inner-wrapper
                rounded-full
                box-border
                flex
                justify-center
                items-center
              "
            >
              <span
                class="text-lg font-normal"
                :class="
                  item.percentage > 80
                    ? `text-tb-green`
                    : item.percentage > 60
                    ? `text-tb-limegreen`
                    : item.percentage > 40
                    ? `text-tb-yellow`
                    : item.percentage > 20
                    ? `text-tb-orange`
                    : `text-tb-red`
                "
                >{{ item.percentage }}%</span
              >
            </div>
          </div>
        </div>
        <div class="w-32 xl:w-40 h-24 flex items-center">
          <v-lazy-image
            :src="item.logo"
            :key="item.logo"
            alt
            class="max-h-full max-w-full"
          />
        </div>
        <div class="w-2/3">
          <p class="font-normal text-tb-black">
            {{ item.expression }}
          </p>
          <div class="flex items-center text-xs text-tb-primary-dark mt-1">
            <span class="flex items-center">
              <img src="~/assets/images/calender.svg" class="-mt-px" alt />
              <span class="ml-1">{{ item.date }}</span>
            </span>
            <NuxtLink
              v-if="item.link"
              v-bind:to="item.link.url"
              class="flex items-center ml-3"
            >
              <img src="~/assets/images/link.svg" class="-mt-px" alt />
              <span class="ml-1">{{ item.link.text }}</span>
            </NuxtLink>
            <span
              v-if="item.video.length"
              @click="openLightBoxGallery(item.video)"
              class="flex items-center ml-3 cursor-pointer"
            >
              <img src="~/assets/images/play.svg" class="-mt-px" alt />
              <span class="ml-1">Video</span>
            </span>
            <span v-if="item.overall" class="flex items-center ml-3">
              <img src="~/assets/images/trophy.svg" class="-mt-px" alt />
              <span class="ml-1"
                >{{ item.placement }} von {{ item.overall }}</span
              >
            </span>
          </div>
          <p class="mt-3 text-tb-black leading-snug">
            &#8222;{{ item.text }}&#8220;
          </p>
          <div>
            <div class="flex justify-between flex-wrap">
              <div v-if="item.pros[0].length" class="w-1/2 xl:w-5/12 mt-4">
                <div
                  v-for="(thumb, id) in item.pros.slice(
                    0,
                    dataFoldArray.includes(index) ? breakPoint(item.pros) : 3
                  )"
                  :key="id"
                  class="flex items-start"
                >
                  <img src="~/assets/images/thumbup.svg" class="mt-1" alt />
                  <span class="ml-3 text-tb-primary-dark"> {{ thumb }}</span>
                </div>
              </div>
              <div
                v-if="item.pros[0].length && item.pros.length > 1"
                class="w-1/2 xl:w-5/12 mt-4"
              >
                <div
                  v-for="(thumb, id) in item.pros.slice(
                    breakPoint(item.pros),
                    dataFoldArray.includes(index)
                      ? item.pros.length
                      : breakPoint(item.pros) + 3
                  )"
                  :key="id"
                  class="flex items-start"
                >
                  <img src="~/assets/images/thumbup.svg" class="mt-1" alt />
                  <span class="ml-3 text-tb-primary-dark">{{ thumb }}</span>
                </div>
              </div>
              <div
                v-if="item.cons[0].length && dataFoldArray.includes(index)"
                class="w-1/2 xl:w-5/12 mt-4"
              >
                <div
                  v-for="(thumb, id) in item.cons.slice(
                    0,
                    breakPoint(item.cons)
                  )"
                  :key="id"
                  class="flex items-start"
                >
                  <img src="~/assets/images/thumbdown.svg" class="mt-1" alt />
                  <span class="ml-3 text-tb-primary-dark">{{ thumb }}</span>
                </div>
              </div>
              <div
                v-if="item.cons[0].length && dataFoldArray.includes(index)"
                class="w-1/2 xl:w-5/12 mt-4"
              >
                <div
                  v-for="(thumb, id) in item.cons.slice(
                    breakPoint(item.cons),
                    item.cons.length
                  )"
                  :key="id"
                  class="flex items-start"
                >
                  <img src="~/assets/images/thumbdown.svg" class="mt-1" alt />
                  <span class="ml-3 text-tb-primary-dark">{{ thumb }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="item.marks.length && dataFoldArray.includes(index)"
              class="flex justify-between mt-4"
            >
              <ul
                class="
                  w-1/2
                  xl:w-5/12
                  list-disc list-inside
                  text-tb-primary-dark
                  pl-2
                "
              >
                <li
                  v-for="(thumb, id) in item.marks.slice(
                    0,
                    breakPoint(item.marks)
                  )"
                  :key="id"
                >
                  {{ thumb }}
                </li>
              </ul>
              <ul
                class="
                  w-1/2
                  xl:w-5/12
                  list-disc list-inside
                  text-tb-primary-dark
                  pl-2
                "
              >
                <li
                  v-for="(thumb, id) in item.marks.slice(
                    breakPoint(item.marks),
                    item.marks.length
                  )"
                  :key="id"
                >
                  {{ thumb }}
                </li>
              </ul>
            </div>
            <div
              v-if="!dataFoldArray.includes(index)"
              class="
                text-tb-blue text-base
                underline
                flex
                justify-center
                cursor-pointer
              "
            >
              <span class="flex" @click="dataFoldArray.push(index)">
                <img
                  src="~/assets/images/circle-arrow-right.svg"
                  class="mr-1 transform rotate-90 h-4"
                  alt=""
                />
                Show More Info
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="data.length > 5"
      @click="showMore = !showMore"
      class="
        text-tb-blue text-base
        underline
        flex
        justify-center
        cursor-pointer
      "
    >
      <img
        src="~/assets/images/circle-arrow-right.svg"
        class="mr-1 transform rotate-90 h-4"
        alt=""
      />
      Show All {{ data.length }} Info
    </div>
    <transition name="fade">
      <ProductLightbox
        v-if="openProductGallery"
        :active-video="activeVideo"
        @close="openProductGallery = false"
      />
    </transition>
  </div>
</template>

<script>
import ProductLightbox from "@/components/product/ProductLightbox";
import { mapState, mapGetters } from "vuex";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "CustomerReviewList",
  components: { ContentLoader, ProductLightbox },
  data() {
    return {
      openProductGallery: false,
      activeVideo: "",
      showMore: false,
      dataFoldArray: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.productData.consumerMagazine.customerFeedback,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
    }),
  },
  watch: {
    data: {
      deep: true,
      immediate: false,
      handler: function (val) {
        this.dataFoldArray = [];
        val.forEach((item, index) => {
          if (item.pros.length < 7) this.dataFoldArray.push(index);
        });
      },
    },
  },
  methods: {
    breakPoint(array) {
      return (array.length + 1) / 2;
    },
    openLightBoxGallery(vid) {
      this.activeVideo = vid;
      this.openProductGallery = true;
    },
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.circle-inner-wrapper {
  top: 0.125rem;
  left: 0.125rem;
  height: 4.125rem;
  width: 4.125rem;
}
.circle-outer-wrapper {
  transform-origin: 0% 0%;
  transform: scale(0.875);
}
</style>
