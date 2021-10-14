import { getRequest, searchRequest } from './request';


export const getMoreSearch = async (productName) => {
	const requestEndpoint = `product/${productName}/filterkombiBox`;
	return await getRequest(requestEndpoint);
}

export const getShopDetails = async (shopName) => {
	const requestEndpoint = `shop/${shopName}`;
	return await getRequest(requestEndpoint);
}

export const getPopularCategories = async () => {
	const requestEndpoint = "categories/";
	return await getRequest(requestEndpoint);
}

export const getTopProducts = async () => {
	const requestEndpoint = "top-products/";
	return await getRequest(requestEndpoint);
}

export const getLatestComparisons = async () => {
	const requestEndpoint = "latest-comparisons/";
	return await getRequest(requestEndpoint);
}

export const getTopSliders = async () => {
	const requestEndpoint = "top-sliders/";
	return await getRequest(requestEndpoint);
}

export const getSubCategories = async (subCategory) => {
	const requestEndpoint = `category/${subCategory}/`;
	return await getRequest(requestEndpoint);
}

export const getBoxSummary = async (productName) => {
	const requestEndpoint = `product/${productName}/boxSummary`;
	return await getRequest(requestEndpoint);
}

export const getTopProductBox = async (productName) => {
	const requestEndpoint = `product/${productName}/topProdukteBox`;
	return await getRequest(requestEndpoint);
}

export const getTestsBox = async (productName) => {
	const requestEndpoint = `product/${productName}/testsBox`;
	return await getRequest(requestEndpoint);
}

export const getMeinungenBox = async (data) => {
	const requestEndpoint = `product/${data.productName}/meinungenBox/${data.pageNumber}/${data.sortMode}`;
	return await getRequest(requestEndpoint);
}

export const getFragenBox = async (productName) => {
	const requestEndpoint = `product/${productName}/fragenBox`;
	return await getRequest(requestEndpoint);
}

export const getInformationenBox = async (productName) => {
	const requestEndpoint = `product/${productName}/informationenBox`;
	return await getRequest(requestEndpoint);
}

export const getWeitereProdukteBox = async (productName) => {
	const requestEndpoint = `product/${productName}/weitereProdukteBox`;
	return await getRequest(requestEndpoint);
}

export const getAngeboteBox = async (productName) => {
	const requestEndpoint = `product/${productName}/angeboteBox`;
	return await getRequest(requestEndpoint);
}

export const getPressList = async () => {
	const requestEndpoint = `presse`;
	return await getRequest(requestEndpoint);
}

export const getPressContent = async (pressTitle) => {
	const requestEndpoint = `presse/${pressTitle}`;
	return await getRequest(requestEndpoint);
}

export const getProductsByProducer = async (producerName) => {
	const requestEndpoint = `producer/${producerName}`;
	return await getRequest(requestEndpoint);
}

export const getProductsBySearch = async (query) => {
	const requestEndpoint = `products/_search?size=5`;
	let searchQuery = query.trim();
	searchQuery = searchQuery.replace(/\s+/g, "* AND *");
	searchQuery = `*${searchQuery}*`
	let data = {
		query: {
			query_string: {
				fields: [
					'name', 'keyword'
				],
				query: searchQuery
			}
		},
		sort: [
			{ points: { order: "desc" } }
		],
	}
	return await searchRequest(requestEndpoint, data);
}

export const getCategoriesBySearch = async (query) => {
	const requestEndpoint = `categories/_search?size=4`;
	let searchQuery = query.trim();
	searchQuery = searchQuery.replace(/\s+/g, "* OR title:*");
	searchQuery = `title:*${searchQuery}*`
	let data = {
		query: {
			query_string: {
				fields: [
					'title'
				],
				query: searchQuery
			}
		},
	}
	return await searchRequest(requestEndpoint, data);
}

export const getProducersBySearch = async (query) => {
	const requestEndpoint = `producers/_search?size=3`;
	let searchQuery = query.trim();
	searchQuery = searchQuery.replace(/\s+/g, "* OR title:*");
	searchQuery = `title:*${searchQuery}*`
	let data = {
		query: {
			query_string: {
				fields: [
					'title'
				],
				query: searchQuery
			}
		},
	}
	return await searchRequest(requestEndpoint, data);
}

export const getPricesBySearch = async (query) => {
	const requestEndpoint = `prices/_search`;
	let data = {
		query: {
			term: {
				id: query
			}
		}
	}
	return await searchRequest(requestEndpoint, data);
}

export const getKeywordsBySearch = async (query) => {
	const requestEndpoint = `keywords/_search?size=10`;
	let searchQuery = query.trim();
	searchQuery = searchQuery.replace(/\s+/g, "* AND title:*");
	searchQuery = `title:*${searchQuery}*`
	let data = {
		query: {
			query_string: {
				fields: [
					'title'
				],
				query: searchQuery
			}
		},
	}
	return await searchRequest(requestEndpoint, data);
}

export const getProductSearchDetailById = async (id) => {
	const requestEndpoint = `searchPanel?productID=${id}`;
	return await getRequest(requestEndpoint);
}
