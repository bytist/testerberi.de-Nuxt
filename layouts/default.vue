<template>
  <div>
    <NavNavbar />
    <div class="min-h-screen">
      <div class="pt-20 xl:pt-24">
        <Nuxt />
      </div>
    </div>
    <NavFooter />
    <back-to-top right="24px" bottom="24px" :frame="13">
      <div
        class="
          rounded
          w-12
          h-12
          flex
          justify-center
          items-center
          bg-tb-blue
          hover:bg-tb-blue-dark
        "
      >
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.65699 1.60304L9.65696 1.60307L1.78684 9.47319L1.78679 9.47314L1.78074 9.4794C1.33728 9.93857 1.35 10.6703 1.80918 11.1137C2.25709 11.5464 2.96722 11.5464 3.41513 11.1137L3.41518 11.1138L3.4213 11.1077L10.4742 4.05476L17.5271 11.1077L17.5271 11.1077C17.9785 11.559 18.7102 11.559 19.1615 11.1077L19.1616 11.1076C19.6128 10.6562 19.6129 9.92458 19.1616 9.47322L19.1615 9.47319L11.2914 1.60307L11.2914 1.60302C10.84 1.15179 10.1083 1.15175 9.65699 1.60304Z"
            fill="white"
            stroke="white"
          />
        </svg>
      </div>
    </back-to-top>
  </div>
</template>
<script>
import BackToTop from "@/components/widget/ScrollToTop";
export default {
  head: {
    bodyAttrs: {
      class: "nice-scroll-bg nice-scroll",
    },
  },
  components: {
    BackToTop
  }
};
</script>
<style>
</style>
