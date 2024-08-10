import { http } from '../https'

export const addVideo = (body) => http.post('/Video', body);

export const getVideos = () => http.get('Video');

export const getMostPopularVideo = (offset, limit) => http.get('Video/mostPopular', { params: { offset, limit } });

export const getRecentlyAddedVideo = (offset, limit) => http.get('Video/recentlyAdded', { params: { offset, limit } });

export const getVideo = (id) => http.get('/Video/' + id);

export const viewVideo = (id) => http.post('/Video/' + id + '/View');

export const delVideo = (id) => http.delete('/Video/' + id);

export const editVideo = (id, body) => http.put('/Video/' + id, body)

export const getVideosByHSK = (hskLevel, offset, limit) => http.get('Video/Level/' + hskLevel, { params: { offset, limit } })