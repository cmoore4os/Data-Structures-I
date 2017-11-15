/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

// LimitedArray, and getIndexBelowMax are two tools provided for you in the helper file.
// There are other methods on the LimitedArray class in the './hash-table-helpers' file that you can use for your implementation.

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }
  capacityIsFull() {
    // returns boolean: this.storage >= 75%
    let fullCell = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCell++;
    });
    return fullCell / this.limit >= 0.75;
  }

  resize() {
    // doubles the storage space
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }
  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    // turns key to a String before sending it to getIndexBelowMax
    const index = getIndexBelowMax(String(key), this.limit);
    const bucket = this.storage.get(index);
    const arr = [key, value];
    // if there is no bucket for this index in this.storage
    // creat new Array at this.storage[index]
    // and add arr to it
    if (bucket === undefined) {
      this.storage.set(index, [arr]);
    } else {
      // check if key is already in bucket
      let keyPresent = false;
      // kvArr is [key,value]
      // check each kvArr in bucket; if key found change it to new value
      bucket.forEach((kvArr) => {
        if (kvArr[0] === key) {
          kvArr[1] = value;
          keyPresent = true;
        }
      });
      // else add the kvArr to bucket
      if (keyPresent === false) {
        bucket.push(arr);
      }
    }
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    // turns key to a String before sending it to getIndexBelowMax
    const index = getIndexBelowMax(String(key), this.limit);
    const bucket = this.storage.get(index);
    if (bucket === undefined) {
      // no bucket array at this.[index]
      return;
    }
    // look at the key in each array stored bucket; if a match found, remove it
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return;
      }
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(String(key), this.limit);
    const bucket = this.storage.get(index);
    if (bucket === undefined) {
      return undefined;
    }
    // look at the value in each array stored bucket; if a match found, return it
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
  }
}

module.exports = HashTable;
