import moment from "moment";

export function formatterTime(timestamp: Date) {
  return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
}
