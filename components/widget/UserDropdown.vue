<template>
    <div id="user-dropdown-component">
        <div
            ref="dropdownArea"
            @mouseleave="$emit('close')"
            class="user-dropdown text-tb-primary-dark rounded bg-white tb-shadow-4"
        >
            <NuxtLink to="/account/myaccount">
                <div
                    @click="closeSelf"
                    class="cursor-pointer flex px-4 py-2 items-center hover:text-tb-blue group border-b border-tb-border"
                >
                    <div class="w-5 text-center mt-px">
                        <span class="icn-login"></span>
                    </div>
                    <span class="ml-3 font-normal">My Account</span>
                </div>
            </NuxtLink>
            <NuxtLink to="/account/review">
                <div
                    @click="closeSelf"
                    class="cursor-pointer flex px-4 py-2 items-center hover:text-tb-blue group border-b border-tb-border"
                >
                    <div class="w-5 text-center mt-px">
                        <span class="icn-reviews"></span>
                    </div>
                    <span class="ml-3 font-normal">My Reviews</span>
                </div>
            </NuxtLink>
            <NuxtLink to="/account/subscription">
                <div
                    @click="closeSelf"
                    class="cursor-pointer flex px-4 py-2 items-center hover:text-tb-blue group border-b border-tb-border"
                >
                    <div class="w-5 text-center mt-px">
                        <span class="icn-subscription"></span>
                    </div>
                    <span class="ml-3 font-normal">Subscription</span>
                </div>
            </NuxtLink>
            <NuxtLink to="/account/pricealarm">
                <div
                    @click="closeSelf"
                    class="cursor-pointer flex px-4 py-2 items-center hover:text-tb-blue group border-b border-tb-border"
                >
                    <div class="w-5 text-center mt-px">
                        <span class="icn-pricealarm"></span>
                    </div>
                    <span class="ml-3 font-normal">Price alarm</span>
                </div>
            </NuxtLink>
            <div @click="doLogout" class="cursor-pointer flex px-4 py-2 items-center">
                <div class="w-5 text-center mt-px">
                    <span class="icn-logout"></span>
                </div>
                <span class="ml-3 font-normal text-tb-red">Log out</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserDropdown",
    data() {
        return {};
    },
    props: ["userBtnRef"],
    methods: {
        doLogout() {
            this.$emit("logout");
        },
        closeSelf() {
            this.$emit("close");
        },
        closeDropdown(e) {
            if (
                !this.$refs.dropdownArea.contains(e.target) &&
                !this.userBtnRef.contains(e.target)
            ) {
                console.log("!!!");
                this.$emit("close");
            }
        },
    },
    beforeMount() {
        window.addEventListener("click", this.closeDropdown);
    },
    beforeDestroy() {
        window.removeEventListener("click", this.closeDropdown);
    },
};
</script>

<style>
</style>