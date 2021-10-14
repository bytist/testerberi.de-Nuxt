<template>
  <div id="leave-feedback-component">
    <div class="rounded bg-tb-primary p-4 xl:p-6 mt-5 xl:mt-10">
      <p class="text-22 text-tb-black font-normal">
        Meiung zu {{ data }} schreiben
      </p>
      <div class="text-tb-primary-dark mt-1 xl:mt-2 leading-snug">
        Wir freuen uns, dass du eine Rezension zu dem Produkt
        {{ data }} verfassen möchtest.
        <p class="my-1 xl:my-4">
          Bitte fülle dazu in den nächsten Schritten alle Felder aus.
        </p>
        <p class="mt-1 mb-3 xl:my-4">
          Bitte schreibe diese mit deinen eigenen Worten. Verwende keinen Inhalt
          aus anderen Quellen und schreibe nur zutreffende Fakten.
        </p>
      </div>
      <p class="text-tb-black leading-snug">
        Wie viele Sterne würdest du diesem Produkt geben?
      </p>
      <p class="text-tb-primary-dark mt-1">1 = schlecht; 5 = sehr gut</p>
      <client-only>
        <StarRating
          v-bind:rating="0"
          v-bind:read-only="false"
          v-bind:show-rating="false"
          v-bind:star-size="25"
          active-color="#FF7000"
          v-bind:padding="2"
          v-bind:increment="1"
          inactive-color="#EFF2F5"
          border-color="#FF7000"
          glow-color="#00000000"
          v-bind:border-width="2"
          class="mt-1 xl:mt-2"
        ></StarRating>
      </client-only>
      <input
        type="text"
        class="form-input w-full rounded-full mt-4 xl:mt-8 placeholder-tb-primary-dark px-6 py-3 border-transparent"
        placeholder="Titel der Rezension"
      />
      <textarea
        name
        id
        rows="4"
        class="form-textarea rounded-25 w-full mt-2 xl:mt-4 border-transparent px-6 py-3 placeholder-tb-primary-dark"
        placeholder="Write Review here"
      ></textarea>
      <div class="main-button mt-3 xl:mt-6 mb-3 xl:mb-6 w-64">Submit</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaveFeedback",
  props: ["data"],
};
</script>

<style scoped>
.rounded-25 {
  border-radius: 20px;
}
</style>
