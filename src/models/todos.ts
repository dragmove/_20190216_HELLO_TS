import { types, getRoot, destroy } from 'mobx-state-tree';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

// TODO: What is types.union, types.literal.
const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal));
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_COMPLETED]: (todo: any) => !todo.completed,
  [SHOW_ACTIVE]: (todo: any) => todo.completed,
};

const Todo = types
  .model({
    text: types.string, // no default value
    completed: types.optional(types.boolean, false), // default value is false.
    id: types.identifierNumber, // no default value
  })
  .actions(self => ({
    // getRoot(self) is TodoStore
    remove() {
      const root: any = getRoot(self);
      root.removeTodo(self);
    },
    edit(text: string) {
      self.text = text;
    },
    complete() {
      self.completed = !self.completed;
    },
  }));

const TodoStore = types
  .model({
    todos: types.array(Todo),
    filter: types.optional(filterType, SHOW_ALL),
  })
  .views((self: any) => ({
    // "computed" values

    // self is TodoStore
    get completedCount(): number {
      return self.todos.reduce((count: number, todo: any) => (todo.completed ? count + 1 : count), 0);
    },
    get activeCount(): number {
      return self.todos.length - self.completedCount;
    },
    get filteredTodos() {
      return self.todos.filter(TODO_FILTERS[self.filter]);
    },
    // can define Model views functions here.
  }))
  .actions(self => ({
    addTodo(text: string) {
      const id = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
      self.todos.unshift({
        id,
        text,
      });
    },
    removeTodo(todo: any) {
      destroy(todo);
    },
    completeAll() {
      const areAllMarked = self.todos.every(todo => todo.completed);
      self.todos.forEach(todo => (todo.completed = !areAllMarked));
    },
    clearCompleted() {
      self.todos.replace(self.todos.filter(todo => todo.completed === false));
    },
    setFilter(filter: string) {
      self.filter = filter;
    },
  }));

export default TodoStore;
