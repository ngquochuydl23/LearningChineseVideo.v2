import { http } from ".";

export const getVideos = (level, offset, limit) => http.get('video', {
    params: { offset, limit, level }
});

export const searchVideo = (search, level, offset, limit) => http.get('video', {
    params: { offset, limit, level, search }
});


export const getVideoById = (videoId) => http.get('video/' + videoId);