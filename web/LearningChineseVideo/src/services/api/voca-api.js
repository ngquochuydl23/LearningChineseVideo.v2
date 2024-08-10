import { http } from '../https'


export const getVocas = () => http.get('/Vocabulary');

export const getVoca = (originWord) => http.get('/Vocabulary/' + originWord);

export const addVoca = (body) => http.post('/Vocabulary', body);

export const editVocabulary = (originWord, body) => http.put('/Vocabulary/' + originWord, body); 