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

// showdown
const showdown = require('showdown');
const  converter = new showdown.Converter({
    noHeaderId: false
  }),
  text = '# hello, markdown!',
  html = converter.makeHtml(text);
  
  console.log('html :', html);

// marked
// https://marked.js.org/#/USING_ADVANCED.md#options
const marked = require('marked');
marked.setOptions({
  // baseUrl
  breaks: false,
  gfm: true,
  headerIds: false,
  // headerPrefix
  // highlight: (code) => require('highlight.js').highlightAuto(code).value,
  // langPrefix: 'language-',
  // mangle: true,
  pedantic: false,
  renderer: new marked.Renderer(),
  sanitize: false,
  // sanitizer: function() {},
  smartLists: true,
  smartypants: false,
  tables: true,
  xhtml: false
});

// Compile
console.log(marked('I am using __markdown__.'));