import { http } from ".";
export const getCourses = (sortby = 'MostPopular') => http.get("/course", { params: { sortby } });

export const check = (videoId) => http.get(`/like/by-video/${videoId}/check`);

export const delLike = (videoId) => http.delete(`/like/${videoId}`);

export const getVideoLiked = () => http.get("/like/by-video/liked-video");