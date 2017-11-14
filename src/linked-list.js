/* eslint-disable class-methods-use-this */
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    // Do not modify anything inside of the constructor
  }
  // Wraps the given value in a node object and adds the node to the tail of the list
  // If the list is empty, the new element is considered the tail as well as the head
  // If there is one element in the list before the new element is added, the new element becomes the tail of the list
  addToTail(value) {
    const newNode = {
      value,
      next: null,
    };
    this.size++;
    // not set yet
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      // change tail.value and add tail.next
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    this.size--;
    // if no head
    if (this.head === null) return null;
    const currentHead = this.head.value;
    this.head = this.head.next;
    return currentHead;
  }

  contains(value) {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
}

module.exports = LinkedList;
