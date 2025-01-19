// let db;
// const DB_NAME = 'messageIDB';
// const DB_STORE_NAME = 'messages';
// const DB_VERSION = 1;

// const openDB = () => {
//     console.log('Opening Database...')
//     let request = indexedDB.open(DB_NAME, DB_VERSION);
//     request.addEventListener('success', (event) => {
//         console.log(event.target.result)
//     })
//     request.addEventListener('error', (event) => {
//         console.error(event.target.errorCode)
//     })
//     request.onupgradeneeded = (event) => {
//         const store = event.target.result.createObjectStore(DB_STORE_NAME, {
//             keyPath: 'email', autoincrement: true
//         })
//         store.createIndex('name', 'name', {unique: false})

//         store.transaction.oncomplete = (event) => {
//             saveMessage({name, email}, DB_STORE_NAME, 'readwrite')
//             console.log("Database transaction successful", event.target.result)
//         }
//     }
// }

// /**
//  * @param {string} store_name
//  * @param {string} mode as read //default mode to get the object from the indexedDBStore
//  */

// const messageStore = (store_name, mode) => {
//     const transaction = db.transaction(store_name, mode);
//     const store = transaction.objectStore(store_name);
//     return store;
// }

// const getMessage = (key, store_name, mode) => {
//     const message_store = messageStore(store_name, mode);
//     const request = message_store.get(key);
//     request.onsucess = (evt) => {
//         console.log(evt.target.result)
//     }
// }

// const saveMessage = (message, store_name, mode) => {
//     const message_store = messageStore(store_name, mode);
//     const request = message_store.put(message);
//     request.onsucess = (evt) => {
//         console.log(evt.target.result)
//     }
// }

const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('messagesDB', 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('outbox')) {
          db.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
  
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  const addMessage = async (name, email) => {
    const db = await openDatabase();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('outbox', 'readwrite');
      const store = transaction.objectStore('outbox');
      const request = store.add({ name, email });
  
      request.onsuccess = () => {
        console.log('Message added to outbox');
        resolve();
      };
  
      request.onerror = (event) => {
        console.error('Failed to add message:', event.target.error);
        reject(event.target.error);
      };
    });
  };

  export { openDatabase, addMessage }