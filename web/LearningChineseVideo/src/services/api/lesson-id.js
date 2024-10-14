import { http } from "../https";
export const getLessonById = (id) => http.get(`/lesson/${id}`);