export const getDateString = (date) => {
  let createdOn = new Date(date + "Z");
  let now = new Date();
  let difference = now.getTime() - createdOn.getTime();
  let minutes = parseInt(difference / (1000 * 60), 10);
  let hours = parseInt(difference / (1000 * 60 * 60), 10);
  let days = parseInt(difference / (1000 * 60 * 60 * 24), 10);
  let months = parseInt(difference / (1000 * 60 * 60 * 24 * 30), 10);
  let years = parseInt(difference / (1000 * 60 * 60 * 24 * 30 * 12), 10);

  if (minutes < 1) {
    return "Just now";
  } else if (hours < 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (days < 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (months < 1) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (years < 1) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (years > 0) {
    return `${years} years${years > 1 ? "s" : ""} ago`;
  }
  return "";
};
