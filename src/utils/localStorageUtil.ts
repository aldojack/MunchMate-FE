export function getLocalStorage<T>(item: string): T | null {
  const localStorageItem = localStorage.getItem(item);
  if (!localStorageItem) return null;

  try {
    return JSON.parse(localStorageItem, (_key, value) => {
      if (value instanceof Array) {
        return new Set(value ? [...value] : []);
      }
      return value;
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const setLocalStorage = <T>(item: string, data: T): void => {
  localStorage.setItem(
    item,
    JSON.stringify(data, (_key, value) => {
      if (value instanceof Set) {
        return [...value];
      }
      return value;
    }),
  );
};

export default { getLocalStorage, setLocalStorage };
