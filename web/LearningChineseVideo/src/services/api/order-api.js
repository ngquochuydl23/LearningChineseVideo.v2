import { http } from "../https";

export const checkout = (body) => http.post("/order/checkout", body);
export const getOrderUser = () => http.get(`/order/user-orders`);
