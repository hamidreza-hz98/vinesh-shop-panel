import moment from "moment";

export function formatDateAndTime(date) {
  if (!date) return "";
  return moment(date).format("DD MMMM YYYY - HH:mm");
}

export function calculateCampaignRemainingDays(startDate, expiryDate) {
  const now = moment();
  const start = moment(startDate);
  const end = moment(expiryDate);

  if (now.isBefore(start)) {
    const daysToStart = start.diff(now, "days");
    return `${daysToStart} day${daysToStart !== 1 ? "s" : ""} to start`;
  }

  if (now.isSameOrAfter(start) && now.isBefore(end)) {
    const daysToFinish = end.diff(now, "days");
    return `${daysToFinish} day${daysToFinish !== 1 ? "s" : ""} to finish`;
  }

  if (now.isSameOrAfter(end)) {
    const daysAgo = now.diff(end, "days");
    return daysAgo === 0
      ? "Expired today"
      : `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
  }
}

export function calculateCampaignExpiryStatus(startDate, expiryDate) {
  const now = moment();
  const start = moment(startDate);
  const end = moment(expiryDate);

  if (now.isBefore(start)) {
    return "notStarted";
  }

  if (now.isSameOrAfter(start) && now.isBefore(end)) {
    return "running";
  }

  return "finished";
}

export function calculateCouponStatus(expiryDate, usageNumber, used) {
  const now = moment();
  const expiry = moment(expiryDate);

  if (now.isAfter(expiry, "day")) {
    return "expired";
  }

  if (used < usageNumber) {
    return "active";
  }

  if (used >= usageNumber) {
    return "used";
  }

  return "expired"; // fallback safeguard
}
