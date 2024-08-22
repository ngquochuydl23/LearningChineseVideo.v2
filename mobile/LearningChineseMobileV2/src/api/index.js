import axios from "axios"
import _ from "lodash";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const http = axios.create({
    baseURL: 'https://v2.hayugo.edu.vn/api/'
    //baseURL: 'http://192.168.1.11:7700/api/'
})

http.interceptors.request.use(async function (config) {
    const accessToken = await AsyncStorage.getItem('AccessToken');

    config.headers['Authorization'] = `Bearer ${accessToken}`
    config.headers['Content-Type'] = `application/json`
    config.headers['accept'] = `*/*`
    config.headers['X-Requested-With'] = `XMLHttpRequest`
    return config;
}, function (error) {

    console.log(error)
    return Promise.reject(error);
});


http.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (_.has(error, 'response.data.error')) {
        console.log(error)
        const responseErr = _.get(error, 'response.data.error')
        console.log("http.interceptors.response", { responseErr })
        return Promise.reject(responseErr)
    }
    return Promise.reject(error);
});


