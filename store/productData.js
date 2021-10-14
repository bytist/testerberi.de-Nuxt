import {
    getBoxSummary,
    getTopProductBox,
    getTestsBox,
    getMeinungenBox,
    getFragenBox,
    getInformationenBox,
    getAngeboteBox,
    getMoreSearch,
} from "@/services/service";

const state = () => ({
    productLoading: false,
    productPricing: {
        name: "",
        priceRange: {
            min: 0,
            max: 0,
        },
        class: "",
        percentage: 0,
        test: 0,
        testNoteText: "",
        offer: 0,
        totalOffers: 0,
        rate: 0,
    },
    productGallery: [],
    productVideo: "",
    productDescription: [],
    topProduct: [],
    consumerMagazine: {
        customerReviews: [],
        customerPros: [],
        customerCons: [],
        customerFeedback: [],
    },
    productReview: {
        averageRating: 0,
        countPerRating: [],
        opinion: {
            total: 0,
            from: [],
            date: "",
        },
        reviews: {
            pageNumber: 0,
            totalPages: 0,
            result: [],
        },
        questions: {
            total: 0,
            result: [],
        },
        categoryQuestions: [],
    },
    productDetail: [],
    extraProduct: [],
    productOffers: [],
    popularOffers: [{
        price: 0,
        shipping: 0,
        shippingPeriod: '',
        logo: '',
        shopURL: '',
        dummy: true
    },],
    moreSearch: []
});

const getters = {
    productTitle: (state) => state.productPricing.name,

    productDescriptionBreakPoint: state => (state.productDescription.length + 1) / 2,

    productPopularOffers: (state) => state.productOffers,
    popularOffers: (state) => state.popularOffers,
    productLoading: (state) => state.productLoading,
    productVideo: (state) => state.productVideo,
    moreSearch: (state) => state.moreSearch
};

