import { http } from ".";
export const addLike = (videoId) => http.post("/like", { videoId });

export const check = (videoId) => http.get(`/like/by-video/${videoId}/check`);

export const delLike = (videoId) => http.delete(`/like/${videoId}`);

export const getVideoLiked = () => http.get("/like/by-video/liked-video");