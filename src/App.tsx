import * as React from 'react';
import Counter from './components/counter/Counter';
import RichTextEditor from './components/editor/RichTextEditor';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <RichTextEditor />
        <Counter />
      </div>
    );
  }
}

export default App;
