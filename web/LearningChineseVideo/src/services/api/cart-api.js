import { http } from "../https";

export const getCarts = () => http.get("/cart");
export const addToCart = (body) => http.post("/cart", body);
export const removeCartById = (id) => http.delete("/cart/" + id);
