import { observable, action } from 'mobx';

export default class CounterStore {
  @observable public val: number = 0;

  @action public increase = () => {
    this.val++;
  };

  @action public decrease = () => {
    this.val--;
  };
}
