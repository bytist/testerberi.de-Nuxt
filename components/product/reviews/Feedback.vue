<template>
  <div id="feedback">
    <div class="pt-4 pb-5 border-b border-tb-border relative">
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
      <client-only>
        <StarRating
          v-bind:rating="data.rating"
          v-bind:read-only="true"
          v-bind:show-rating="false"
          v-bind:star-size="15"
          active-color="#FF7000"
          glow-color="#00000000"
          v-bind:padding="1"
          v-bind:increment="0.1"
        ></StarRating>
      </client-only>
      <p class="font-normal text-tb-black">{{ data.title }}</p>
      <p class="text-xs text-tb-primary-dark flex items-center mt-1">
        <span class="flex items-center">
          <img src="~/assets/images/user.svg" alt />
          <span class="ml-1 mt-px">{{ data.client }}</span>
        </span>
        <span class="flex items-center ml-3">
          <img src="~/assets/images/calender.svg" alt />
          <span class="ml-1 mt-px"
            >{{
              newDate.toLocaleString("default", {
                month: "short",
              })
            }}
            {{ newDate.getFullYear() }}</span
          >
        </span>
      </p>
      <p class="text-tb-black mt-2">
        {{ data.feedback }}
      </p>
      <p class="text-tb-primary-dark text-xs mt-1 cursor-pointer">
        Rezension auf
        <a :href="data.reviewLink" target="_blank" class="underline"
          >{{ data.shopName }} zu</a
        >
        Ende lesen.
      </p>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
import { mapGetters } from "vuex";
export default {
  name: "Feedback",
  components: {
    ContentLoader,
  },
  props: ["data"],
  data() {
    return {
      newDate: new Date(this.data.date),
      showFull: false,
    };
  },
  computed: {
    ...mapGetters({
      productLoading: "productData/productLoading",
    }),
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler: function () {
        this.newDate = new Date(this.data.date);
      },
    },
  },
};
</script>

<style scoped>
</style>