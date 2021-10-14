<template>
  <div class="bg-tb-primary py-5 px-4 xl:px-8 rounded">
    <p class="text-base text-tb-black mb-4 font-normal">PCgo (1146 Tests)</p>
    <div
      v-for="(item, index) in testData"
      :key="index"
      class="
        rounded
        bg-white
        py-4
        xl:py-6
        px-4
        xl:px-6
        mb-8
        cursor-pointer
        transition
        duration-200
        hover:tb-shadow-1
      "
    >
      <div class="grid grid-cols-7 gap-4 xl:gap-6">
        <div
          class="flex col-span-2 justify-center items-center h-40 xl:h-48 py-1"
        >
          <img
            :src="require(`~/assets/images/product/` + item.thumbnail)"
            class="max-h-full max-w-full"
            alt=""
          />
        </div>
        <div class="col-span-5 py-1">
          <div class="flex justify-between items-center pb-px mb-2">
            <div class="flex items-stretch">
              <div class="h-10 w-10 mr-px relative">
                <client-only>
                  <PercentageCircle
                    :percent="item.percentage"
                    size="medium"
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
                </client-only>
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
                    class="text-sm font-normal"
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
              <div class="flex flex-col justify-between ml-2 pl-px">
                <span class="text-tb-black font-normal text-base leading-4">{{
                  item.title
                }}</span>
                <span class="text-xs text-tb-primary-dark">
                  {{ item.points }}
                  {{
                    item.totalPoints
                      ? `von ` + item.totalPoints + ` Punkten`
                      : `Punkte`
                  }}
                  {{ `- ` + item.status }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-22 font-normal text-tb-blue leading-6">
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
                {{ item.offer }}
                {{ item.offer > 1 ? `Angebote` : `Angebot` }}
              </p>
            </div>
          </div>
          <div class="pt-px text-base text-tb-black leading-5 mb-2">
            {{ item.description }}
          </div>
          <p class="text-base text-tb-primary-dark">
            &bull; <span class="ml-1">{{ item.compare }}</span>
          </p>
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
  name: "TestDataBox",
  data() {
    return {
      pageNum: 11,
    };
  },
  props: {
    testData: {
      type: Array,
    },
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

<style scoped>
.circle-inner-wrapper {
  top: 0.125rem;
  left: 0.125rem;
  height: 2.25rem;
  width: 2.25rem;
}
.circle-outer-wrapper {
  transform-origin: 0% 0%;
  transform: scale(0.8);
}
</style>