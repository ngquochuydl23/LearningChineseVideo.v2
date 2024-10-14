import { http } from "../https";
export const addCourse = (body) => http.post("/course", body);
export const editCourse = (id,body) => http.put(`/course/${id}`, body);
export const deleteCourse = (id) => http.delete(`/course/${id}`);
export const getCourseById = (id) => http.get(`/course/${id}`);
export const getCourses = () => http.get("/course/?sortby=MostPopular");
// lesson course
export const addLessonToCourse = (id, body) => http.post(`/course/${id}/lessons`, body);
export const deleteLessonFromCourse = (idCourse, lessonId) =>
  http.delete(`/course/${idCourse}/lessons/${lessonId}`);

