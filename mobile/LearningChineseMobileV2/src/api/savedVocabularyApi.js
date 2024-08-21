import { http } from ".";


export const getSavedByVideo = () => http.get('/savedVocabulary/GetSavedByVideo');