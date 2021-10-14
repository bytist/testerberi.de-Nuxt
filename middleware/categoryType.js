export default async function ({ store, redirect, route }) {

    store.dispatch('categoryData/getSubCategories', route.params.categoryId)
    console.log("MIDDLEWASRE", route.params.categoryId)
}
