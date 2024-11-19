import { http } from "../https";

export const getStatistics = () => http.get("/teacherEarning/statistic");
