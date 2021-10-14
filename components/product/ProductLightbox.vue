<template>
  <div
    id="product-lightbox-component"
    class="fixed z-40 top-0 left-0 h-full w-full px-3 bg-tb-primary-dark bg-opacity-50"
  >
    <div class="relative h-full w-full">
      <div class="h-full w-full" v-on:click="$emit('close')"></div>
      <div
        class="absolute container transform -translate-x-1/2 -translate-y-1/2 lightbox-wrapper"
      >
        <div
          class="lightbox-content rounded bg-tb-primary h-full w-full tb-shadow-2 p-8 xl:p-12 flex relative"
        >
          <div
            v-on:click="$emit('close')"
            class="close-btn absolute top-0 right-0 transform -translate-x-4 text-3xl text-tb-dark-red hover:text-red-800 cursor-pointer"
          >
            &times;
          </div>
          <div class="px-5 py-3 w-2/5 nice-scroll nice-scroll-bg">
            <p class="text-tb-black font-normal text-3xl xl:text-4xl">
              {{ productTitle }}
            </p>
            <div
              class="w-full mt-8 xl:mt-10 pr-0 xl:pr-4 pb-4 xl:pb-6 gap-2 grid grid-cols-4"
            >
              <div
                v-for="(item, index) in data"
                :key="index"
                @mouseover="setActiveImage(index)"
                class="sm-image-wrapper h-16 w-full py-2 rounded items-center flex justify-center box-border cursor-pointer border bg-white"
                v-bind:class="
                  activeImage === index
                    ? 'border-tb-blue'
                    : 'border-tb-primary-dark'
                "
              >
                <img
                  :src="data.length ? item.srcS : ''"
                  class="max-h-full max-w-full"
                  alt
                />
              </div>
              <div
                v-if="video.length"
                @mouseover="activeVID = video"
                class="sm-image-wrapper h-16 w-full py-2 rounded items-center flex justify-center box-border cursor-pointer border bg-white"
                v-bind:class="
                  activeVID === video
                    ? 'border-tb-blue'
                    : 'border-tb-primary-dark'
                "
              >
                <img
                  src="~/assets/images/product-detail/preview-video.svg"
                  class="max-h-full max-w-full"
                  alt
                />
              </div>
              <div
                v-for="item in testVideos"
                :key="item"
                @mouseover="activeVID = item"
                class="sm-image-wrapper h-16 w-full py-2 rounded items-center flex justify-center box-border cursor-pointer border bg-white"
                v-bind:class="
                  activeVID === item
                    ? 'border-tb-blue'
                    : 'border-tb-primary-dark'
                "
              >
                <img
                  src="~/assets/images/product-detail/preview-video.svg"
                  class="max-h-full max-w-full"
                  alt
                />
              </div>
            </div>
            <div
              class="embed-container h-48 xl:h-56 mt-6 xl:mt-8 w-full flex items-center"
              v-if="activeVID != ''"
            >
              <client-only>
                <youtube
                  :video-id="activeVID"
                  :player-vars="playerVars"
                  :fitParent="true"
                  :resize="true"
                  class="w-full h-full"
                />
              </client-only>
            </div>
          </div>
          <div class="w-3/5 rounded p-2 xl:p-4 bg-white h-full">
            <div class="relative w-full h-full p-8">
              <div
                @click="navNext"
                class="absolute h-full w-8 xl:w-12 -mr-2 xl:-mr-4 top-0 flex justify-center items-center right-0 cursor-pointer"
              >
                <img
                  class="lightbox-nav-next w-5"
                  src="~/assets/images/arrow-bg.svg"
                />
              </div>
              <div
                @click="navPrev"
                class="absolute h-full w-8 xl:w-12 -ml-2 xl:-ml-4 top-0 flex justify-center items-center left-0 cursor-pointer"
              >
                <img
                  class="lightbox-nav-prev w-5 transform rotate-180"
                  src="~/assets/images/arrow-bg.svg"
                />
              </div>
              <div
                class="relative w-full h-full bg-wrapper flex items-center justify-center overflow-hidden"
                ref="zoomPlay"
              >
                <img
                  @click="bgZoomIn = true"
                  v-if="bgZoomIn != true"
                  :src="data.length ? data[activeImage].srcXXL : ''"
                  class="max-h-full max-w-full normal-image"
                  alt
                />
                <img
                  :style="
                    'transform: translate(-' +
                    zoomImageLeft +
                    'px, -' +
                    zoomImageTop +
                    'px);'
                  "
                  class="absolute top-0 left-0 zoomed-image"
                  v-if="bgZoomIn"
                  ref="zoomImage"
                  @click="bgZoomIn = false"
                  @mousemove="zoomImage"
                  :src="data.length ? data[activeImage].srcXXL : ''"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: "ProductLightbox",
  props: ["active", "activeVideo"],
  data() {
    return {
      activeImage: this.active || 0,
      activeVID: this.activeVideo || "",
      testVideos: [],
      bgZoomIn: false,
      zoomImageLeft: 0,
      zoomImageTop: 0,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
      },
    };
  },
  computed: {
    ...mapState({
      productTitle: (state) => state.productData.productPricing.name,
      data: (state) => state.productData.productGallery,
      testData: (state) => state.productData.consumerMagazine.customerFeedback,
    }),
    ...mapGetters('productData', {
      video: "productVideo",
    }),
  },
  watch: {
    testData: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.testVideos = [];
        if (!val.length) return;
        else {
          val.forEach((element) => {
            if (element.video.length) {
              this.testVideos.push(element.video);
            }
          });
        }
      },
    },
  },
  created() {
    window.addEventListener("keydown", this.handleKeypress);
  },
  mounted() {
    document.getElementsByTagName("BODY")[0].classList.add("overflow-hidden-i");
  },
  beforeDestroy() {
    document
      .getElementsByTagName("BODY")[0]
      .classList.remove("overflow-hidden-i");
    window.removeEventListener("keydown", this.handleKeypress);
  },
  methods: {
    navNext() {
      this.bgZoomIn = false;
      this.activeImage = (this.activeImage + 1) % this.data.length;
    },
    navPrev() {
      this.bgZoomIn = false;
      this.activeImage =
        (this.activeImage + this.data.length - 1) % this.data.length;
    },
    handleKeypress(e) {
      if (e.key == "ArrowLeft") {
        this.navPrev();
      } else if (e.key == "ArrowRight") {
        this.navNext();
      }
    },
    setActiveImage(index) {
      this.bgZoomIn = false;
      this.activeImage = index;
      this.activeVID = "";
    },
    zoomImage(event) {
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      let leftCorner = this.$refs.zoomPlay.getBoundingClientRect().left;
      let topCorner = this.$refs.zoomPlay.getBoundingClientRect().top;
      let boxWidth = this.$refs.zoomPlay.getBoundingClientRect().width;
      let boxHeight = this.$refs.zoomPlay.getBoundingClientRect().height;
      let imgWidth = this.$refs.zoomImage.getBoundingClientRect().width;
      let imgHeight = this.$refs.zoomImage.getBoundingClientRect().height;
      if (mouseX > leftCorner + boxWidth - (boxWidth * boxWidth) / imgWidth / 2)
        this.zoomImageLeft = imgWidth - boxWidth;
      else if (mouseX < leftCorner + (boxWidth * boxWidth) / imgWidth / 2)
        this.zoomImageLeft = 0;
      else
        this.zoomImageLeft =
          (imgWidth / boxWidth) * (mouseX - leftCorner) - boxWidth / 2;

      if (
        mouseY >
        topCorner + boxHeight - (boxHeight * boxHeight) / imgHeight / 2
      )
        this.zoomImageTop = imgHeight - boxHeight;
      else if (mouseY < topCorner + (boxHeight * boxHeight) / imgHeight / 2)
        this.zoomImageTop = 0;
      else
        this.zoomImageTop =
          (imgHeight / boxHeight) * (mouseY - topCorner) - boxHeight / 2;
    },
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
/* .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
}
.embed-container iframe,
.embed-container object,
.embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
} */
.lightbox-nav {
  top: 46%;
}
.normal-image {
  cursor: zoom-in;
}
.zoomed-image {
  cursor: zoom-out;
  width: unset;
  max-width: unset;
  min-width: unset;
}
</style>