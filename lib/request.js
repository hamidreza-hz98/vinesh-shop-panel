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

/**
 * Transform MUI DataGrid query model to a backend-friendly query object.
 * @param {Object} params
 * @param {Object} params.paginationModel - { page, pageSize }
 * @param {Array}  params.sortModel - [ { field, sort } ]
 * @param {Object} params.filterModel - { items: [], quickFilterValues: [] }
 * @param {string} [params.lang] - Optional language filter
 * @returns {Object} backend-ready query object
 */
export function transformGridQuery(params = {}) {
  const {
    paginationModel = {},
    sortModel = [],
    filterModel = {},
    lang = "",
  } = params;

  // ✅ Pagination
  const page = (paginationModel.page ?? 0) + 1;
  const page_size = paginationModel.pageSize ?? 10;

  // ✅ Sorting — convert [{ field, sort }] → "field:1,other:-1"
  const sort = sortModel
    .map(({ field, sort }) => `${field}:${sort === "asc" ? 1 : -1}`)
    .join(",");

  // ✅ Filters — from filterModel.items
  const filter = {};
  if (Array.isArray(filterModel.items)) {
    for (const { field, value, operator } of filterModel.items) {
      if (!field || value == null || value === "") continue;
      switch (operator) {
        case "equals":
          filter[field] = value;
          break;
        case "contains":
          filter[field] = { $regex: value, $options: "i" };
          break;
        default:
          filter[field] = value;
      }
    }
  }

  // ✅ Quick search — combine quickFilterValues into one search string
  const search = Array.isArray(filterModel.quickFilterValues)
    ? filterModel.quickFilterValues.join(" ")
    : "";

  return {
    filter,
    search,
    sort,
    page,
    page_size,
    lang,
  };
}
/**
 * purifyData
 * 
 * Replaces full media/tag objects in the given fields with their _id(s) for backend.
 *
 * Supports nested arrays, e.g. "translations.banners".
 *
 * @param {Object} data - The full object to purify
 * @param {Array<string>} fields - Array of fields to purify. Can support nested paths using dot notation
 * @returns {Object} purified data, ready for API
 */
export function purifyData(data, fields = []) {
  const cloned = JSON.parse(JSON.stringify(data)); // deep clone

  const purifyAtPath = (obj, keys) => {
    if (!obj) return;

    const key = keys[0];

    if (keys.length === 1) {
      // Last key → purify
      if (!obj[key]) return;

      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item) =>
          item && typeof item === "object" && "_id" in item ? item._id : item
        );
      } else if (typeof obj[key] === "object" && "_id" in obj[key]) {
        obj[key] = obj[key]._id;
      }
    } else {
      // Intermediate key → traverse
      const next = obj[key];

      if (Array.isArray(next)) {
        // Traverse each object in array
        next.forEach((child) => purifyAtPath(child, keys.slice(1)));
      } else if (typeof next === "object") {
        purifyAtPath(next, keys.slice(1));
      }
    }
  };

  fields.forEach((path) => {
    const keys = path.split(".");
    purifyAtPath(cloned, keys);
  });

  return cloned;
}
