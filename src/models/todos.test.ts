import { getSnapshot, onPatch } from 'mobx-state-tree';
import { Todo, TodoStore } from './todos';

it('can create a instance of Todo model', () => {
  const todo = Todo.create({
    text: 'test mobx-state-tree',
    id: 1,
  });

  // test model values
  expect(todo.completed).toBe(false);
  expect(todo.text).toBe('test mobx-state-tree');
  expect(todo.id).toBe(1);

  // test changes by call actions
  const patches: any[] = [];
  onPatch(todo, patch => patches.push(patch));

  todo.edit('test complete');
  expect(todo.text).toBe('test complete');

  /*
  // can change from
  expect(getSnapshot(todo)).toEqual({
    text: 'test complete',
    completed: false,
    id: 1,
  });
  // to
  expect(getSnapshot(todo)).toMatchSnapshot();
  */

  todo.complete();
  expect(todo.completed).toBe(true);

  expect(patches).toMatchSnapshot();
});

it('can create a instance of TodoStore model', () => {
  const snapshot = {
    todos: [
      {
        text: 'learn Mobx',
        completed: false,
        id: 0,
      },
      {
        text: 'learn MST',
        completed: false,
        id: 1,
      },
    ],
  };

  const todoStore = TodoStore.create(snapshot);

  expect(todoStore.todos.length).toBe(2);
  expect(todoStore.todos[0].text).toBe('learn Mobx');
  expect(todoStore.todos[0].id).toBe(0);
});
