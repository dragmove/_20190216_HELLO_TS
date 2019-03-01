/*
// React + MobX. no use MobX store

import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Counter extends React.Component {
  @observable val: number = 0;

  @action
  increase = () => {
    this.val++;
  };

  @action
  decrease = () => {
    this.val--;
  };

  render() {
    return (
      <div>
        <h1>{this.val}</h1>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
*/

import * as React from 'react';
import { observer, inject } from 'mobx-react';
import CounterStore from '../../stores/CounterStore';
import DevTools from 'mobx-react-devtools';

interface Props {
  counterStore?: CounterStore
}

/*
@inject(stores => ({
  val: stores!.counter.val,
  increase: stores!.counter.increase,
  decrease: stores!.counter.decrease,
}))
*/
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