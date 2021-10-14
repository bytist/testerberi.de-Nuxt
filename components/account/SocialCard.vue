<template>
    <div id="social-card-component">
        <div class="rounded border border-tb-primary-dark py-3 xl:py-6 px-3 xl:px-6">
            <p class="text-22 text-tb-black font-normal">Social Networks</p>
            <p
                class="text-tb-primary-dark mt-1 leading-snug"
            >Connect your facebook, google email accounts to login quickly.</p>
            <p class="text-tb-black mt-6">Connect to facebook</p>
            <SocialCardItem :network="'facebook'" :connected="true" class="mt-2" />
            <p class="text-tb-black mt-5">Connect to Gmail</p>
            <SocialCardItem :network="'gmail'" :connected="false" class="mt-2" />
        </div>
    </div>
</template>

<script>
import SocialCardItem from "@/components/account/SocialCardItem";

export default {
    name: "SocialCard",
    components: {
        SocialCardItem,
    },
};
</script>

<style>
</style>