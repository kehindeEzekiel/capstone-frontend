export const getFavoriteMovies = (data) => {
  const result = data?.slice(0, 10);
  return result || [];
};
