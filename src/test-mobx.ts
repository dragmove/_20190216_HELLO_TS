/*
import { observable, computed, autorun } from 'mobx';

// make observables
const obj = observable({
  x: 1,
  y: 2
})

// make computed
const sum = computed(() => {
  console.log(`making computed value x: ${obj.x}, y: ${obj.y}`);
  return obj.x + obj.y;
});


// autorun can replace reactions.
autorun(() => console.log(`change obj.x to ${obj.x}`));
autorun(() => console.log(`change obj.y to ${obj.y}`));

// autorun can replace observe commputed value. replace sum.observe(() => obj.x); sum.observe(() => obj.y);
autorun(() => sum.get());


// change values
obj.x = 11; // 'change obj.a to 11'
obj.y = 22; // 'change obj.b to 22'

console.log('access obj.x :', obj.x);
console.log('access obj.y :', obj.y);

obj.x = 111;
console.log('access obj.x :', obj.x);
*/

import { /* decorate, */ observable, computed, autorun, action, transaction } from 'mobx';

interface Product {
  name: string;
  price: number;
}

/*
class Shop {
  basket: Product[] = [];

  get total(): number {
    const sum = this.basket.reduce((acc, cur) => acc + cur.price, 0);
    console.log('calculate total :', sum);

    return sum;
  }

  add(name: string, price: number) {
    this.basket.push({ name, price });
  }
}

decorate(Shop, {
  basket: observable,
  total: computed,
  add: action
});
*/

class Shop {
  @observable basket: Product[] = [];

  @computed
  get total(): number {
    const sum = this.basket.reduce((acc, cur) => acc + cur.price, 0);
    console.log('calculate total :', sum);

    return sum;
  }

  @action
  add(name: string, price: number) {
    this.basket.push({ name, price });
  }
}

const shop = new Shop();
autorun(() => shop.total);
autorun(() => {
  if (shop.basket.length > 0) {
    const product: Product = shop.basket[shop.basket.length - 1];
    console.log(product.name, product.price);
  }
});

/*
// no use transaction

shop.add('water', 1); // action
// print 'calculate total : 1' through autorun computed values
// print 'water 1' through autorun 
console.log('shop.total :', shop.total); // print 'shop.total : 1'

shop.add('chicken', 99); // action
// print 'calculate total : 100' through autorun computed values
// print 'chicken 99' through autorun 
console.log('shop.total :', shop.total); // print 'shop.total : 100'
*/

transaction(() => {
  shop.add('water', 1);
  shop.add('chicken', 99);
});

// print 'calculate total : 100' through autorun computed values
// print 'chicken 99' through autorun
console.log('shop.total :', shop.total); // print 'shop.total : 100'
