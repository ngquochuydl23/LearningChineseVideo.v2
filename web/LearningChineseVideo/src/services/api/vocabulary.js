import { http } from '../https'

export const addVocabulary = (body) => http.post('/Vocabulary', body);

export const getVocabulary = (voca) => http.get('/Vocabulary/' + voca);
