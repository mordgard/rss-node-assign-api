export const validateUrl = (url: string) => {
  return url.match(/^\/api\/users\/?$/);
};
