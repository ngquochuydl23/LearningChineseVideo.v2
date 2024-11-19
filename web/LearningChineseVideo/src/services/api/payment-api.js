import axios from "axios";
import { http } from "../https";

export const checkPayment = async (body) => {
  const res = await axios.post(
    "https://genlish-be-gules.vercel.app/api/v1/payment/check_payment",
    body
  );
  return res.data;
};

export const deletePayment = async (id) => {
  const res = await axios.delete(`https://genlish-be-gules.vercel.app/api/v1/payment/delete/${id}`);
  return res.data;
};
