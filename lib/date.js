import moment from "moment";

export function formatDateAndTime(date) {
  if (!date) return "";
  return moment(date).format("DD MMMM YYYY - HH:mm");
}
