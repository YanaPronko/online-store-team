export const isQueryParamsExist = () => {
  const location = window.location.search;
  const queryObj: { [key: string]: string } = {};
  if (location) {
    const queryString = location.substring(1).split('&');
    queryString.forEach((string) => {      
      const param = string.split('=');
      queryObj[param[0]] = param[1];
    });
    return queryObj;
  }
  return false;
}