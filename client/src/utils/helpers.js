// A utility function to pluralize a word based on the given coun
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}
// A utility function to interact with IndexedDB using Promises for asynchronous operations
export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('shop-shop', 1);
    let db, tx, store;
    // Handlers for the database creation or upgrade needed events
    request.onupgradeneeded = function(e) {
      const db = request.result;
      // Create object stores for products, categories, and cart if they don't already exist
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };
    // Error handler for the request to open the database
    request.onerror = function(e) {
      console.log('There was an error');
    };
     // Success handler for opening the database; performs the requested operation on the object store
    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);
      // General error handler for the database
      db.onerror = function(e) {
        console.log('error', e);
      };
      // Perform the requested operation ('put', 'get', or 'delete') using a switch statement
      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }
      // Closes the database connection once the transaction is complete
      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}
