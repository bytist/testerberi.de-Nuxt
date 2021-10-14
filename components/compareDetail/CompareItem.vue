<template>
  <div id="compare-item" class="relative">
    <div class="absolute top-0 left-0 w-10 h-10 pr-1 pb-1">
      <div
        class="
          h-full
          w-full
          rounded-tl
          bg-tb-green
          text-white text-base
          font-normal
          flex
          justify-center
          items-center
        "
      >
        {{ $vnode.key + 1 }}
      </div>
    </div>
    <div class="rounded bg-white p-6 xl:p-8">
      <div class="grid grid-cols-7 gap-4 xl:gap-6">
        <div class="col-span-2">
          <div class="h-40 xl:h-48 flex justify-center items-center">
            <img
              :src="require(`~/assets/images/product/` + data.thumbnail)"
              class="max-h-full max-w-full"
              alt=""
            />
          </div>
        </div>
        <div class="col-span-5">
          <div class="flex justify-between items-center mb-2 pb-px">
            <div class="flex items-stretch">
              <div class="h-10 w-10 mr-px relative">
                <client-only>
                  <PercentageCircle
                    :percent="data.percentage"
                    size="medium"
                    class="circle-outer-wrapper"
                    :class="
                      data.percentage > 80
                        ? `verygood`
                        : data.percentage > 60
                        ? `good`
                        : data.percentage > 40
                        ? `fine`
                        : data.percentage > 20
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
                      data.percentage > 80
                        ? `text-tb-green`
                        : data.percentage > 60
                        ? `text-tb-limegreen`
                        : data.percentage > 40
                        ? `text-tb-yellow`
                        : data.percentage > 20
                        ? `text-tb-orange`
                        : `text-tb-red`
                    "
                    >{{ data.percentage }}%</span
                  >
                </div>
              </div>
              <div class="ml-2 pl-px flex flex-col justify-between">
                <p class="text-base text-tb-black font-normal leading-4">
                  {{ data.title }}
                </p>
                <span class="text-xs text-tb-primary-dark">
                  <client-only>
                    <vue-intl-numberformat
                      locale="de"
                      currency="EUR"
                      :number="data.points"
                    ></vue-intl-numberformat>
                  </client-only>
                  {{
                    data.totalPoints
                      ? `von ` + data.totalPoints + ` Punkten`
                      : `Punkte`
                  }}
                  {{ `- ` + data.status }}
                  {{ data.testWinner && `»Testsieger«` }}
                </span>
              </div>
            </div>
            <div v-if="data.price" class="text-right">
              <div class="text-22 leading-6">
                <span v-if="data.abTest" class="text-tb-black">ab </span>
                <span class="font-normal text-tb-blue">
                  <client-only>
                    <vue-intl-numberformat
                      locale="de"
                      formatStyle="currency"
                      currency="EUR"
                      :number="data.price"
                      class="font-normal"
                    ></vue-intl-numberformat>
                  </client-only>
                </span>
              </div>
              <div class="text-xs text-tb-primary-dark">
                {{ data.offer }} Angebote
              </div>
            </div>
          </div>
          <div class="pt-px text-base text-tb-black leading-5 mb-2">
            {{ data.description }}
          </div>
          <div class="grid grid-cols-2 gap-2 xl:gap-3">
            <div v-if="data.pros" class="py-3">
              <div
                v-for="(item, index) in data.pros"
                :key="index"
                class="grid grid-cols-8 xl:grid-cols-9 gap-2 xl:gap-3"
              >
                <div class="pt-1">
                  <img
                    src="~/assets/images/thumbup.svg"
                    class="mx-auto mt-px"
                    alt=""
                  />
                </div>
                <div class="col-span-7 xl:col-span-8">
                  <p class="text-base text-tb-primary-dark leading-7">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="data.cons" class="py-3">
              <div
                v-for="(item, index) in data.cons"
                :key="index"
                class="grid grid-cols-8 xl:grid-cols-9 gap-2 xl:gap-3"
              >
                <div class="pt-2">
                  <img
                    src="~/assets/images/thumbdown.svg"
                    class="mx-auto -mt-px"
                    alt=""
                  />
                </div>
                <div class="col-span-7 xl:col-span-8">
                  <p class="text-base text-tb-primary-dark leading-7">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 xl:gap-3">
            <div v-if="data.detail" class="pt-2">
              <div
                v-for="(item, index) in data.detail.slice(
                  0,
                  data.detail.length / 2 + 1
                )"
                :key="index"
                class="grid grid-cols-8 xl:grid-cols-9 gap-2 xl:gap-3"
              >
                <div class="pl-1 leading-7 text-tb-primary-dark">&bull;</div>
                <div class="col-span-7 xl:col-span-8">
                  <p class="text-base text-tb-primary-dark leading-7">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="data.cons" class="py-2">
              <div
                v-for="(item, index) in data.detail.slice(
                  data.detail.length / 2 + 1,
                  data.detail.length
                )"
                :key="index"
                class="grid grid-cols-8 xl:grid-cols-9 gap-2 xl:gap-3"
              >
                <div class="pl-1 leading-7 text-tb-primary-dark">&bull;</div>
                <div class="col-span-7 xl:col-span-8">
                  <p class="text-base text-tb-primary-dark leading-7">
                    {{ item }}
                  </p>
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
export default {
  name: "CompareItem",
  props: {
    data: {
      type: Object,
    },
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