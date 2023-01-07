export const isQueryParamsExist = () => {
  const location = window.location.search;
  if (location) {
    const queryObj: { [key: string]: string } = {};
    const queryString = location.substring(1).split('&');
    queryString.forEach((string) => {
      const param = string.split('=');
      queryObj[param[0]] = decodeURIComponent(param[1]);
    });
    console.log({ queryObj });
    return queryObj;
  } else {
    return false;
  }
}