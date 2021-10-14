<template>
  <div id="press-content-component" class="mt-12 px-3">
    <div v-if="loadDone">
      <div class="container mx-auto">
        <div
          class="header-img bg-cover bg-center rounded-tl rounded-tr"
          :style="`background-image: url('${data.coverImg}');`"
        ></div>
        <div class="mt-8 flex gap-3 xl:gap-6">
          <div class="w-3/4 pr-16 xl:pr-24">
            <p id="title" class="text-22 text-tb-black font-normal">
              {{ data.h1Title }}
            </p>
            <div
              v-for="(item, index) in data.content.artikel"
              :key="index"
              class="press-article-item"
              :id="item.absatzID"
            >
              <div
                v-if="item.showUeberschrift || item.inhalt.bildURL"
                class="text-22 text-tb-black font-normal"
              >
                {{ item.ueberschrift }}
              </div>
              <div
                v-if="!item.inhalt.bildURL"
                class="text-tb-black leading-snug"
                v-html="item.inhalt"
              ></div>
              <img
                v-else
                :src="
                  item.inhalt.bildURL.slice(1, item.inhalt.bildURL.length - 1)
                "
                :alt="item.inhalt.altText"
                class="max-w-full"
              />
              <hr
                v-if="index < data.content.artikel.length - 1"
                class="bg-tb-border mt-8 mb-8"
              />
            </div>
          </div>
          <div class="w-1/4">
            <div class="sidebar-wrapper">
              <client-only>
                <scrollactive
                  class="rounded bg-tb-primary py-4 flex flex-col"
                  :active-class="'activetab'"
                  :offset="70"
                  :highlightFirstItem="true"
                >
                  <a
                    v-for="(item, index) in data.sidebar.sidebarLinks"
                    :key="index"
                    :href="`#${item.absatzID}`"
                    class="py-2 px-5 cursor-pointer scrollactive-item"
                    >{{ item.ueberschrift }}</a
                  >
                </scrollactive>
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 py-12 bg-tb-primary px-3 -mx-3">
        <div class="container mx-auto">
          <p class="text-22 text-tb-black font-normal">Latest publications</p>
          <div class="flex justify-between gap-4 xl:gap-8 mt-8">
            <NuxtLink
              v-for="(item, index) in data.content.letzteArtikel.slice(0, 3)"
              :key="index"
              :to="{ path: item.link }"
              class="w-full rounded overflow-hidden cursor-pointer group"
            >
              <div
                class="h-48 xl:h-56 w-full bg-center bg-cover"
                :style="`background-image: url('${item.bildURL}');`"
              ></div>
              <p
                class="
                  mt-3
                  text-22
                  font-normal
                  text-tb-black
                  group-hover:text-tb-blue
                "
              >
                {{ item.ueberschrift }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPressContent } from "@/services/service";
import "@/assets/css/press.css";
export default {
  name: "PressContent",
  scrollToTop: true,
  data() {
    return {
      data: {},
      active: 0,
      loadDone: false,
      latest: [
        {
          img: 1,
          title:
            "Intelligent and cost-saving heating: Smart home thermostats in the test",
        },
        {
          img: 2,
          title:
            "Relaxed, cheap and quick on holiday - Which travel alternative is the best?",
        },
        {
          img: 3,
          title: "Fake test pages",
        },
      ],
    };
  },
  watch: {
    "$route.params": {
      deep: true,
      immediate: true,
      handler: function () {
        this.getPressData();
      },
    },
  },
  methods: {
    getPressData() {
      this.loadDone = false;
      let url = this.$route.params.pressId;
      url = url
        .replace(/ /g, "-")
        .replace(/\//g, "-")
        .replace(/,/g, "-")
        .toLowerCase();
      getPressContent(url)
        .then((res) => {
          this.data = { ...res };
          for (const item of this.data.content.artikel) {
            if (!item.inhalt.bildURL) {
              item.inhalt = item.inhalt.replace(/(?:\r\n|\r|\n)/g, "<br>");
            }
          }
          this.loadDone = true;

          let imgArr = document.getElementsByClassName("lazy");
          setTimeout(() => {
            for (const item of imgArr) {
              item.setAttribute("src", item.dataset.original);
            }
          }, 20);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.header-img {
  height: 480px;
}
@media screen and (min-width: 1280px) {
  .header-img {
    height: 550px;
  }
}
.activetab {
  background-color: #3099f2;
  color: white;
}
</style>