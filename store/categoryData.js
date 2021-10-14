import { getSubCategories } from '@/services/service'

export const state = () => ({
    productFlag: false,
    paginationData: null,
})

export const actions = {
    getSubCategories: async ({ commit }, url) => {
        while (url.charAt(0) === "/") {
            url = url.substring(1);
        }
        while (url.charAt(url.length - 1) === "/") {
            url = url.slice(0, -1);
        }
        url = url
            .replace(/ /g, "-")
            // .replace(/\//g, "-")
            .replace(/,/g, "-")
            .toLowerCase();

        url = url + "/" + (state.paginationData ? (state.paginationData.pageNumber || 1) : '1');

        if (state.paginationData && state.paginationData.priceRange) {
            url =
                url +
                `?min=${state.paginationData.priceRange[0]}&max=${state.paginationData.priceRange[1]}`;
        }

        let res = await getSubCategories(url);

        let resData = {}

        if (
            Object.prototype.hasOwnProperty.call(
                res,
                "kategorieBoxen"
            )
        ) {
            commit('SET_PRODUCTFLAG', false)

            resData.products = []

            res.kategorieBoxen.forEach((category) => {
                resData.products.push({
                    name: category.kategorieName,
                    thumbnail: category.kategorieBildLink,
                    link: category.kategorieLink,
                    hasSubCats: category.kategorieChildBox.length
                        ? true
                        : false,
                    childCats: category.kategorieChildBox,
                });
            });
        } else {
            commit('SET_PRODUCTFLAG', false)

            const contentProdukte = res.contentProdukte;
            resData.products = [];
            resData.pageNumber = res.currentPage;
            resData.totalPages = res.maxPage;
            resData.guide =
                res.contentText.kategorieText;
            resData.filters = res.contentFilter.filter;
            resData.min = parseInt(
                res.minVal ? res.minVal : 0
            );
            resData.max = parseInt(
                res.maxVal ? res.maxVal : 10000
            );

            contentProdukte.forEach((produkt) => {
                const item = {
                    name: produkt.produktName,
                    link: produkt.produktURL.substring(
                        produkt.produktURL.lastIndexOf("/") + 1
                    ),
                    thumbnail: produkt.produktBildURL,
                    class: produkt.eek,
                    percentage: produkt.score,
                    tests: produkt.anzahlTests,
                    color: produkt.circleColor,
                    size: 138,
                    width: 3840,
                    height: 2160,
                    tags: ["HDR", "OLED"],
                    price: parseInt(produkt.produktPreis),
                    rate: produkt.anzahlSterne,
                    rateCount: produkt.anzahlMeinungen,
                    events: produkt.anzahlAngebote,
                };

                resData.products.push(item);
            });
        }
        commit('SET_PAGINATIONDATA', resData)
    }
}

export const mutations = {
    SET_PRODUCTFLAG(state, payload) {
        state.productFlag = payload
    },
    SET_PAGINATIONDATA(state, payload) {
        state.paginationData = payload
    }
}