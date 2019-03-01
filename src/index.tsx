/* 
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Hello from './components/Hello';

ReactDOM.render(
  // <App />,
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
*/

/*
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from './Counter';

ReactDOM.render(
  <Counter />,
  document.getElementById('root') as HTMLElement
);
*/

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