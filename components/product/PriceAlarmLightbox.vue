<template>
  <div
    id="price-alarm-lightbox-component"
    class="fixed top-0 left-0 w-full h-full z-40"
  >
    <div class="relative h-full w-full flex items-center justify-center">
      <div
        v-on:click="$emit('close')"
        class="absolute h-full w-full top-0 left-0 bg-tb-primary-dark opacity-50"
      ></div>
      <div
        class="lightbox-item rounded bg-tb-primary px-8 xl:px-12 pt-8 xl:pt-12 pb-10 relative tb-shadow-2"
      >
        <div class="price-alarm-content-wrapper">
          <p class="text-22 text-tb-black font-normal">Price alarm</p>
          <p class="text-tb-primary-dark mt-1 xl:mt-2">
            Wir informieren Dich
            <span class="text-tb-black font-normal">einmalig</span>
            sobald dein Wunschpreis für das Produkt
            <span class="text-tb-black font-normal">{{ name }}</span>
            erreicht ist.
          </p>
          <div class="mt-4 xl:mt-8 flex flex-col gap-3 xl:gap-6">
            <div class="flex justify-between items-center">
              <span class="text-tb-primary-dark"
                >Aktuell günstigster Preis:</span
              >
              <p class="text-22 w-4/6 text-tb-dark-red font-normal pl-3">
                <client-only>
                  <vue-intl-numberformat
                    locale="de"
                    formatStyle="currency"
                    currency="EUR"
                    :number="price"
                    class="font-normal"
                  ></vue-intl-numberformat>
                </client-only>
              </p>
            </div>
            <div class="flex justify-between items-center mt-1">
              <span class="text-tb-primary-dark">Dein Wunschpreis</span>
              <client-only>
                <currency-input
                  v-model="desiredValue"
                  currency="EUR"
                  class="form-input rounded-full placeholder-tb-primary-dark text-tb-primary-dark px-6 py-3 border-transparent w-4/6"
                  locale="de"
                />
              </client-only>
            </div>
            <div class="flex justify-between items-center mt-1">
              <span class="text-tb-primary-dark">Deine eMail-Adresse</span>
              <input
                type="text"
                class="form-input rounded-full placeholder-tb-primary-dark text-tb-primary-dark px-6 py-3 border-transparent w-4/6"
                placeholder="email address"
              />
            </div>
          </div>
          <div class="mt-3 xl:mt-6 pt-1 flex">
            <img
              src="~/assets/images/check.svg"
              id="accept-check"
              class="pricealarm-checkbox mt-px"
            />
            <label
              for="accept-check"
              class="text-tb-primary-dark leading-snug ml-2"
            >
              Ich willige ein, dass mich Testbericht.de per eMail über neue
              Angebote für das Produkt
              <span class="font-normal text-tb-black">{{ name }}</span>
              informiert. Meine Daten werden ausschließlich zu diesem Zweck
              genutzt. Eine Weitergabe an Dritte erfolgt nicht. Ich kann die
              Einwilligung jederzeit mit den in der
              <span class="underline text-tb-blue">Datenschutzerklärung</span>
              genannten Kontaktmöglichkeiten oder durch Nutzung des in den
              eMails enthaltenen Abmeldelinks widerrufen.
            </label>
          </div>
          <div class="main-button mt-4 xl:mt-8">Preisalarm aktivieren</div>
        </div>
        <div
          v-on:click="$emit('close')"
          class="close-btn absolute top-0 right-0 transform -translate-x-4 text-3xl text-tb-dark-red hover:text-red-800 cursor-pointer"
        >
          &times;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PriceAlarmLightbox",
  props: ["name", "price"],
  data() {
    return {
      desiredValue: 2113,
    };
  },
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
.pricealarm-checkbox {
  height: 18px;
  width: 18px;
}
.lightbox-item {
  width: 690px;
}
</style>