export const validateUrl = (url) => {
  const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return pattern.test(url);
};

export const formatUrl = (url) => {
  if (!url.startsWith('http')) {
    return `https://${url}`;
  }
  return url;
};