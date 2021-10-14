const state = () => ({
    totalMenuCategory: [],
    navbarMenuCategory: []
});

const getters = {
    getTotalMenuCategory: state => state.treeStructureCategory,
    getNavbarMenuCategory: state => state.navbarMenuCategory
};

const actions = {
    changeTotalMenuCategory({ commit }, data) {
        commit("addTotalMenuCategory", data);
    },

    changeNavbarMenuCategory({ commit }, data) {
        commit("addNavbarMenuCategory", data);
    }
};

const mutations = {
    addTotalMenuCategory(state, data) {
        state.treeStructureCategory = data;
    },

    addNavbarMenuCategory(state, data) {
        state.navbarMenuCategory = data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
