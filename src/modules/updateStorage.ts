export const setStorage = (key: string, value: object[] | string[]) => {
  localStorage.setItem(key, JSON.stringify(value));
}
export const parseStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string)
}
export const removeItemFromStorage = (key: string) => {
  localStorage.removeItem(key);
}
