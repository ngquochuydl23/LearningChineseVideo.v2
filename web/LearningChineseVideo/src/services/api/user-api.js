import { http } from '../https'

export const login = (phoneNumber, password) =>
    http.post('/User/login', { phoneNumber, password })

export const signUp = (body) =>
    http.post('/User/signUp', body);

export const persistLogin = () =>
    http.get('/User/persistLogin');

export const editUserInfo = (body) =>
    http.put('/User/updateInfo', body)

