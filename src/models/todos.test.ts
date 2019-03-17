import { Todo, TodoStore } from './todos';

it('can create a instance of Todo model', () => {
  const todo = Todo.create({
    text: 'test mobx-state-tree',
    id: 1,
  });

  expect(todo.completed).toBe(false);

  expect(todo.text).toBe('test mobx-state-tree');
  expect(todo.id).toBe(1);
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
