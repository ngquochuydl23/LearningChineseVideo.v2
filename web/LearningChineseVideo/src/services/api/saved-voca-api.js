import { http } from '../https'

export const saveVoca = (body) =>
    http.post('/SavedVoca', body)

export const delSavedVoca = (vocaId, videoId, showedFrom, showedTo) =>
    http.delete('/SavedVoca/' + vocaId, {
        params: {
            videoId: videoId,
            showedFrom: showedFrom,
            showedTo: showedTo
        }
    })

export const checkSaved = (vocaId, videoId, showedFrom, showTo) =>
    http.get('/SavedVoca/' + vocaId + '/check', {
        params: {
            videoId: videoId,
            showedFrom: showedFrom,
            showedTo: showTo
        }
    });

export const getSavedByVideo = () => http.get('/SavedVoca/GetSavedByVideo');

export const getSavedInVideo = (videoId) => http.get('/SavedVoca/Video/' + videoId);
