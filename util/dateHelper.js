export const getDateString = (date) => {
  let convertedDate = new Date(date + "Z");
  let now = new Date();
  if (
    convertedDate.getFullYear() === now.getFullYear() &&
    convertedDate.getMonth() === now.getMonth() &&
    convertedDate.getDate() === now.getDate()
  ) {
    let time = convertedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (time.startsWith("0")) time = time.substring(1, time.length);
    return "Today at " + time;
  }
  return convertedDate.toLocaleDateString();
};
