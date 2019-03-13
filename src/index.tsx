import * as React from "react"
import { render } from "react-dom"
import { destroy, onSnapshot } from "mobx-state-tree"
import { connectReduxDevtools } from "mst-middlewares"
import "todomvc-app-css/index.css"

import App from "./components/App"
import TodoStore from "./models/todos"

// const
const localStorageKey:string = "mst-todomvc-example"

// variables
const initialState = localStorage.getItem(localStorageKey)
    ? JSON.parse(window.localStorage.getItem(localStorageKey))
    : {
          todos: [
              {
                  text: "learn Mobx",
                  completed: false,
                  id: 0
              },
              {
                  text: "learn MST",
                  completed: false,
                  id: 1
              }
          ]
      }

let store: any;
let snapshotListener;

// implement
renderApp(App, createTodoStore(initialState))

// functions
function renderApp(App, store) {
  render(<App store={store} />, document.getElementById("root"))
}

function createTodoStore(snapshot) {
  // clean up snapshot listener
  if (snapshotListener) snapshotListener()

  // kill old store to prevent accidental use and run clean up hooks
  if (store) destroy(store)

  // create new store from TodoStore
  store = TodoStore.create(snapshot)

  // connect devtools
  connectReduxDevtools(require("remotedev"), store)

  // connect local storage
  snapshotListener = onSnapshot(store, snapshot => {
    console.log('[Index] snapshotListener snapshot: ', snapshot);

    window.localStorage.setItem(localStorageKey, JSON.stringify(snapshot));
  })

  return store
}

/*
// Connect HMR
if (module.hot) {
    module.hot.accept(["./models/todos"], () => {
        // Store definition changed, recreate a new one from old state
        renderApp(App, createTodoStore(getSnapshot(store)))
    })

    module.hot.accept(["./components/App"], () => {
        // Componenent definition changed, re-render app
        renderApp(App, store)
    })
}
*/