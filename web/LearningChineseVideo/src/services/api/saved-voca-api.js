import { http } from '../https'

export const saveVoca = (body) =>
    http.post('/SavedVoca', body)

export const delSavedVoca = (vocaId, videoId, showedFrom, showTo) =>
    http.delete('/SavedVoca/' + vocaId, {
        params: {
            videoId: videoId,
            ShowedFrom: showedFrom,
            ShowedTo: showTo
        }
    })

export const checkSaved = (vocaId, videoId, showedFrom, showTo) =>
    http.get('/SavedVoca/' + vocaId, {
        params: {
            videoId: videoId,
            ShowedFrom: showedFrom,
            ShowedTo: showTo
        }
    });

export const getSavedByVideo = () => http.get('/SavedVoca/GetSavedByVideo');

export const getSavedInVideo = (videoId) => http.get('/SavedVoca/Video/' + videoId);
