<template>
  <div id="PageNotFound">
    <div class="page-not-found-component px-3">
      <div class="container mx-auto">
        <div class="flex justify-center mt-0 xl:mt-4 py-8">
          <div class="rounded-full circle-xxl bg-tb-primary overflow-hidden">
            <p
              class="text-center text-7xl font-normal text-tb-black leading-none mt-12"
            >
              {{error.statusCode}}
            </p>
            <p
              class="text-center text-26 font-normal leading-none -mt-1 text-tb-black"
            >
              Something went wrong
            </p>
            <div>
              <div class="w-full relative plug-wrapper mt-5 mx-auto">
                <img
                  src="~/assets/images/unplugged-left.svg"
                  alt=""
                  class="absolute top-0 plug-left"
                />
                <img
                  src="~/assets/images/unplugged-right.svg"
                  alt=""
                  class="absolute top-0 plug-right"
                />
              </div>
            </div>
            <div class="flex justify-center mt-8">
              <router-link to="/" class="main-button font-normal px-6">
                Go back to homepage
              </router-link>
            </div>
          </div>
        </div>
        <HomeProductSlider class="-mt-3 mb-6" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  props: ['error'],
};
</script>

<style scoped>
.circle-xxl {
  height: 450px;
  width: 450px;
}
.text-7xl {
  font-size: 76px;
}
.text-26 {
  font-size: 26px;
}
.plug-left,
.plug-right,
.plug-wrapper {
  height: 139px;
}
.plug-left {
  left: -10%;
}
.plug-right {
  right: -10%;
}
.plug-wrapper {
  animation: plugsin 4s ease-in-out 0s infinite normal both;
}
@keyframes plugsin {
  0% {
    width: 100%;
  }
  25% {
    width: 100%;
  }
  50% {
    width: 90%;
  }
  75% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}
</style>