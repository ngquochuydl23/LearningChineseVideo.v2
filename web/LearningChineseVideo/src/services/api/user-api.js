import { http } from "../https";

export const login = (phoneNumber, password) => http.post("/user/login", { phoneNumber, password });

export const signUp = (body) => http.post("/user/signUp", body);

export const persistLogin = () => http.get("/user/persistLogin");

export const editUserInfo = (body) => http.put("/user/updateInfo", body);

export const signUpTeacher = (body) => http.post("/user/signUpTeacher", body);
