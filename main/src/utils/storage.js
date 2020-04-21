/**
 * @author Jay
 * @date 2020-01-01
 * @description Storage
 */
function Storage(storage = sessionStorage) {
  this.get = (key) => {
    const item = storage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  };
  this.set = (key, value) => storage.setItem(key, JSON.stringify(value));
  this.remove = (key) => storage.removeItem(key);
  this.clear = () => storage.clear();
}

export const Session = new Storage();
export const Application = new Storage(localStorage);

export default { Session, Application };
