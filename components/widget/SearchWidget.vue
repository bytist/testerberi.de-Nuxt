<template>
    <div
        class="search-widget bg-white flex rounded-full tb-shadow-filter hover:tb-shadow-1 transition-shadow duration-150 py-2 pl-6 xl:py-3 xl:pl-8 cursor-pointer"
        @click="$emit('showSearch')"
        @mouseover="iconAnim = true"
        @mouseout="iconAnim = false"
    >
        <input
            v-model="searchKey"
            ref="searchInputField"
            type="text"
            placeholder="Search for.."
            class="w-full outline-none placeholder-tb-primary-dark bg-transparent cursor-pointer caret-transparent"
        />
        <div
            class="search-widget-btn bg-tb-blue rounded-full absolute top-center transform -translate-y-1/2 right-0 object-center cursor-pointer transition duration-75 hover:bg-tb-blue-dark"
        >
            <div class="w-full h-full flex items-center justify-center">
                <img
                    src="~/assets/images/search.svg"
                    alt
                    class="origin-center"
                    :class="iconAnim && 'search-widget-icon'"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchWidget",
    data() {
        return {
            searchKey: "",
            iconAnim: false,
        };
    },
    methods: {},
};
</script>

<style scoped>
.fade-enter-active {
    transition: 0.2s;
    transition-delay: 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.search-widget-icon {
    animation: searchicon 3.9s ease-in-out 0s infinite normal both;
}
@keyframes searchicon {
    0% {
        transform: scale(1);
    }
    10% {
        transform: scale(1.3);
    }
    24% {
        transform: scale(1.3) rotate(0deg);
    }
    26% {
        transform: scale(1.3) rotate(12deg);
    }
    30% {
        transform: scale(1.3) rotate(-12deg);
    }
    34% {
        transform: scale(1.3) rotate(12deg);
    }
    36% {
        transform: scale(1.3) rotate(0deg);
    }
    50% {
        transform: scale(1.3);
    }
    60% {
        transform: scale(1);
    }
    100% {
        transform: scale(1);
    }
}
</style>
