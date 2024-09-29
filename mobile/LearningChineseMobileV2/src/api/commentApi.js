import { http } from ".";
export const addComment = (body) => http.post('/comment', body);
export const getCommentsOfVideo = (id) => http.get(`/comment/by-video/${id}`);
export const getCommentById = (id) => http.get(`/comment/${id}`);
export const delComment = (id,body) => http.delete(`/comment/${id}`,body);