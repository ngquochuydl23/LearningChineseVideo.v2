export const dateCrateComment = (dateString) => {
  const date = new Date(dateString);
  const currentDate = new Date();

  // Tính toán sự khác biệt giữa hai thời điểm
  const differenceInTime = currentDate.getTime() - date.getTime();

  // Chuyển đổi sự khác biệt từ mili giây sang ngày, giờ, phút và giây
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const differenceInHours = Math.floor((differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600));
  const differenceInMinutes = Math.floor((differenceInTime % (1000 * 3600)) / (1000 * 60));
  const differenceInSeconds = Math.floor((differenceInTime % (1000 * 60)) / 1000);

  if (differenceInDays > 0) {
    return `${differenceInDays} ngày trước`;
  } else if (differenceInHours > 0) {
    return `${differenceInHours} giờ trước`;
  } else if (differenceInMinutes > 0) {
    return `${differenceInMinutes} phút trước`;
  } else {
    return `${differenceInSeconds} giây trước`;
  }
};
