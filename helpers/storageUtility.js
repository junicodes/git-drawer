
export const Storage = {
  
  setItem: (itemKey, itemValue) => {
    if (typeof itemValue === 'object') {
      itemValue = JSON.stringify(itemValue);
    }
    localStorage.setItem(itemKey, itemValue);
  },

  getItem: (itemKey) => {
    const itemValue = localStorage.getItem(itemKey);
    if (!itemValue) return;

    try {
      return JSON.parse(itemValue);
    } catch (err) {
      return itemValue;
    }
  },

  removeItem: (itemKey) => {
    localStorage.removeItem(itemKey);
  },
};