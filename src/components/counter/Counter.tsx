import * as React from 'react';
import { observer, inject } from 'mobx-react';
import CounterStore from '../../stores/CounterStore';
import DevTools from 'mobx-react-devtools';

interface Props {
  counterStore?: CounterStore
}

@inject('counterStore')
@observer
class Counter extends React.Component<Props> {
  render() {
    const { counterStore } = this.props;

    return (
      <div className="counter">
        <h1>{counterStore!.val}</h1>
        <button onClick={counterStore!.increase}>+1</button>
        <button onClick={counterStore!.decrease}>-1</button>
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </div>
    );
  }
}

export default Counter;