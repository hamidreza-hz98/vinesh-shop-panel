export const setRequestBody = ({
  filters = {},
  sort = "createdAt: -1",
  page = 1,
  page_size = 12,
} = {}) => {
  return {
    filter: filters,
    sort,
    page,
    page_size,
  };
};

const buildQueryString = (obj, prefix = "") => {
  const pairs = [];

  for (const key in obj) {
    if (!obj.hasOwnProperty(key) || obj[key] == null) continue;

    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === "object" && !Array.isArray(value)) {
      pairs.push(buildQueryString(value, prefixedKey));
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object") {
          pairs.push(buildQueryString(v, `${prefixedKey}[${i}]`));
        } else {
          pairs.push(
            `${encodeURIComponent(prefixedKey)}[]=${encodeURIComponent(v)}`
          );
        }
      });
    } else {
      pairs.push(
        `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(value)}`
      );
    }
  }

  return pairs.join("&");
};

export const setRequestQuery = ({
  filters = {},
  sort = "createdAt: -1",
  page = 1,
  page_size = 12,
} = {}) => {
  const queryObject = {
    filter: filters,
    sort,
    page,
    page_size,
  };

  return buildQueryString(queryObject);
};
