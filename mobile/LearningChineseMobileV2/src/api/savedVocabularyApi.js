import { http } from ".";


export const getSavedByVideo = () => http.get('/savedVocabulary/GetSavedByVideo');


export const checkSaved = (word, showedFrom, showedTo, videoId) => http.get('/savedVocabulary/' + word + '/check', {
    params: { showedFrom, showedTo, videoId }
})