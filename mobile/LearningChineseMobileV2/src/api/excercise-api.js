import { http } from ".";
export const addExcerciseFillIn = (id, body) => http.post(`/lesson/${id}/add-excercise`, body);
export const deleteExFromCourse = (idLesson, idEx) =>
  http.delete(`/lesson/${idLesson}/excercise/${idEx}/delete`);
export const getExcerciseByLessonId = (id) => http.get(`/lesson/${id}/excercise`);
export const checkExcercise = (lessonId, exerciseId, body) =>
  http.post(`/lesson/${lessonId}/excercise/${exerciseId}/check`, body);