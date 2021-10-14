<template>
  <div
    id="product-offer-lightbox-component"
    class="fixed z-40 top-0 left-0 h-full w-full px-3 bg-tb-primary-dark bg-opacity-50"
  >
    <div class="relative h-full w-full flex justify-center items-center">
      <div
        class="h-full w-full absolute top-0 left-0 z-0"
        v-on:click="$emit('close')"
      ></div>
      <div
        class="lightbox-content rounded bg-tb-primary w-full max-w-5xl tb-shadow-2 p-6 xl:p-8 relative"
      >
        <div
          v-on:click="$emit('close')"
          class="close-btn absolute top-0 right-0 transform -translate-x-4 text-3xl text-tb-dark-red hover:text-red-800 cursor-pointer"
        >
          &times;
        </div>
        <div class="text-22 text-tb-black font-normal">
          Angebotsinformationen
        </div>
        <div class="grid grid-cols-8 gap-6 xl:gap-8 mt-6 h-89">
          <div class="col-span-2 rounded bg-white py-6 xl:py-8 px-4 xl:px-6">
            <img
              :src="data.thumbnail"
              alt=""
              class="mx-auto max-h-full max-w-full"
            />
          </div>
          <div class="col-span-3 rounded bg-white p-4 xl:p-6">
            <p class="text-22 text-tb-black font-normal leading-5">
              {{ data.name }}
            </p>
            <p class="text-22 text-tb-black font-normal mt-2">
              <client-only>
                <vue-intl-numberformat
                  locale="de"
                  formatStyle="currency"
                  currency="EUR"
                  :number="parseFloat(data.price)"
                  class="font-normal"
                ></vue-intl-numberformat>
              </client-only>
            </p>
            <p class="text-base text-tb-primary-dark mt-1">
              Versand:
              <client-only>
                <vue-intl-numberformat
                  locale="de"
                  formatStyle="currency"
                  currency="EUR"
                  :number="parseFloat(data.shipping)"
                ></vue-intl-numberformat>
              </client-only>
            </p>
            <p class="text-base text-tb-primary-dark mt-1">
              Preis vom
              {{ data.date }}
            </p>
            <div class="flex items-center mt-1 pt-px">
              <img src="~/assets/images/shipping-green.svg" alt="" />
              <span class="ml-2 text-xs text-tb-primary-dark">{{
                data.delivery
              }}</span>
            </div>
            <div class="w-full grid grid-cols-2 gap-2 xl:gap-3 mt-3">
              <div>
                <div class="text-xs text-tb-primary-dark pl-1 mb-2">
                  Payment
                </div>
                <div
                  v-if="data.payment.amazon"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/amazonpay.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.amex"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/amex.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.diners"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/diners.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.master"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/mastercard.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.paypal"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/paypal.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.visa"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/visa.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div class="text-xs text-tb-primary-dark pl-1 mb-2">
                  Shipping methods
                </div>
                <div
                  v-if="data.payment.amazon"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/amazonpay.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.amex"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/amex.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.diners"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/diners.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.master"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/mastercard.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.paypal"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/paypal.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
                <div
                  v-if="data.payment.visa"
                  class="h-12 py-1 flex items-center"
                >
                  <img
                    src="~/assets/images/payment/visa.svg"
                    class="my-px max-h-full max-w-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-3 rounded bg-white p-6 xl:p-8">
            <div class="h-16">
              <img :src="data.shop.shopLogo" class="h-full max-w-full" alt="" />
            </div>
            <div class="flex items-center mt-6">
              <div class="text-xs text-tb-primary-dark mr-2">
                Overall Rating
              </div>
              <client-only>
                <StarRating
                  :rating="data.stars"
                  :read-only="true"
                  :show-rating="false"
                  :star-size="7"
                  :increment="0.5"
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
            <div class="flex mt-6">
              <div>
                <img src="~/assets/images/footer-location.svg" alt="" />
              </div>
              <div class="ml-2">
                <div
                  v-if="data.shop.adresse.strasse"
                  class="text-base text-tb-black"
                >
                  {{ data.shop.adresse.strasse }}
                </div>
                <div
                  v-if="data.shop.adresse.staat"
                  class="text-base text-tb-black"
                >
                  {{ data.shop.adresse.staat }}
                </div>
                <div
                  v-if="data.shop.adresse.plz || data.shop.adresse.ort"
                  class="text-base text-tb-black"
                >
                  {{ data.shop.adresse.plz }}
                  {{ data.shop.adresse.ort }}
                </div>
                <div class="text-base text-tb-black">
                  for
                  <span>
                    <a
                      class="text-tb-blue font-normal"
                      :href="data.shop.link"
                      target="_blank"
                    >
                      {{ data.shopName }}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-8 gap-6 xl:gap-8 mt-6">
          <div class="col-span-2"></div>
          <div class="col-span-3">
            <div class="main-button">Shop bewerten</div>
          </div>
          <div class="col-span-3">
            <a :href="data.shop.link" target="_blank" class="main-button"
              >Zum Shop</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProductOfferLightbox",
  props: ["data"],
  mounted() {
    document.getElementsByTagName("BODY")[0].classList.add("overflow-hidden-i");
  },
  beforeDestroy() {
    document
      .getElementsByTagName("BODY")[0]
      .classList.remove("overflow-hidden-i");
  },
};
</script>

<style scoped>
.lightbox-wrapper {
  height: 90%;
  max-height: 800px;
  top: 50%;
  left: 50%;
}
.h-89 {
  height: 100%;
  min-height: 22rem;
}
</style>