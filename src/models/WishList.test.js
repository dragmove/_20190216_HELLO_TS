import { WishListItem } from './WishList';

it('can create a instance of model', () => {
  const item = WishListItem.create({
    name: 'foo',
    price: 1000,
  });

  expect(item.name).toBe('foo');
  expect(item.price).toBe(1000);
});
