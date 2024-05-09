export const carFilterHandler = (filter) => {
  const queryFilter = Object.entries(filter).map(([key, value]) => {
    if (value.length) {
      return {
        [key]: { $in: value },
      };
    } else {
      return {
        [key]: { $nin: value },
      };
    }
  });
  return queryFilter.reduce((acc, obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (acc[key] && Array.isArray(value) && Array.isArray(acc[key])) {
        acc[key] = value.filter((val) => acc[key].includes(val));
      } else {
        acc[key] = value;
      }
    }
    return acc;
  }, {});
};
