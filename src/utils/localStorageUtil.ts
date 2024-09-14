export function getLocalStorage<T>(item: string) : T | null{
    const localStorageItem = localStorage.getItem(item)
    if(!localStorageItem) return null
    
    try{
        return JSON.parse(localStorageItem)
    } catch(error){
        console.log(error)
        return null;
    }
    
}

export const setLocalStorage = <T>(item: string, data: T): void => {
    localStorage.setItem(item, JSON.stringify(data));
  };

export default {getLocalStorage, setLocalStorage}