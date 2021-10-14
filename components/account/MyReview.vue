<template>
  <div v-if="selfActive" id="my-review-component">
    <div
      class="py-8 border-b border-tb-border flex justify-between items-start"
    >
      <div class="w-24">
        <img
          :src="require('~/assets/images/product/' + data.thumbnail)"
          class="transform translate-y-1 max-h-full"
          alt
        />
      </div>
      <p class="w-56 xl:w-64 text-22 text-tb-blue cursor-pointer">
        {{ data.product }}
      </p>
      <div class="w-1/2 xl:w-7/12">
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
        <p class="flex items-center mt-1">
          <img src="~/assets/images/calender.svg" alt />
          <span class="text-xs text-tb-primary-dark ml-2"
            >{{ newDate.toLocaleString("default", { month: "long" }) }}
            {{ newDate.getFullYear() }}</span
          >
        </p>
        <p class="text-tb-black mt-3 leading-tight">{{ data.feedback }}</p>
      </div>
      <div class="self-stretch flex items-center">
        <img src="~/assets/images/edit.svg" class="cursor-pointer" alt />
        <img
          src="~/assets/images/delete.svg"
          @click="selfActive = false"
          class="ml-4 cursor-pointer"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyReview",
  props: ["data"],
  data() {
    return {
      newDate: new Date(this.data.date),
      selfActive: true,
    };
  },
};
</script>

<style>
</style>