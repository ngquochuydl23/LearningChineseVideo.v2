import { http } from ".";

export const getVideos = (level, offset, limit) => http.get('video', {
    params: { offset, limit, level }
});

export const getVideoById = (videoId) => http.get('video/' + videoId);