<template>
  <div class="p-4 xl:p-5 rounded bg-tb-primary">
    <div
      class="
        rounded
        bg-white
        flex
        justify-center
        items-center
        h-48
        py-4
        xl:py-5
        px-6
        xl:px-8
      "
    >
      <img
        :src="data.shopLogoURL"
        class="max-h-full max-w-full"
        alt="amazon.de"
      />
    </div>
    <div class="flex items-center mt-3">
      <div class="text-xs text-tb-primary-dark pt-1 pr-2">Overall Rating</div>
      <client-only>
        <StarRating
          :rating="data.bewertungStars"
          :read-only="true"
          :show-rating="false"
          :star-size="7"
          active-color="#FF7000"
          inactive-color="#FFFFFF"
          glow-color="#00000000"
          :padding="2"
          :inline="true"
          border-color="#FF7000"
          :border-width="2"
        ></StarRating>
      </client-only>
    </div>
    <div class="grid grid-cols-8 xl:grid-cols-10 mt-3">
      <div class="pt-px">
        <img src="~/assets/images/pin_sm.svg" alt="pin" />
      </div>
      <div class="text-base col-span-7 xl:col-span-9 text-tb-black leading-5">
        <span v-if="data.firmaName">{{ data.firmaName }}<br /></span>
        <span v-if="data.shopStrasse">{{ data.shopStrasse }}<br /></span>
        <span v-if="data.shopPLZ || data.shopOrt"
          >{{ `${data.shopPLZ} ${data.shopOrt}` }}<br
        /></span>
        <span v-if="data.shopStaat">{{ data.shopStaat }}<br /></span>
        <span v-if="data.shopLand">{{ data.shopLand }}<br /></span>
        for
        <a
          :href="data.shopLink"
          target="_blank"
          class="text-tb-blue font-normal"
          >{{
            `${$route.params.shopName[0].toUpperCase()}${$route.params.shopName.slice(
              1
            )}`
          }}</a
        >
      </div>
    </div>
    <div class="grid grid-cols-2 mt-4 gap-3 xl:gap-5">
      <div>
        <div class="text-xs text-tb-primary-dark">Payment</div>
        <div v-if="data.payment.visa" class="h-10 my-2 py-px flex items-center">
          <img
            src="~/assets/images/payment/visa.svg"
            class="max-h-full max-w-full"
            alt=""
          />
        </div>
        <div
          v-if="data.payment.master"
          class="h-10 my-2 py-px flex items-center"
        >
          <img
            src="~/assets/images/payment/mastercard.svg"
            class="max-h-full max-w-full"
            alt=""
          />
        </div>
        <div
          v-if="data.payment.other"
          class="h-10 my-2 py-px flex items-center"
        >
          <div class="text-base text-tb-black">Invoice, EC card</div>
        </div>
      </div>
      <div>
        <div class="text-xs text-tb-primary-dark">Shipping methods</div>
        <div
          v-if="data.delivery.post"
          class="h-10 my-2 py-px flex items-center"
        >
          <img
            src="~/assets/images/payment/ship_1.png"
            class="max-h-full max-w-full"
            alt=""
          />
        </div>
        <div v-if="data.delivery.dpd" class="h-10 my-2 py-px flex items-center">
          <img
            src="~/assets/images/payment/ship_2.png"
            class="max-h-full max-w-full"
            alt=""
          />
        </div>
        <div
          v-if="data.delivery.hermes"
          class="h-10 my-2 py-px flex items-center"
        >
          <img
            src="~/assets/images/payment/ship_3.png"
            class="max-h-full max-w-full"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="main-button w-full p-0 mt-5 mb-1">Submit a new review</div>
  </div>
</template>

<script>
export default {
  name: "CompanyCard",
  props: ["data"],
};
</script>

<style>
</style>