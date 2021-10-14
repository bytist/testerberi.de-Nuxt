<template>
    <div id="shop">
        <div class="shop-page px-3 pt-2 mb-12">
            <div class="container mx-auto">
                <Breadcrumb :link-array="linkData" />
                <div class="shop-wrapper mt-6">
                    <div class="header-wrapper">
                        <div class="text-22 font-normal text-tb-black">
                            {{`${$route.params.shopName[0].toUpperCase()}${$route.params.shopName.slice(1)}`}}
                        </div>
                    </div>
                    <div v-if="loadDone" class="mt-3 grid grid-cols-4 gap-6 xl:gap-8">
                        <div>
                            <CompanyCard :data="shopData.contentTopBox" class="mb-5" />
                            <ReviewCard
                                :reviews-by-score="shopData.contentTopBox.contentSterneListe"
                                :reviews-by-detail="shopData.contentTopBox.contentBewertungDetails"
                            />
                        </div>
                        <div v-if="shopData.contentBewertungen.contentBewertungenList.length" class="col-span-3">
                            <FeaturedReviewCard
                            :first-opinion="firstOpinion"
                            :last-opinion="lastOpinion"
                                class="pb-1"
                            />
                            <ReviewsCard
                                :totalReviews="shopData.contentBewertungen.anzahlBewertungen"
                                :reviews="shopData.contentBewertungen.contentBewertungenList"
                                :totalPages="shopData.totalPages"
                                @paginate="doPaginate"
                                class="pt-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Breadcrumb from "@/components/widget/Breadcrumb";
import CompanyCard from "@/components/shop/CompanyCard";
import ReviewCard from "@/components/shop/ReviewCard";
import FeaturedReviewCard from "@/components/shop/FeaturedReviewCard";
import ReviewsCard from "@/components/shop/ReviewsCard";

import shopData from "@/json/shopData.json";

import { getShopDetails } from "@/services/service";

export default {
    name: "Shop",
    scrollToTop: true,
    components: {
        Breadcrumb,
        CompanyCard,
        ReviewCard,
        FeaturedReviewCard,
        ReviewsCard,
    },
    data() {
        return {
            linkData: [
                {
                    url: "/",
                    label: "Shops",
                },
                {
                    url: "/",
                    label: `${this.$route.params.shopName[0].toUpperCase()}${this.$route.params.shopName.slice(1)}`,
                },
            ],
            shopData: shopData,
            loadDone: false,
            firstOpinion: null,
            lastOpinion: null
        };
    },
    watch: {
        "$route.params": {
            deep: true,
            immediate: true,
            handler: function () {
                this.getShopDetails();                
            }
        },
    },
    methods: {
        getShopDetails() {
            getShopDetails(this.$route.params.shopName)
            .then(res => {
                this.shopData = res;
                if (this.shopData.contentBewertungen.contentBewertungenList.length) {
                    this.firstOpinion = this.shopData.contentBewertungen.contentBewertungenList[this.shopData.contentBewertungen.firstOpinion - 1];
                    this.lastOpinion = this.shopData.contentBewertungen.contentBewertungenList[this.shopData.contentBewertungen.lastOpinion - 1];
                }
                this.shopData.contentTopBox.contentSterneListe.reverse();
                this.loadDone = true;
            }, err => {
                console.log(err);
            })
        },
        doPaginate(pageIndex) {
            getShopDetails(this.$route.params.shopName + '/' + pageIndex)
            .then(res => {
                this.shopData.totalPages = res.totalPages;
                this.shopData.contentBewertungen.contentBewertungenList = res.contentBewertungen.contentBewertungenList;
            }, err => {
                console.log(err);
            })
        }
    },

};
</script>

<style>
</style>