<template>
  <div id="popular-search-component">
    <div v-if="moreSearch.length" class="bg-tb-border px-3 py-10">
      <div class="container mx-auto">
        <p class="text-22 text-tb-black font-normal">Weitere beliebte Suchen</p>
        <div class="flex justify-between gap-0 xl:gap-4 mt-4 relative">
          <div
            v-if="productLoading"
            class="absolute top-0 left-0 h-full w-full bg-tb-border py-1 z-20"
          >
            <client-only>
              <div class="overflow-hidden h-full rounded">
                <ContentLoader
                  primaryColor="#FFFFFF"
                  secondaryColor="#EFF2F5"
                  :speed="1"
                  class="content-loader-item"
                />
              </div>
            </client-only>
          </div>
          <ul class="w-full pop-sch-list list-disc list-inside text-tb-blue">
            <li
              v-for="(item, index) in moreSearch.slice(
                0,
                breakPoint(moreSearch)
              )"
              :key="index"
            >
              <NuxtLink class="list-link-item" :to="item.link">{{
                item.title
              }}</NuxtLink>
            </li>
          </ul>
          <ul class="w-full pop-sch-list list-disc list-inside text-tb-blue">
            <li
              v-for="(item, index) in moreSearch.slice(
                breakPoint(moreSearch),
                breakPoint(moreSearch) * 2 - 1
              )"
              :key="index"
            >
              <NuxtLink class="list-link-item" :to="item.link">{{
                item.title
              }}</NuxtLink>
            </li>
          </ul>
          <ul class="w-full pop-sch-list list-disc list-inside text-tb-blue">
            <li
              v-for="(item, index) in moreSearch.slice(
                breakPoint(moreSearch) * 2 - 1,
                breakPoint(moreSearch) * 3 - 2
              )"
              :key="index"
            >
              <NuxtLink class="list-link-item" :to="item.link">{{
                item.title
              }}</NuxtLink>
            </li>
          </ul>
          <ul class="w-full pop-sch-list list-disc list-inside text-tb-blue">
            <li
              v-for="(item, index) in moreSearch.slice(
                breakPoint(moreSearch) * 3 - 2,
                moreSearch.length
              )"
              :key="index"
            >
              <NuxtLink class="list-link-item" :to="item.link">{{
                item.title
              }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
import { mapGetters } from "vuex";
export default {
  name: "PopularSearch",
  components: {
    ContentLoader,
  },
  computed: {
    ...mapGetters({
      productLoading: "productData/productLoading",
      moreSearch: "productData/moreSearch",
    }),
  },
  methods: {
    breakPoint(array) {
      return (array.length - 1) / 4 + 1;
    },
  },
};
</script>

<style scoped>
.pop-sch-list {
  margin-left: 6px;
}
.list-link-item {
  position: relative;
  left: -6px;
}
</style>