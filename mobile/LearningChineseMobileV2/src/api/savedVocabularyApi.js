import { http } from ".";


export const getSavedByVideo = () => http.get('/SavedVoca/GetSavedByVideo');


export const checkSaved = (word, showedFrom, showedTo, videoId) => http.get('/SavedVoca/' + word + '/check', {
    params: { showedFrom, showedTo, videoId }
})

export const save = (videoId, originWord, showedFrom, showedTo, sentence) =>
    http.post('/SavedVoca', {
        videoId,
        originWord,
        showedFrom,
        showedTo,
        sentence
    });

export const delSaved = (videoId, originWord, showedFrom, showedTo, sentence) =>
    http.delete('/SavedVoca/' + originWord, {
        params: { showedFrom, showedTo, videoId }
    });

export const getSavedByByVideoId = (videoId) => http.get('/SavedVoca/video/' + videoId);
