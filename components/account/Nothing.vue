<template>
    <div id="nothing-component">
        <div
            class="rounded bg-tb-primary flex justify-center items-center flex-col h-56 xl:h-64"
        >
            <img
                :src="require('../../assets/images/' + icon + '.svg')"
                class="w-16 transform scale-95"
                alt=""
            />
            <p class="text-22 font-normal text-tb-black mt-3">
                Currently no
                {{ name }}
                set
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Nothing",
    props: {
        icon: {
            type: String,
        },
        name: {
            type: String,
        },
    },
};
</script>

<style>
</style>