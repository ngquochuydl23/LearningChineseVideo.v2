import { http } from "../https";

export const getAllUsers = () => http.get("/admin/get-all-user");
export const getAllAdmins = () => http.get("/admin/get-all-admin");
export const getAllTeachers = () => http.get("/admin/get-all-teacher");
export const getAllUserNotAdmin = () => http.get("/admin/get-all-user-not-admin");
export const approveTeacher = (teacherId) => http.post(`/admin/approve-teacher/${teacherId}`);
export const approveUser = (userId) => http.post(`/admin/approve-user/${userId}`);
export const rejectUser = (userId) => http.post(`/admin/reject-teacher/${userId}`);
export const rejectAdmin = (userId) => http.post(`/admin/reject-user/${userId}`);
export const requestAdmin = (userId) => http.post(`/admin/request-admin/${userId}`);
