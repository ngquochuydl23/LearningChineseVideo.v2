import axios from "axios";
import _ from "lodash";

const http = axios.create({ baseURL: 'https://v2.hayugo.edu.vn/api' });

http.interceptors.request.use(async function (config) {
    config.headers['Content-Type'] = `multipart/form-data`
    config.headers['Access-Control-Allow-Origin'] = `*`
    config.headers['Access-Control-Allow-Credentials'] = `true`
    config.headers['Access-Control-Allow-Methods'] = `*`
    config.headers['Access-Control-Allow-Headers'] = `*`

    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
    return response.data.result;
}, function (error) {
    if (_.has(error, 'response.data.error')) {


        const resError = _.get(error, 'response.data.error')
        const dispatch = _.get(global, 'dispatch')
        console.log({ error })
        return Promise.reject(resError)
    }
    return Promise.reject(error);
});

export const uploadFile = (file, progress, source) => {
    return uploadFiles(new Array(file), progress);
}

/***
 * progress?: (loaded: number, total: number)
 */
export const uploadFiles = (files, progress, source) => {
    var bodyFormData = new FormData();

    files.forEach(file => {
        if (Boolean(file)) {
            bodyFormData.append('', file);
        }
    });

    return http.post('storage/upload', bodyFormData
        //     , {
        //     cancelToken: source?.token,
        //     onUploadProgress: progressEvent => {
        //         if (progress)
        //             progress(progressEvent.loaded, progressEvent.total)
        //     }
        // }
    );
}