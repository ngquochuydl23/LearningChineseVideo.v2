import { http } from "../https";

export const getCommissions = () => http.get("/adminCommissions/commission");
