<template>
  <div
    class="rounded h-56 p-3 xl:p-5 border border-tb-primary-dark hover:border-tb-blue transition duration-150 cursor-pointer flex flex-col justify-around relative overflow-hidden"
  >
    <div
      v-if="!loadDone"
      class="absolute top-0 left-0 w-full h-full bg-tb-primary z-10 p-3 xl:p-5 flex justify-around flex-col"
    >
      <client-only>
        <div class="h-32 overflow-hidden rounded">
          <ContentLoader
            primaryColor="#E5EAEE"
            secondaryColor="#D0D9E2"
            height="100"
            width="190"
            class="h-32 -ml-2"
            :speed="1"
          >
          </ContentLoader>
        </div>
      </client-only>
      <client-only>
        <div class="h-8 overflow-hidden rounded">
          <ContentLoader
            primaryColor="#E5EAEE"
            secondaryColor="#D0D9E2"
            height="20"
            width="190"
            class="h-8 -ml-2"
            :speed="1"
          >
          </ContentLoader>
        </div>
      </client-only>
    </div>
    <div
      v-if="item.showChildBox"
      @click="$emit('handle-item-click')"
      class="absolute h-full w-full top-0 left-0 cursor-pointer"
    >
      <div class="absolute bottom-0 left-0 h-8 w-8 pt-1 pr-1">
        <div
          class="w-full h-full border mt-px -ml-px border-tb-blue rounded-bl bg-tb-blue flex justify-center items-center"
        >
          <svg
            width="9"
            height="6.5"
            viewBox="0 0 7 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.7488 4.03747L3.7488 4.03747C3.61406 4.18751 3.38827 4.1875 3.25354 4.03748L3.25353 4.03747L0.944723 1.46596L0.944715 1.46595C0.818424 1.32527 0.818435 1.10323 0.944708 0.962551L0.94473 0.962526C1.07946 0.812491 1.30527 0.812491 1.43999 0.962526L1.44 0.962535L3.50116 3.25822L5.56233 0.962535L5.56406 0.960611L5.56407 0.960626C5.69796 0.816574 5.91722 0.816585 6.05112 0.960615L3.7488 4.03747ZM3.7488 4.03747L6.05761 1.46596L6.05762 1.46598M3.7488 4.03747L6.05762 1.46598M6.05762 1.46598L6.05932 1.46402M6.05762 1.46598L6.05932 1.46402M6.05932 1.46402C6.18303 1.32135 6.18002 1.09928 6.05112 0.960618L6.05932 1.46402Z"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              stroke-width="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
    <NuxtLink
      v-else
      :to="{ path: `${item.kategorieLink}` }"
      class="absolute h-full w-full top-0 left-0"
    >
    </NuxtLink>

    <div class="h-32 w-full flex items-center">
      <v-lazy-image
        :src="item.kategorieBildLink"
        class="max-h-full max-w-full mx-auto"
        @load="setLoadDone"
      />
    </div>
    <p class="text-tb-black text-base text-center font-normal leading-5">
      {{ item.kategorieName }}
    </p>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
export default {
  name: "SubCategoryCard",
  components: {
    ContentLoader,
  },
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      loadDone: false,
    };
  },
  methods: {
    setLoadDone() {
      this.loadDone = true;
    },
  },
  watch: {
    item: {
      deep: true,
      immediate: true,
      handler: function () {
        this.loadDone = false;
      },
    },
  },
};
</script>

<style>
</style>