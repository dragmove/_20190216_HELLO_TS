import { types } from 'mobx-state-tree';

const data = {
  name: 'foo',
  price: 1000,
};

export const WishListItem = types.model({
  name: types.string,
  price: types.number,
});
