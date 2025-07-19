export const limitMovie = (data, limit = 10) => {
  return data.slice(0, limit);
};