const actions = {
    addMoreSearch({ commit }, data) {
        getMoreSearch(data)
            .then((res) => {
                let moreSearch = [];
                if (res.filter) {
                    res.filter.forEach(item => {
                        moreSearch.push({
                            title: item.titleShow,
                            link: item.filterLink
                        })
                    });
                    commit("ADD_MORE_SEARCH", moreSearch);
                }
            }, (err) => {
                console.log(err);
            })
    },
    updateProductLoading({ commit }, data) {
        commit("UPDATE_PRODUCT_LOADING", data);
    },
    sortProductReview({ commit, state }, data) {
        let reviewsList = state.productReview.reviews.result.slice();
        switch (data) {
            case 0:
                reviewsList.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0))
                break;
            case 1:
                reviewsList.sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))
                break;
            case 2:
                reviewsList.sort((a, b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0))
                break;

            default:
                break;
        }
        commit("SORT_PRODUCT_REVIEW", reviewsList);
    },
    addBoxSummary({ commit }, data) {
        getBoxSummary(data)
            .then((res) => {
                let galleryImages = [];
                let descriptions = [];
                let extraProduct = [];

                const pricingData = {
                    name: res.produktName,
                    priceRange: {
                        min: parseFloat(res.besterPreis.replace(',', '')),
                        max: parseFloat(res.hoherPreis.replace(',', '')),
                    },
                    class: res.eek,
                    percentage: res.testnote,
                    test: res.anzTests,
                    testNoteText: res.testNoteText,
                    offer: res.anzAngebote,
                    totalOffers: res.snippetOfferCount,
                    rate: parseFloat(res.meinungenPunkte),
                };

                commit("ADD_PRODUCT_PRICING", pricingData);

                res.bilder.forEach((item) => {
                    galleryImages.push({
                        srcS: item.srcS,
                        srcL: (item.srcXL || item.srcL || item.srcE),
                        srcXXL: item.srcXXL,
                        sizeXXL: item.sizesXXLJSON
                    });
                });

                commit("ADD_PRODUCT_GALLERY", galleryImages);

                if (res.produktText1) descriptions.push(res.produktText1);
                if (res.produktText2) descriptions.push(res.produktText2);
                if (res.produktText3) descriptions.push(res.produktText3);
                if (res.produktText4) descriptions.push(res.produktText4);

                commit("ADD_PRODUCT_DESCRIPTION", descriptions);


                if (res.contentVarianten.length) {
                    for (const item of res.contentVarianten) {
                        if (!item) continue;
                        extraProduct.push({
                            name: item.produktName,
                            price: parseInt(item.produktPreis),
                            thumbnail: item.bildLink,
                            link: item.produktLink.slice(10),
                            class: "B",
                            percentage: 90,
                            tests: 14,
                            color: "Blue",
                            size: 138,
                            width: 3840,
                            height: 2160,
                            tags: ["HDR", "OLED"],
                            rate: 4.2,
                            rateCount: 34,
                            events: 4,
                        });
                    }
                }

                commit("ADD_EXTRA_PRODUCT", extraProduct);

                commit("ADD_PRODUCT_VIDEO", res.videoID);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    addTopProductBox({ commit }, data) {
        getTopProductBox(data)
            .then((res) => {
                let topProducts = [];
                if (res && Object.keys(res).length !== 0) {
                    res.produkte.forEach((el) => {
                        topProducts.push({
                            name: el.pname,
                            thumbnail: (el.imgL || el.imgE || el.imgXXL),
                            link: el.purl.slice(10),
                            class: "B",
                            percentage: 92,
                            tests: el.tests,
                            color: "grau",
                            size: 138,
                            width: el.imgBreite,
                            height: el.imgBreite,
                            tags: ["HDR", "OLED"],
                            price: el.preis ? parseFloat(el.preis) : 0,
                            rate: el.meinungenscore,
                            rateCount: el.meinungen,
                            events: 4,
                        });
                    });
                }
                commit("ADD_TOP_PRODUCT", topProducts);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    addConsumerMagazine({ commit }, data) {
        getTestsBox(data)
            .then((res) => {
                let consumerMagazine = {
                    customerReviews: [],
                    customerPros: [],
                    customerCons: [],
                    customerFeedback: [],
                };

                for (const [key, value] of Object.entries(res.noten)) {
                    consumerMagazine.customerReviews.push({
                        status: key,
                        p: value.p,
                        a: value.a,
                        c: value.c,
                    });
                }

                if (
                    res.proContraHTML &&
                    "contentProContra" in res.proContraHTML
                ) {
                    consumerMagazine.customerPros =
                        res.proContraHTML.contentProContra.pros;
                    consumerMagazine.customerCons =
                        res.proContraHTML.contentProContra.contras;
                }

                for (const item of res.contentTests) {
                    if (!item.test) continue;

                    consumerMagazine.customerFeedback.push({
                        name: item.test.TESTER,
                        percentage: item.test.TBNOTE,
                        expression: item.test.NOTE,
                        overall: item.test.VONGESAMT,
                        placement: item.test.PLATZIERUNG,
                        video: item.test.videoID,
                        logo: "https://img.testbericht.de/tester/" +
                            item.test.logoURL,
                        date: item.test.DATUM,
                        text: item.test.FAZIT,
                        pros: item.test.PRO.split(" // "),
                        cons: item.test.CONTRA.split(" // "),
                        marks: item.test.details
                    });
                }

                // consumerMagazine.customerFeedback.sort((a, b) => a.percentage > b.percentage ? -1 : (a.percentage < b.percentage ? 1 : 0));

                commit("ADD_CONSUMER_MAGAZINE", consumerMagazine);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    addMeinungenBox({ commit, state }, data) {
        getMeinungenBox(data)
            .then((res) => {
                let productReview = {
                    opinion: {
                        total: 0,
                        from: [],
                        date: "",
                    },
                    reviews: {
                        pageNumber: 0,
                        totalPages: 0,
                        result: [],
                    }
                }
                productReview.countPerRating = [];
                productReview.opinion.from = [];
                productReview.reviews.result = [];

                productReview.averageRating = parseFloat(res.meinungenScore);

                for (const key in res.noten) {
                    if (Object.hasOwnProperty.call(res.noten, key)) {
                        productReview.countPerRating.push(res.noten[key].a);
                    }
                }

                productReview.opinion.total = res.anzahlMeinungen;

                productReview.opinion.from.push({
                    company: "Amazon",
                    count: res.anzahlMeinungenAmazon,
                });

                productReview.opinion.from.push({
                    company: "Otto",
                    count: res.anzahlMeinungenOtto,
                });

                productReview.opinion.date = res.meinungenStand;

                productReview.reviews.pageNumber = res.pageNumber;
                productReview.reviews.totalPages = res.totalPageCount;
                for (const review of res.contentMeinungenList) {
                    productReview.reviews.result.push({
                        rating: review.meinung.meinungstern,
                        title: review.meinung.mtitel,
                        client: review.meinung.anzeigeName,
                        date: review.meinung.meinungDatum,
                        timestamp: new Date(review.meinung.meinungDatum).getTime(),
                        feedback: review.meinung.meinungtext,
                        shopName: (review.meinung.isAmazon ? 'Amazon' : (review.meinung.isOtto ? 'Otto' : 'Other')),
                        reviewLink: 'https://google.com'
                    });
                }

                commit("ADD_PRODUCT_REVIEW", productReview);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    addFragenBox({ commit, state }, data) {
        getFragenBox(data)
            .then((res) => {
                let productReview = {
                    questions: {
                        total: 0,
                        result: [],
                    },
                };
                productReview.questions.result = [];
                productReview.categoryQuestions = [];

                productReview.questions.total = res.anzahlFragen;

                for (const frage of res.contentFragenList) {
                    productReview.questions.result.push({
                        title: frage.frageText,
                        author: frage.frageName,
                        like: frage.bwnUp,
                        dislike: frage.bwnDown,
                        content: frage.contentAntworten.length ?
                            frage.contentAntworten[0] : "",
                        answerCount: frage.anzahlAntworten
                    });
                }

                for (const categoryQuestion of res.contentFragenNeuList.slice(0, 5)) {
                    productReview.categoryQuestions.push({
                        title: categoryQuestion.frageText,
                        product: categoryQuestion.produktName,
                    });
                }

                commit("ADD_QUESTION_LIST", productReview);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    addInformationenBox({ commit }, data) {
        getInformationenBox(data)
            .then((res) => {
                commit("ADD_PRODUCT_DETAIL", res.contentDatenblatt);
            })
            .catch((err) => {
                console.log(err);
            });
    },

    addAngeboteBox({ commit }, data) {
        getAngeboteBox(data)
            .then((res) => {
                let productOffers = [];
                let popularOffers = [];
                if (res) {
                    for (const item of res.offers) {
                        productOffers.push({
                            name: item.offer_label,
                            shop: item.shop,
                            shopName: item.shopName,
                            thumbnail: item.offer_image,
                            delivery: item.verfuegbarkeit,
                            price: item.preisFormat,
                            shipping: item.versandkosten,
                            total: item.totalFormat,
                            stars: parseFloat(item.stars),
                            rateCount: item.bewertungAnzahl,
                            date: item.offer_datum,
                            payment: {
                                amazon: item.isAmazon,
                                amex: item.isAmex,
                                diners: item.isDiners,
                                master: item.isMaster,
                                nachnahme: item.isNachnahme,
                                paypal: item.isPaypal,
                                visa: item.isVisa,
                            }
                        });
                        if (item.topProduct) {
                            popularOffers.push({
                                badge: {
                                    color: "green",
                                    text: item.shopName,
                                },
                                logo: item.shopLogoSVG || item.shopLogo,
                                price: parseFloat(item.preisFormat),
                                shipping: parseFloat(
                                    item.versandkostenFormat.split(" ")[0]
                                ),
                                shopURL: item.shop.link,
                                shippingPeriod: item.verfuegbarkeit
                            });
                        }
                    }
                }

                commit("ADD_PRODUCT_OFFERS", productOffers);
                commit("ADD_POPULAR_OFFERS", popularOffers);
            })
            .catch((err) => {
                console.log(err);
            });
    },
};

const mutations = {
    ADD_MORE_SEARCH(state, payload) {
        state.moreSearch = payload.slice();
    },
    ADD_PRODUCT_VIDEO(state, payload) {
        state.productVideo = payload;
    },
    SORT_PRODUCT_REVIEW(state, payload) {
        state.productReview.reviews.result = payload.slice();
    },
    UPDATE_PRODUCT_LOADING(state, payload) {
        state.productLoading = payload;
    },
    ADD_PRODUCT_PRICING(state, payload) {
        // state.productPricing = payload;
        state.productPricing = Object.assign(state.productPricing, payload)
    },

    ADD_PRODUCT_GALLERY(state, payload) {
        state.productGallery = payload.slice();
    },

    ADD_PRODUCT_DESCRIPTION(state, payload) {
        state.productDescription = payload.slice();
    },

    ADD_TOP_PRODUCT(state, payload) {
        state.topProduct = payload.slice();
    },

    ADD_CONSUMER_MAGAZINE(state, payload) {
        // state.consumerMagazine = payload;
        state.consumerMagazine = Object.assign(state.consumerMagazine, payload)
    },

    ADD_PRODUCT_REVIEW(state, payload) {
        // state.productReview = payload;
        state.productReview = Object.assign(state.productReview, payload)
    },

    ADD_QUESTION_LIST(state, payload) {
        // state.productReview = payload;
        state.productReview = Object.assign(state.productReview, payload)
    },

    ADD_PRODUCT_DETAIL(state, payload) {
        state.productDetail = payload.slice();
    },

    ADD_EXTRA_PRODUCT(state, payload) {
        state.extraProduct = payload.slice();
    },

    ADD_PRODUCT_OFFERS(state, payload) {
        state.productOffers = payload.slice();
    },
    ADD_POPULAR_OFFERS(state, payload) {
        state.popularOffers = payload.slice();
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
