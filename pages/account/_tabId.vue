<template>
    <div id="account-component">
        <div class="px-3 mb-12 mt-8">
            <div class="container mx-auto">
                <div
                    class="flex justify-between items-end border-b border-tb-border pb-1"
                >
                    <p class="text-tb-black text-4xl truncate">
                        <b>Welcome</b>
                        {{userData.displayName || 'User'}}
                    </p>
                    <div class="tab-wrapper text-tb-primary-dark -mb-px">
                        <NuxtLink
                            to="/account/myaccount"
                            v-bind:class="{
                                'border-b-3 text-tb-blue':
                                    $route.params.tabId === 'myaccount',
                            }"
                            class="text-22 font-normal mx-0 xl:mx-5 border-tb-blue pb-1 px-4 cursor-pointer"
                            >My Account</NuxtLink
                        >
                        <NuxtLink
                            to="/account/review"
                            v-bind:class="{
                                'border-b-3 text-tb-blue':
                                    $route.params.tabId === 'review',
                            }"
                            class="text-22 font-normal mx-0 xl:mx-5 border-tb-blue pb-1 px-4 cursor-pointer"
                            >My Reviews</NuxtLink
                        >
                        <NuxtLink
                            to="/account/subscription"
                            v-bind:class="{
                                'border-b-3 text-tb-blue':
                                    $route.params.tabId === 'subscription',
                            }"
                            class="text-22 font-normal mx-0 xl:mx-5 border-tb-blue pb-1 px-4 cursor-pointer"
                            >Subscription</NuxtLink
                        >
                        <NuxtLink
                            to="/account/pricealarm"
                            v-bind:class="{
                                'border-b-3 text-tb-blue':
                                    $route.params.tabId === 'pricealarm',
                            }"
                            class="text-22 font-normal mx-0 xl:mx-5 border-tb-blue pb-1 px-4 cursor-pointer"
                            >Price alarm</NuxtLink
                        >
                    </div>
                </div>
                <div class="tab-content-wrapper"></div>
                <div
                    v-if="$route.params.tabId === 'myaccount'"
                    class="flex gap-4 xl:gap-8 mt-8"
                >
                    <MainCard class="w-2/3" />
                    <SocialCard class="w-1/3" />
                </div>
                <div v-if="$route.params.tabId === 'review'">
                    <div v-if="reviewData.length">
                        <MyReview
                            v-for="(item, index) in reviewData"
                            :key="index"
                            :data="item"
                        />
                    </div>
                    <Nothing
                        v-else
                        class="w-full mt-8"
                        :icon="'reviews'"
                        :name="'Reviews'"
                    />
                </div>
                <div v-if="$route.params.tabId === 'subscription'" class="mt-8">
                    <NewsletterBanner />
                    <div v-if="!isEmptyObject(subscriptionData)">
                        <p class="text-22 font-normal text-tb-black mt-8">
                            Category Subscriptions
                        </p>
                        <div class="flex gap-4 xl:gap-8 flex-1 flex-grow mt-8">
                            <CategorySubscriptionCard
                                v-for="(item,
                                index) in subscriptionData.category"
                                :key="index"
                                :data="item"
                                class="h-32 break-every"
                            />
                        </div>
                        <p class="text-22 font-normal text-tb-black mt-8">
                            Products Subscriptions
                        </p>
                        <div class="flex gap-4 xl:gap-8 flex-wrap mt-8">
                            <ProductSubscriptionCard
                                v-for="(item,
                                index) in subscriptionData.product"
                                :key="index"
                                :data="item"
                                class="h-32 break-every"
                            />
                        </div>
                    </div>
                    <Nothing
                        v-else
                        class="mt-8 w-full"
                        :icon="'subscription'"
                        :name="'Subscriptions'"
                    />
                </div>
                <div v-if="$route.params.tabId === 'pricealarm'" class="mt-8">
                    <p class="mt-8 text-22 font-normal text-tb-black">
                        Price alarm
                    </p>
                    <div
                        v-if="pricealarmData.length"
                        class="mt-8 flex gap-4 xl:gap-8 flex-wrap"
                    >
                        <PriceAlarm
                            v-for="(item, index) in pricealarmData"
                            :key="index"
                            :data="item"
                            class="break-every"
                        />
                    </div>
                    <div v-else class="mt-8">
                        <Nothing
                            class="w-full"
                            :icon="'pricealarm'"
                            :name="'Price Alarms'"
                        />
                    </div>
                </div>
                <HomePopularCategory class="mt-8" />
            </div>
        </div>
    </div>
</template>

<script>
import MainCard from "@/components/account/MainCard";
import SocialCard from "@/components/account/SocialCard";
import MyReview from "@/components/account/MyReview";
import NewsletterBanner from "@/components/account/NewsletterBanner";
import CategorySubscriptionCard from "@/components/account/CategorySubscriptionCard";
import ProductSubscriptionCard from "@/components/account/ProductSubscriptionCard";
import PriceAlarm from "@/components/account/PriceAlarm";
import Nothing from "@/components/account/Nothing";

// import accountReviewsJson from "../json/accountReviews.json";
import subscriptionDataJson from "@/json/subscriptionData.json";
import pricealarmJson from "@/json/pricealarm.json";

import {mapGetters} from 'vuex'

export default {
    name: "Account",
    scrollToTop: true,
    data() {
        return {
            reviewData: [],
            subscriptionData: subscriptionDataJson,
            pricealarmData: pricealarmJson,
        };
    },
    components: {
        MainCard,
        SocialCard,
        MyReview,
        NewsletterBanner,
        CategorySubscriptionCard,
        ProductSubscriptionCard,
        PriceAlarm,
        Nothing,
    },
    computed: {
        ...mapGetters('auth', ['userData'])
    },
    methods: {
        isEmptyObject(obj) {
            return JSON.stringify(obj) === "{}";
        },
    },
};
</script>

<style scoped>
.break-every {
    width: calc(33.3333% - 21.4px);
}
@media (max-width: 1279px) {
    .break-every {
        width: calc(33.3333% - 10.7px);
    }
}
.min-h-custom {
    min-height: 500px;
}
</style>