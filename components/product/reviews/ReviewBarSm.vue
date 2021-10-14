<template>
    <div id="review-bar-sm-component" class="h-full">
        <div class="h-full flex flex-col justify-between">
            <div class="flex items-center gap-1">
                <div class="w-40">
                    <span class="text-tb-primary-dark">sehr gut</span>
                </div>
                <div class="w-full rounded-full bg-white progress-bar">
                    <div
                        :style="'width:' + ((data[0] / maxBar) * 100).toFixed(2) + '%;'"
                        class="rounded-full bg-tb-green h-full inter-padding"
                    ></div>
                </div>
                <div class="w-5 relative w-5-5">
                    <span class="text-tb-primary-dark w-full absolute bar-label">
                        {{ data[0] }}
                    </span>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-40">
                    <span class="text-tb-primary-dark">gut</span>
                </div>
                <div class="w-full rounded-full bg-white progress-bar">
                    <div
                        :style="'width:' + ((data[1] / maxBar) * 100).toFixed(2) + '%;'"
                        class="rounded-full bg-tb-light-green h-full inter-padding"
                    ></div>
                </div>
                <div class="w-5 relative w-5-5">
                    <span class="text-tb-primary-dark w-full absolute bar-label">
                        {{ data[1] }}
                    </span>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-40">
                    <span class="text-tb-primary-dark">befriedigend</span>
                </div>
                <div class="w-full rounded-full bg-white progress-bar">
                    <div
                        :style="'width:' + ((data[2] / maxBar) * 100).toFixed(2) + '%;'"
                        class="rounded-full bg-tb-yellow h-full inter-padding"
                    ></div>
                </div>
                <div class="w-5 relative w-5-5">
                    <span class="text-tb-primary-dark w-full absolute bar-label">
                        {{ data[2] }}
                    </span>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-40">
                    <span class="text-tb-primary-dark">ausreichend</span>
                </div>
                <div class="w-full rounded-full bg-white progress-bar">
                    <div
                        :style="'width:' + ((data[3] / maxBar) * 100).toFixed(2) + '%;'"
                        class="rounded-full bg-tb-orange h-full inter-padding"
                    ></div>
                </div>
                <div class="w-5 relative w-5-5">
                    <span class="text-tb-primary-dark w-full absolute bar-label">
                        {{ data[3] }}
                    </span>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-40">
                    <span class="text-tb-primary-dark">mangelhaft</span>
                </div>
                <div class="w-full rounded-full bg-white progress-bar">
                    <div
                        :style="'width:' + ((data[4] / maxBar) * 100).toFixed(2) + '%;'"
                        class="rounded-full bg-tb-red h-full inter-padding"
                    ></div>
                </div>
                <div class="w-5 relative w-5-5">
                    <span class="text-tb-primary-dark w-full absolute bar-label">
                        {{ data[4] }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewBarSm",
    props: ["data"],
    data() {
        return {
            maxBar: 1,
        };
    },
    watch: {
        data: {
            deep: true,
            immediate: true,
            handler: function (val) {
                let tempData = val;
                this.maxBar = Math.max.apply(Math, tempData);
            }
        },
    },
};
</script>

<style scoped>
.progress-bar {
    height: 10px;
}
.bar-label {
    top: 50%;
    transform: translate(0px, -50%);
}
.w-5-5 {
    width: 28px !important;
}
.inter-padding {
    padding: 0 5px;
}
</style>
