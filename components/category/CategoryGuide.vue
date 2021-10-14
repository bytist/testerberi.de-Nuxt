<template>
    <div class="bg-tb-border w-full px-3 py-12">
        <div class="container mx-auto">
            <div class="flex justify-between">
                <div
                    class="text-tb-black section-navigation-wrapper rounded bg-white py-4 flex flex-col"
                >
                    <div
                        v-for="(item, index) in guideData"
                        @click="activeSection = index"
                        v-bind:class="
                            activeSection === index
                                ? 'bg-tb-blue text-white'
                                : ''
                        "
                        :key="index"
                        class="section-btn pl-6 pr-4 py-3 cursor-pointer"
                    >
                        {{ item.ueberschrift }}
                    </div>
                </div>
                <div class="section-content-wrapper w-3/4 px-2">
                    <p class="section-title text-22 text-tb-black font-normal">
                        {{ guideData[activeSection].ueberschrift }}
                    </p>
                    <div class="section-content mt-3">
                        <div
                            v-if="typeof guideData[activeSection].kategorieText == 'string'"
                            v-html="guideData[activeSection].kategorieText"
                        ></div>
                        <div v-else>
                            <div class="embed-container w-full">
                                <youtube
                                    ref="galleryplayer"
                                    :video-id="
                                        guideData[activeSection].kategorieText.videoID.slice(
                                            2,
                                            guideData[activeSection].kategorieText.videoID.length - 2
                                        ) + '?controls=0&modestbranding=1'
                                    "
                                    class="w-full"
                                    @ready="playTheVideo"
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
export default {
    name: "CategoryGuide",
    props: ["data"],
    data() {
        return {
            guideData: this.data || [],
            activeSection: 0,
        };
    },
    computed: {
        player() {
            return this.$refs.galleryplayer.player;
        },
    },
    methods: {
        playTheVideo() {
            this.player.playVideo();
        },
    },
};
</script>

<style scoped>
.section-navigation-wrapper {
    width: 24%;
}
.embed-container {
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
}
</style>