// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.
const Todo = require('./todo');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todoObj) {
    if (!(todoObj instanceof Todo)) {
      throw new TypeError('can only add Todo objects...');
    }
    this.todos.push(todoObj);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  toString() {
    let header = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join('\n');
    return `${header}\n${list}`;
  }

  forEach(callback) {
    for (let index = 0; index < this.size(); index++) {
      callback(this.todos[index]);
    }
  }

  filter(callback) {
    let filtered = new TodoList(this.title);
    this.forEach(function(todo) {
      if (callback(todo)) {
        filtered.add(todo);
      }
    })
    return filtered;
  }

  findByTitle(title) {
    let match;
    this.forEach(function(todo) {
      if (todo.title === title) match = todo;
    })
    return match;
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo.done === false) todo.markDone();
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.filter(todo => todo).todos;
  }
}

module.exports = TodoList;