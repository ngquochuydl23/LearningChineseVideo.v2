import axios from "axios"
import _ from "lodash";

export const http = axios.create({
    //baseURL: 'https://localhost:7183/api/'
    //baseURL: 'https://clothes-dev.social-v2.com/api/',
    baseURL: process.env.NEXT_PUBLIC_API_END_POINT
})

export const saveAccessToken = (accessToken) =>
    localStorage.setItem('accessToken', accessToken)

export const getAccessToken = () =>
    localStorage.getItem('accessToken')

export const clearAccessToken = () =>
    localStorage.removeItem('accessToken')


async function onFulfilledReq(config) {
    const accessToken = getAccessToken();

    config.headers['Authorization'] = `Bearer ${accessToken}`
    config.headers['Content-Type'] = `application/json-patch+json;charset=utf-8`
    config.headers['accept'] = `*/*`
    return config;
}

async function onRejectedReq(error) {
    console.log(error)
    return Promise.reject(error);
}


async function onFulfilledRes(response) {
    return response.data.result;
}

async function onRejectedRes(error) {
    if (_.has(error, 'response.data.error')) {

        const resError = _.get(error, 'response.data.error')
        console.log("http.interceptors.response", { resError })
        const dispatch = _.get(global, 'dispatch')
        //dispatch?.(globalErrorActions.pushResponseError(resError))
        return Promise.reject(resError)
    }
    return Promise.reject(error);
}


http.interceptors.request.use(onFulfilledReq, onRejectedReq);
http.interceptors.response.use(onFulfilledRes, onRejectedRes);
