const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });
  
  test('todolist toArray returns an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });
  
  test('first method returns the first item in todolist array', () => {
    expect(list.first()).toEqual(todo1);
  });
  
  test('last method returns the last item in the todolist array', () => {
    expect(list.last()).toEqual(todo3);
  });
  
  test('shift todolist method removes first element of todolist array', () => {
    let tempTodo = list.shift();
    expect(tempTodo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });
  
  test('pop todolist method removes last element of todolist array', () => {
    let tempTodo = list.pop();
    expect(tempTodo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });
  
  test('isDone returns false if all todos are done', () => {
    expect(list.isDone()).toBe(false);
  });
  
  test('add throws a TypeError when trying to add object that isnt a Todo instance', () => {
    expect(list.add({})).toThrow(TypeError);
    expect(list.add(1)).toThrow(TypeError);
  });
  
  test('itemAt returns item at given index, if no item, raises exception', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(list.itemAt(5)).toThrow(ReferenceError);
  });
  
  test('markDoneAt should mark a todo done, raise exception otherwise', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(list.markDoneAt(5)).toThrow(ReferenceError);
  });
  
  test('markUndoneAt should mark a todo undone, raise exception otherwise', () => {
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
    expect(list.markUndoneAt(5)).toThrow(ReferenceError);
  });
  
  test('markAllDone should mark all todos done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });
  
  test('removeAt should remove todo at specified index, raise exception otherwise', () => {
    list.removeAt(0);
    expect(list.todos).toEqual([todo2, todo3]);
    expect(list.removeAt(5)).toThrow(ReferenceError);
  });
  
  test('toString returns a string representation of the list', () => {
    let string = `---- Today's Todos ----
    [ ] Buy milk
    [ ] Clean room
    [ ] Go to the gym`;
    
    expect(list.toString()).toBe(string);
  });
  
  test('toString returns a different string for done todo', () => {
  let string = `---- Today's Todos ----
    [X] Buy milk
    [ ] Clean room
    [ ] Go to the gym`;
    
    list.markDoneAt(0);
    
    expect(list.toString()).toBe(string);
  });
  
  test('toString returns a todolist with all items done', () => {
  let string = `---- Today's Todos ----
    [X] Buy milk
    [X] Clean room
    [X] Go to the gym`;
    
    list.markAllDone();
    
    expect(list.toString()).toBe(string);
  });
  
  test('forEach method of TodoList iterates over each element of list', () => {
    let tempArr = [];
    list.forEach(item => tempArr.push(item));
    
    expect(tempArr).toEqual([todo1, todo2, todo3]);
  });
  
  test('filter method of TodoList returns a new TodoList object', () => {
    list.markAllDone();
    let filtered = list.filter(item => item.isDone());
    
    expect(filtered.todos).toEqual([todo1, todo2, todo3]);
  });
});