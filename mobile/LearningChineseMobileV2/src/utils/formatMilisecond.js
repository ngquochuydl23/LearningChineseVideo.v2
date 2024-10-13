export function formatMilisecond(milliseconds) {
    const seconds = milliseconds / 1000;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return ` ${hours > 0 ? hours + "giờ" : ""}  ${minutes} phút`;
  };
  