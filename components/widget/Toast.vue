<template>
    <div
        v-on:click="$emit('close')"
        id="toast-component"
        :style="'background: ' + color + ';' + ' box-shadow: 0 0 3px ' + color + ';'"
        class="fixed rounded py-3 px-5 cursor-pointer"
    >
        <p class="text-white">{{text}}</p>
    </div>
</template>

<script>
export default {
    name: "Toast",
    props: ["text", "color"],
    data() {
        return {
            setto: null
        }
    },
    mounted() {
        this.setto = setTimeout(() => {
            this.$emit("close");
        }, 2000);
    },
    beforeDestroy() {
        clearTimeout(this.setto)
    }
};
</script>

<style scoped>
#toast-component {
    top: 194px;
    left: 50%;
    transform: translateX(-50%);
}
@media screen and (min-width: 1280px) {
    #toast-component {
        top: 210px;
    }
}
</style>