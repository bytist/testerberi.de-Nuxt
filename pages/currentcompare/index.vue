<template>
    <div id="current-compare">
        <div class="current-compare-page px-3 pt-2 mb-12">
            <div class="container mx-auto">
                <Breadcrumb :link-array="linkData" />
                <div class="current-compare-wrapper mt-6">
                    <div class="head-wrapper flex items-center py-px my-px">
                        <div class="logo-wrapper h-10 mr-5">
                            <img
                                src="~/assets/images/company/logo-1.png"
                                class="max-h-full w-auto"
                                alt=""
                            />
                        </div>
                        <div class="text-22 font-normal text-tb-black">PCgo</div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <FilterSidebar
                            class="filter-sidebar"
                            :filter-data="currentCompareData.filterData"
                        ></FilterSidebar>
                        <div class="compare-wrapper">
                            <TestDataBox
                                :test-data="currentCompareData.testData"
                                class="mb-8"
                            />
                            <TestBox :test-info="currentCompareData.testInfo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/widget/Breadcrumb";
import FilterSidebar from "@/components/currentCompare/FilterSidebar";
import TestDataBox from "@/components/currentCompare/TestDataBox";
import TestBox from "@/components/currentCompare/TestBox";

import currentCompareData from "@/json/currentCompare";

export default {
    name: "CurrentCompare",
    components: {
        Breadcrumb,
        FilterSidebar,
        TestDataBox,
        TestBox,
    },
    data() {
        return {
            linkData: [
                {
                    url: "/",
                    label: "PCgo",
                },
            ],
            currentCompareData: currentCompareData,
        };
    },
};
</script>

<style scoped>
.filter-sidebar {
    width: 24%;
}
.compare-wrapper {
    width: 74%;
}
</style>