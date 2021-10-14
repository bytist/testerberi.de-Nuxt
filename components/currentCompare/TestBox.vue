<template>
  <div class="rounded bg-tb-primary py-5 px-4 xl:px-8">
    <p class="text-base text-tb-black mb-4 font-normal">PCgo (1146 Tests)</p>
    <div
      v-for="(item, index) in testInfo"
      :key="index"
      class="rounded bg-white py-4 xl:py-6 px-4 xl:px-6 mb-8"
    >
      <div class="grid grid-cols-7 gap-4 xl:gap-6">
        <div
          class="col-span-2 flex justify-center items-center h-40 xl:h-48 py-1"
        >
          <img
            :src="require(`~/assets/images/product/` + item.thumbnail)"
            class="max-h-full max-w-full"
            alt=""
          />
        </div>
        <div class="col-span-5 py-1">
          <p class="text-base font-normal text-tb-black mb-1">
            {{ item.title }}
          </p>
          <p class="text-xs text-tb-primary-dark mb-2">{{ item.date }}</p>
          <p class="text-base text-tb-black leading-5 mb-2">
            {{ item.description }}
          </p>
          <router-link class="text-tb-blue underline" to="/">mehr</router-link>
        </div>
      </div>
    </div>
    <client-only>
      <paginate
        v-model="pageNum"
        :page-count="99"
        :page-range="5"
        :page-link-class="'text-xl w-8 mx-px text-center outline-none'"
        :margin-pages="0"
        :prev-link-class="'mr-5 product-pagination-arrow product-pagination-prev outline-none transform rotate-180'"
        :next-link-class="'ml-5 product-pagination-arrow product-pagination-next outline-none'"
        :active-class="'text-tb-blue'"
        :disabled-class="'invisible'"
        :break-view-link-class="'hidden'"
        :no-li-surround="true"
        :click-handler="paginateCallback"
        :prev-text="''"
        :next-text="''"
        :container-class="'flex justify-center items-center text-tb-primary-dark'"
        class="mb-2"
      ></paginate>
    </client-only>
  </div>
</template>

<script>
export default {
  name: "TestBox",
  props: {
    testInfo: {
      type: Array,
    },
  },
  data() {
    return {
      pageNum: 11,
    };
  },
  methods: {
    paginateCallback() {
      console.log("Page");
    },
  },
  updated() {
    var paginateNavPrev = this.$el.querySelector(".product-pagination-prev");
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
    var paginateNavNext = this.$el.querySelector(".product-pagination-next");
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
};
</script>

<style>
</style>