<template>
    <div id="leave-feedback-lightbox-component" class="fixed top-0 left-0 w-full h-full z-40">
        <div class="relative h-full w-full flex items-center justify-center">
            <div
                v-on:click="$emit('close')"
                class="absolute h-full w-full top-0 left-0 bg-tb-primary-dark opacity-50"
            ></div>
            <div class="rounded lightbox-item bg-tb-primary px-3 xl:px-6 relative tb-shadow-2">
                <LeaveFeedback :data="data" />
                <div
                    v-on:click="$emit('close')"
                    class="close-btn absolute top-0 right-0 transform -translate-x-4 text-3xl text-tb-dark-red hover:text-red-800 cursor-pointer"
                >&times;</div>
            </div>
        </div>
    </div>
</template>

<script>
import LeaveFeedback from "@/components/product/reviews/LeaveFeedback";


export default {
    name: "LeaveFeedbackLightbox",
    components: {
        LeaveFeedback,
    },
    props: ["data"],
    mounted() {
                document.getElementsByTagName("BODY")[0].classList.add('overflow-hidden-i');
    },
    beforeDestroy() {
                document.getElementsByTagName("BODY")[0].classList.remove('overflow-hidden-i');
    },
};
</script>

<style scoped>
.lightbox-item {
    width: 690px;
}
</style>