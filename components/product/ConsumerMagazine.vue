<template>
  <div id="consumer-magazine-component">
    <div class="relative">
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
      <p class="text-22 font-normal text-tb-black">
        LG OLED65CX9LA Test aus Verbrauchermagazinen
      </p>
    </div>
    <div class="mt-3 rounded border border-tb-primary-dark py-6 px-3 xl:p-8">
      <div
        class="flex justify-between items-stretch rounded bg-tb-primary gap-2 xl:gap-6 py-4 px-2 xl:px-6 relative"
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
        <ReviewBar class="w-full" />
        <div class="w-full rounded bg-tb-white-green py-6 px-3 xl:px-5">
          <div
            v-for="(item, index) in customerPros"
            :key="index"
            class="flex items-start"
          >
            <img src="~/assets/images/thumbup.svg" class="mt-1" alt />
            <span class="text-tb-black ml-3">{{ item }}</span>
          </div>
        </div>
        <div class="w-full rounded bg-tb-white-pink py-6 px-3 xl:px-5">
          <div
            v-for="(item, index) in customerCons"
            :key="index"
            class="flex items-start"
          >
            <img src="~/assets/images/thumbdown.svg" class="mt-1" alt />
            <span class="text-tb-black ml-3">{{ item }}</span>
          </div>
        </div>
      </div>
      <CustomerReviewList />
    </div>
  </div>
</template>

<script>
import ReviewBar from "@/components/product/ReviewBar";
import CustomerReviewList from "@/components/product/CustomerReveiwList";
import { mapGetters, mapState } from "vuex";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "ConsumerMagazine",
  components: {
    ReviewBar,
    CustomerReviewList,
    ContentLoader,
  },
  computed: {
    ...mapState({
      customerPros: (state) => state.productData.consumerMagazine.customerPros,
      customerCons: (state) => state.productData.consumerMagazine.customerCons,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
    }),
  },
};
</script>

<style></style>
