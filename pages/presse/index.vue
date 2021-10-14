<template>
    <div id="press-component" class="mb-12">
        <div class="flex justify-center items-center bg-img h-64">
            <p class="text-white font-normal title-bg">Press</p>
        </div>
        <div class="px-3 mt-12">
            <div class="container mx-auto">
                <div class="flex gap-4 xl:gap-6 items-start">
                    <div class="w-full">
                        <PressCard
                            v-for="(item, index) in pressData.slice(
                                0,
                                breakPoint
                            )"
                            :key="index"
                            :data="item"
                            class="w-full flex-1 press-card mb-4 xl:mb-6"
                        />
                    </div>
                    <div class="w-full">
                        <PressCard
                            v-for="(item, index) in pressData.slice(
                                breakPoint,
                                breakPoint * 2
                            )"
                            :key="index"
                            :data="item"
                            class="w-full flex-1 press-card mb-4 xl:mb-6"
                        />
                    </div>
                    <div class="w-full">
                        <PressCard
                            v-for="(item, index) in pressData.slice(
                                breakPoint * 2,
                                pressData.length
                            )"
                            :key="index"
                            :data="item"
                            class="w-full flex-1 press-card mb-4 xl:mb-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PressCard from "@/components/press/PressCard";
// import pressJson from "../json/pressData.json";
import { getPressList } from "@/services/service";

export default {
    name: "Press",
    components: {
        PressCard,
    },
    data() {
        return {
            pressData: [],
            breakPoint: 1,
        };
    },
    created() {
        this.getPressData();
    },
    methods: {
        getPressData() {
            getPressList()
                .then((res) => {
                    this.pressData = res.content;

                    let len = this.pressData.length;
                    let initDivide = len / 3;
                    this.breakPoint =
                        len % initDivide > initDivide / 2
                            ? initDivide + 1
                            : initDivide;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
.title-bg {
    font-size: 56px;
}
.bg-img {
    background-image: url("@/assets/images/press-bg.jpg");
    background-size: cover;
}
@media screen and (min-width: 1280px) {
    .bg-img {
        height: 400px;
    }
}
.press-card {
    flex-basis: 30%;
}
</style>