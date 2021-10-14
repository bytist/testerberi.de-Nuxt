<template>
  <div id="product-gallery-component">
    <div
      ref="lightboxx"
      class="bg-image-wrapper w-full flex justify-center items-center relative"
    >
      <div
        v-if="productLoading"
        class="absolute top-0 left-0 h-full w-full bg-white py-1"
      >
        <client-only>
          <div class="overflow-hidden h-full rounded">
            <ContentLoader
              primaryColor="#EFF2F5"
              secondaryColor="#E5EAEE"
              :speed="1"
              class="content-loader-item"
            />
            <ContentLoader
              primaryColor="#EFF2F5"
              secondaryColor="#E5EAEE"
              :speed="1"
              class="content-loader-item"
            />
          </div>
        </client-only>
      </div>
      <div
        v-if="zoomActive"
        @mousemove="zoomImage"
        @mouseleave="zoomLeave"
        @click="showLightbox = true"
        v-bind:style="
          'transform: translate(' +
          glassPositionLeft +
          'px, ' +
          glassPositionTop +
          'px); width: ' +
          glassSize +
          'px; height: ' +
          glassSizeHeight +
          'px;'
        "
        class="absolute opacity-50 zoom-glass rounded top-0 left-0"
      ></div>
      <div
        v-if="zoomActive"
        class="absolute zoom-wrapper top-0 z-10 p-2 w-auto"
      >
        <div
          ref="lightzoom"
          class="zoom-content-wrapper overflow-hidden bg-no-repeat bg-auto"
          :style="
            'background-image: url(' +
            (imgArray.length ? imgArray[activeImage].srcXXL : '') +
            '); background-position: -' +
            resultX +
            'px -' +
            resultY +
            'px; width: ' +
            bgBoxWidth +
            'px; height: ' +
            bgBoxHeight +
            'px;'
          "
        ></div>
      </div>
      <img
        v-if="activeImage > -1"
        ref="lightbox"
        @mouseover="zoomActive = true"
        @mouseenter="zoomImage"
        :src="imgArray.length ? imgArray[activeImage].srcL : ''"
        class="max-h-full max-w-full"
        alt
      />
      <div v-if="activeImage < 0" class="absolute top-0 left-0 h-full w-full">
        <client-only>
          <div class="embed-container w-full">
            <youtube
              :video-id="activeImage == -1 ? productVideo : testVideos[0]"
              :player-vars="playerVars"
              class="w-full"
            />
          </div>
        </client-only>
      </div>
    </div>
    <div class="grid grid-cols-5 w-full mt-8 gap-2 xl:gap-3">
      <div
        v-for="(item, index) in imgArray.slice(
          0,
          productVideo != '' || testVideos.length ? 4 : 5
        )"
        :key="index"
        @mouseover="activeImage = index"
        @click="showLightbox = true"
        class="sm-image-wrapper h-16 xl:h-20 py-2 rounded items-center flex justify-center box-border relative cursor-pointer"
        :class="`${
          activeImage === index ? 'border-tb-blue' : 'border-tb-primary-dark'
        } ${!productLoading && 'border'}`"
      >
        <div
          v-if="productLoading"
          class="absolute top-0 left-0 w-full h-full bg-white"
        >
          <client-only>
            <div class="overflow-hidden h-full rounded">
              <ContentLoader
                primaryColor="#EFF2F5"
                secondaryColor="#E5EAEE"
                :speed="1"
                class="content-loader-item"
              />
              <ContentLoader
                primaryColor="#EFF2F5"
                secondaryColor="#E5EAEE"
                :speed="1"
                class="content-loader-item"
              />
              <ContentLoader
                primaryColor="#EFF2F5"
                secondaryColor="#E5EAEE"
                :speed="1"
                class="content-loader-item"
              />
            </div>
          </client-only>
        </div>
        <img
          :src="imgArray.length ? item.srcS : ''"
          class="max-h-full max-w-full"
          alt
        />
      </div>
      <div
        @mouseover="activeImage = productVideo != '' ? -1 : -2"
        v-if="productVideo != '' || testVideos.length"
        class="sm-image-wrapper h-16 xl:h-20 w-full py-2 rounded items-center flex justify-center relative cursor-pointer box-border"
        :class="`${
          activeImage == -1 ? 'border-tb-blue' : 'border-tb-primary-dark'
        }  ${!productLoading && 'border'}`"
      >
        <div
          v-if="productLoading"
          class="absolute top-0 left-0 h-full w-full bg-white py-1"
        >
          <client-only>
            <div class="overflow-hidden h-full rounded">
              <ContentLoader
                primaryColor="#EFF2F5"
                secondaryColor="#E5EAEE"
                :speed="1"
                class="content-loader-item"
              />
              <ContentLoader
                primaryColor="#EFF2F5"
                secondaryColor="#E5EAEE"
                :speed="1"
                class="content-loader-item"
              />
            </div>
          </client-only>
        </div>
        <img
          src="~/assets/images/product-detail/preview-video.svg"
          class="max-h-full max-w-full"
          alt
        />
      </div>
    </div>
    <transition name="fade">
      <ProductLightbox
        v-if="showLightbox"
        @close="showLightbox = false"
        :active="activeImage"
      />
    </transition>
  </div>
</template>

<script>
import ProductLightbox from "@/components/product/ProductLightbox";
import { mapGetters, mapState } from "vuex";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "ProductGallery",
  components: {
    ProductLightbox,
    ContentLoader,
  },
  data() {
    return {
      activeImage: 0,
      zoomActive: false,
      resultX: 0,
      resultY: 0,
      glassPositionLeft: 0,
      glassPositionTop: 0,
      glassSize: 0,
      glassSizeHeight: 0,
      showLightbox: false,
      bgSizeWidth: 0,
      bgSizeHeight: 0,
      bgBoxWidth: 0,
      bgBoxHeight: 0,
      testVideos: [],
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
      },
    };
  },
  computed: {
    ...mapState({
      imgArray: (state) => state.productData.productGallery,
      testData: (state) => state.productData.consumerMagazine.customerFeedback,
    }),
    ...mapGetters({
      productLoading: "productData/productLoading",
      productVideo: "productData/productVideo",
    }),
  },
  watch: {
    imgArray: {
      deep: true,
      immediate: true,
      handler: function () {
        this.activeImage = 0;
      },
    },
    testData: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.testVideos = [];
        val.forEach((element) => {
          if (element.video.length) {
            this.testVideos.push(element.video);
          }
        });
      },
    },
  },
  updated() {
    // console.log(this.activeImage);
  },
  methods: {
    zoomImage(event) {
      let mouseX = event.clientX;
      let mouseY = event.clientY;
      let xxlWidth = this.imgArray[this.activeImage].sizeXXL.width;
      let xxlHeight = this.imgArray[this.activeImage].sizeXXL.height;
      let leftOuterCorner = this.$refs.lightboxx.getBoundingClientRect().left;
      let topOuterCorner = this.$refs.lightboxx.getBoundingClientRect().top;
      let leftCorner = this.$refs.lightbox.getBoundingClientRect().left;
      let topCorner = this.$refs.lightbox.getBoundingClientRect().top;
      let boxWidth = this.$refs.lightbox.getBoundingClientRect().width;
      let boxHeight = this.$refs.lightbox.getBoundingClientRect().height;
      let percentageX = (mouseX - leftCorner) / boxWidth;
      let percentageY = (mouseY - topCorner) / boxHeight;

      this.glassSize =
        xxlWidth < (window.innerWidth < 1280 ? 624 : 832)
          ? boxWidth / 1.3
          : boxWidth / (xxlWidth / (window.innerWidth < 1280 ? 480 : 640));
      this.glassSizeHeight =
        xxlHeight < 572 ? boxHeight / 1.3 : boxHeight / (xxlHeight / 440);

      if (this.glassSize / this.glassSizeHeight > 1.6)
        this.glassSize = this.glassSizeHeight * 1.6;
      else if (this.glassSizeHeight / this.glassSize > 1.6)
        this.glassSizeHeight = this.glassSize * 1.6;

      this.bgBoxWidth = xxlWidth / (boxWidth / this.glassSize);
      this.bgBoxHeight = xxlHeight / (boxHeight / this.glassSizeHeight);

      if (mouseX > leftCorner + boxWidth - this.glassSize / 2)
        this.glassPositionLeft =
          leftCorner - leftOuterCorner + boxWidth - this.glassSize;
      else if (mouseX < leftCorner + this.glassSize / 2)
        this.glassPositionLeft = leftCorner - leftOuterCorner;
      else
        this.glassPositionLeft = mouseX - leftOuterCorner - this.glassSize / 2;

      if (mouseY > topCorner + boxHeight - this.glassSizeHeight / 2)
        this.glassPositionTop =
          topCorner - topOuterCorner + boxHeight - this.glassSizeHeight;
      else if (mouseY < topCorner + this.glassSizeHeight / 2)
        this.glassPositionTop = topCorner - topOuterCorner;
      else
        this.glassPositionTop =
          mouseY - topOuterCorner - this.glassSizeHeight / 2;

      this.resultX =
        xxlWidth * percentageX - this.bgBoxWidth / 2 > 0
          ? xxlWidth * percentageX + this.bgBoxWidth / 2 < xxlWidth
            ? xxlWidth * percentageX - this.bgBoxWidth / 2
            : xxlWidth - this.bgBoxWidth
          : 0;
      this.resultY =
        xxlHeight * percentageY - this.bgBoxHeight / 2 > 0
          ? xxlHeight * percentageY + this.bgBoxHeight / 2 < xxlHeight
            ? xxlHeight * percentageY - this.bgBoxHeight / 2
            : xxlHeight - this.bgBoxHeight
          : 0;
    },
    zoomLeave() {
      this.zoomActive = false;
      this.glassPositionLeft = 0;
      this.glassPositionTop = 0;
    },
  },
};
</script>

<style scoped>
.bg-image-wrapper {
  height: 340px;
}
.zoom-glass {
  background: linear-gradient(90deg, black 5px, transparent 1%) center,
    linear-gradient(black 5px, transparent 1%) center, #fff;
  background-size: 6px 6px;
}
.zoom-wrapper {
  left: 101%;
  background-color: white;
  box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.2);
}
.zoom-content-wrapper {
  height: 100%;
  width: 100%;
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
.fade-enter-active {
  transition: 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
