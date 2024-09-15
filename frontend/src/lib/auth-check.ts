export const isAuthenticated = (): boolean => {
  const jwtToken = localStorage.getItem("jwtToken");
  return !!jwtToken;
};
