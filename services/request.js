import axios from "axios"
import { API_BASE_URL, API_BEARER_TOKEN, SEARCH_BASE_URL } from '@/common/constant.js';

const headers = {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Authorization': API_BEARER_TOKEN
}

const options = {
    headers: headers,
    responseType: 'json'
}

export const getRequest = (endpoint) => {
    const requestUrl = `${API_BASE_URL}${endpoint}`;

    return new Promise((resolve, reject) => {
        axios.get(
            requestUrl,
            options
        ).then(res => {

            resolve(res.data);
        }, (error) => {

            reject(error);
        });
    });
}

export const postRequest = (endpoint, data) => {
    const requestUrl = `${API_BASE_URL}${endpoint}`;

    return new Promise((resolve, reject) => {
        axios.post(
            requestUrl,
            data,
            options
        ).then(res => {

            resolve(res.data);
        }, (error) => {

            reject(error);
        });
    });
}

export const searchRequest = (endpoint, data) => {
    const requestUrl = `${SEARCH_BASE_URL}${endpoint}`;

    return new Promise((resolve, reject) => {
        axios.post(
            requestUrl,
            data,
            options
        ).then(res => {

            resolve(res.data);
        }, (error) => {

            reject(error);
        });
    });
}