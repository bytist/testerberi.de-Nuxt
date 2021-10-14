<template>
    <div id="category-pagination" class="w-full">
        <transition name="fade">
            <CategorySubCategoryLightbox
                v-if="openSubCategoryLightbox"
                @close="openSubCategoryLightbox = false"
                :name="subCategoryName"
                :link="subCategoryLink"
            />
        </transition>
        <div class="grid gap-2 sm:gap-3 md:gap-4 grid-cols-4">
            <WidgetCategoryCard
                class="h-32 xl:h-40"
                v-for="(item, index) in paginationData.products"
                :key="index"
                :item="item"
                @open-cat-box="openCatBox"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductsPagination",
    props: ["pageData"],
    data() {
        return {
            paginationData: this.pageData,
            hoveringIndex: 9999,
            openSubCategoryLightbox: false,
            subCategoryLink: "",
            subCategoryName: "",
        };
    },
    methods: {
        // myCallback() {
        //     console.log("Paginate");
        // },
        openCatBox(name, link) {
            this.subCategoryName = name;
            this.subCategoryLink = link;
            this.openSubCategoryLightbox = true;
        },
    },
};
</script>

<style>
</style>