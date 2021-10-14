<template>
  <div v-if="selfActive" id="price-alarm-component">
    <div
      class="
        rounded
        bg-tb-primary
        p-3
        xl:p-4
        gap-3
        xl:gap-4
        flex
        items-stretch
        relative
      "
    >
      <div
        v-on:click="selfActive = false"
        class="
          close-btn
          absolute
          top-0
          right-0
          transform
          -translate-x-2
          leading-none
          text-3xl text-tb-dark-red
          hover:text-red-800
          cursor-pointer
        "
      >
        &times;
      </div>
      <NuxtLink
        :to="{
          name: 'Product',
          params: {
            firstId: data.category,
            secondId: data.subCategory,
            productId: data.name,
          },
        }"
        class="
          rounded
          bg-white
          flex
          justify-center
          items-center
          p-4
          xl:p-5
          cursor-pointer
          border border-transparent
          hover:border-tb-blue
        "
      >
        <img
          :src="
            require('../../assets/images/product/' + data.thumbnail + '.png')
          "
          class="max-h-full max-w-full"
          alt
        />
      </NuxtLink>
      <div class="w-3/4">
        <p class="font-normal">{{ data.name }}</p>
        <p class="text-xs text-tb-primary-dark mt-px">Current lowest price</p>
        <p class="text-22 font-normal text-tb-dark-red mt-1">
          <client-only>
            <vue-intl-numberformat
              class="font-normal"
              locale="de"
              formatStyle="currency"
              currency="EUR"
              :number="data.price"
            ></vue-intl-numberformat
          ></client-only>
        </p>

        <div class="relative w-full">
          <client-only>
            <currency-input
              v-model="desiredPrice"
              @focus="tempVal = desiredPrice"
              @blur="updateVal"
              currency="EUR"
              class="
                form-input
                rounded-full
                placeholder-tb-primary-dark
                text-tb-primary-dark
                px-6
                pt-2
                pb-4
                border-transparent
                mt-2
                w-full
              "
              locale="de"
            />
          </client-only>
          <span class="absolute absolute-label text-xs text-tb-primary-dark"
            >Your desired price</span
          >
        </div>
      </div>
    </div>
    <transition name="fade">
      <Toast
        v-if="showToast"
        @close="showToast = false"
        :text="`Desired price's been updated to ` + desiredPrice + ' €'"
        :color="'#91C877'"
      />
    </transition>
  </div>
</template>

<script>
import Toast from "@/components/widget/Toast";

export default {
  name: "PriceAlarm",
  props: ["data"],
  data() {
    return {
      desiredPrice: 2152,
      tempVal: 0,
      showToast: false,
      selfActive: true,
    };
  },
  methods: {
    updateVal() {
      if (this.tempVal !== this.desiredPrice) {
        this.showToast = true;
      }
    },
  },
  components: {
    Toast,
  },
};
</script>

<style scoped>
.absolute-label {
  bottom: 2px;
  left: 24px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>