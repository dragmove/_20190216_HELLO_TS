import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import CounterStore from './stores/CounterStore';
import App from './App';

const counterStore: CounterStore = new CounterStore();

ReactDOM.render(
  <Provider counterStore={counterStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)