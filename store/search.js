import { getProductSearchDetailById } from "@/services/service";

const state = () => ({
    productsArray: (process.browser ? JSON.parse(localStorage.getItem('searchProductsArray')) : [])
})

const actions = {
    async getProductById({ commit, state }, pId) {
        let result = null;
        if (state.productsArray) {
            result = state.productsArray.find(element => element.id === pId);
        } else {
            state.productsArray = [];
        }
        if (result != null) {
            return result;
        }
        else {
            let response = await getProductSearchDetailById(pId);
            result = {
                id: pId,
                data: response || null
            };
            commit("ADD_NEW_PRODUCTDATA", result);
            return result;
        }
    }
}

const mutations = {
    ADD_NEW_PRODUCTDATA(state, payload) {
        state.productsArray.push(payload);
        localStorage.setItem('searchProductsArray', JSON.stringify(state.productsArray));
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};