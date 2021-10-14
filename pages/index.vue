<template>
  <div id="Home">
    <div class="slider-wrapper">
      <HomeSwiper />
    </div>
    <div class="popular-categories-wrapper px-3">
      <HomePopularCategory />
    </div>
    <div class="top-product-wrapper mt-12 px-3">
      <HomeProductSlider />
    </div>
    <div class="compare-section mt-10 px-3">
      <HomeCompare />
    </div>
    <div class="why-us-section mt-16 pb-12 bg-tb-border px-3">
      <HomeWhy />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
