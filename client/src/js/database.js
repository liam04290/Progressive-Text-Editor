import { openDB } from 'idb';

const initdb = async () => {
  console.log('Initializing the database...');
  openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
};

export const putDb = async (content) => {
  console.log('Attempting to save content to the database...');
  
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  const entry = { id: 1, value: content };
  const result = await store.put(entry);
  
  console.log(`Saved entry with ID ${result} to the database.`);
};

export const getDb = async () => {
  console.log('Fetching content from the database...');
  
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  const result = await store.get(1);
  
  console.log('Fetched value:', result?.value);
  return result?.value;
};

initdb();
