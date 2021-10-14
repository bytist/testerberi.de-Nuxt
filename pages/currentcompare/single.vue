<template>
    <div id="compare-detail">
        <div class="compare-detail-page px-3 pt-2 mb-12">
            <div class="container mx-auto">
                <Breadcrumb :link-array="linkArray" />
                <div class="compare-detail-wrapper mt-6">
                    <div class="head-wrapper">
                        <p class="text-22 text-tb-black font-normal">
                            6 aktuelle Desktop-Prozessoren im Test
                        </p>
                    </div>
                    <div class="grid grid-cols-4 gap-6 xl:gap-8 mt-4">
                        <div>
                            <div class="rounded bg-tb-primary p-6 xl:p-8">
                                <div class="logo-wrapper h-10">
                                    <img
                                        src="~/assets/images/company/logo-1.png"
                                        class="max-h-full max-w-full"
                                        alt="PCgo"
                                    />
                                </div>
                                <p class="mt-3 text-base text-tb-black">
                                    04/2021 - PCgo
                                </p>
                                <p
                                    class="mt-2 leading-5 text-base text-tb-black"
                                >
                                    Die Geschichte "David gegen Goliath" ist
                                    bekannt wie ein weit verbreitetes Klischee,
                                    David siegt am Ende über den scheinbar
                                    übermächtigen Goliath. Hier kann man aktuell
                                    bestens eine Parallele zum Kampf um die
                                    Prozessor-Krone zwischen AMD und Intel
                                    ziehen. Intel als "Goliath" war lange Zeit
                                    kaum zu schlagen, AMD fordert den Riesen mit
                                    seinen neuen Desktop-PCs als "David" aber in
                                    jedem Fall heraus. Ob es am Ende auch zum
                                    Sieg reicht, verrät der aktuelle Test von
                                    PCgo.
                                    <br />
                                    <br />
                                    "AMD legt mit neuen Desktop-CPUs nach: Die
                                    Rechenknechte kommen mit neuer
                                    Zen-3-Architektur und sind alle mit freiem
                                    Multiplikator. Ob Platzhirsch Intel dagegen
                                    halten kann, und wie Sie die richtige CPU
                                    für Ihren Zweck finden, lesen Sie in diesem
                                    Vergleichstest."
                                </p>
                            </div>
                        </div>
                        <div class="col-span-3">
                            <div class="bg-tb-primary p-6 xl:p-8 grid gap-6 xl:gap-8">
                                <CompareItem v-for="(item, index) in compareDetail" :key="index" :data="item" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/widget/Breadcrumb";
import CompareItem from '@/components/compareDetail/CompareItem';

import compareDetail from '@/json/compareDetail';

export default {
    name: "CompareDetail",
    components: {
        Breadcrumb,
        CompareItem
    },
    data() {
        return {
            linkArray: [
                {
                    url: "/",
                    label: "PCgo",
                },
                {
                    url: "/",
                    label: "Ausgabe 04/2021",
                },
                {
                    url: "/",
                    label: "6 aktuelle Desktop-Prozessoren im Test",
                },
            ],
            compareDetail
        };
    },
};
</script>

<style>
</style>