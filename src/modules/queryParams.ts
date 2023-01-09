export const isQueryParamsExist = () => {
  const location = window.location.search;
  const queryObj: { [key: string]: string } = {};
  if (location) {
    const queryString = location.substring(1).split('&');
    queryString.forEach((string) => {
      const param = string.split('=');
      queryObj[param[0]] = param[1];
    });
    // console.log({ queryObj });
    return queryObj;
  }
  return;
}
export const copyQueryParams = (e: Event) => {
  const target = e.target;
   const url = window.location.href;
  if (target && target instanceof HTMLElement) {
    navigator.clipboard.writeText(url)
      .then(() => {
      target.textContent = 'Скопировано';
      })
      .then(() => setTimeout(() => {
      target.textContent = "Запомнить"
      }, 500));
   }
 };