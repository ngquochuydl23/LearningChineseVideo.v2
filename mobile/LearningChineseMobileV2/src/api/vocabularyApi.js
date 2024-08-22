import { http } from ".";

export const getVocabularyByWord = (word) => http.get('vocabulary/' + word);