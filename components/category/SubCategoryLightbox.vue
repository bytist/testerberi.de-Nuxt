<template>
    <div
        id="sub-category-lightbox"
        class="fixed top-0 left-0 w-full h-full z-40"
    >
        <div class="relative h-full w-full flex items-center justify-center">
            <div
                v-on:click="$emit('close')"
                class="absolute h-full w-full top-0 left-0 bg-tb-primary-dark opacity-50"
            ></div>
            <div
                class="lightbox-item rounded bg-tb-primary py-6 xl:py-8 px-2 xl:px-4 relative tb-shadow-2"
            >
                <div class="sub-category-content-wrapper">
                    <p class="text-22 text-tb-black font-normal px-2 xl:px-3">
                        {{ catName }}
                    </p>
                    <div
                        class="h-125 grid grid-cols-4 gap-4 xl:gap-6 overflow-auto nice-scroll nice-scroll-bg py-4 xl:py-5 px-2 xl:px-3"
                    >
                        <WidgetSubCategoryCard
                            v-for="(item) in data"
                            :key="item.kategorieBildLink"
                            :item="item"
                            @handle-item-click="handleItemClick(item)"
                        />
                    </div>
                </div>
                <div
                    v-on:click="$emit('close')"
                    class="close-btn absolute top-0 right-0 transform -translate-x-4 text-3xl text-tb-dark-red hover:text-red-800 cursor-pointer"
                >
                    &times;
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSubCategories } from "@/services/service";


export default {
    name: "SubCategoryLightbox",
    props: {
        name: {
            type: String,
        },
        link: {
            type: String,
        },
    },
    data() {
        return {
            data: [],
            catLink: this.link,
            catName: this.name,
            loadDone: false,
        };
    },
    watch: {
        link: {
            deep: true,
            immediate: true,
            handler: function () {
                this.loadDone = false;
            },
        },
    },
    mounted() {
        this.getSubCategories();
                document.getElementsByTagName("BODY")[0].classList.add('overflow-hidden-i');
    },
    beforeDestroy() {
                document.getElementsByTagName("BODY")[0].classList.remove('overflow-hidden-i');
    },
    methods: {
        handleItemClick(item) {
            this.catLink = item.kategorieLink;
            this.getSubCategories();
        },
        getSubCategories() {
            if (this.catLink[0] === "/")
                this.catLink = this.catLink.substring(1);
            if (this.catLink[this.catLink.length - 1] === "/")
                this.catLink = this.catLink.slice(0, -1);
            getSubCategories(this.catLink).then((res) => {
                this.data = res.kategorieBoxen;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
};
</script>

<style scoped>
.lightbox-item {
    width: 1200px;
}
.h-125 {
    height: 500px;
}
@media (max-width: 1279px) {
    .lightbox-item {
        width: 990px;
    }
}
</style>