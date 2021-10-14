<template>
    <div id="product-sub-detail" class="mt-10">
        <p class="text-tb-blue font-normal text-22">{{ title }}</p>
        <div
            v-for="(item, index) in data"
            :key="index"
            class="flex py-3 border-b gap-2 border-tb-border last:border-transparent"
        >
            <div class="w-1/2 xl:w-2/5 text-tb-primary-dark">{{ item.label }}</div>
            <div class="w-full">
                <span
                    v-for="(subItem, id) in item.attribut.split(',')"
                    :key="id"
                    class="text-tb-black font-normal"
                    >{{ id > 0 ? ", " : "" }}{{ subItem.trim() }}</span
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductSubDetail",
    props: {
        detailData: {
            type: Object,
            required: true,
        },
    },
    computed: {
        title: function () {
            return this.detailData.sectionName;
        },
        data: function () {
            return this.detailData.entries;
        },
    },
};
</script>

<style></style>
