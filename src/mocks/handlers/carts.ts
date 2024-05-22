import { http, HttpResponse } from 'msw';
import { MOCK_CARTS_DATA } from '../data/carts';
import { CartProduct } from '@/types/cart';
import { generateUniqueId } from '@/utils/uniqueId';

let cartList = MOCK_CARTS_DATA;

export const cartsHandlers = [
  http.get('/carts', () => {
    return HttpResponse.json(MOCK_CARTS_DATA);
  }),

  http.post('/carts', async ({ request }) => {
    const { product } = (await request.json()) as Pick<CartProduct, 'product'>;

    const newCartProduct = {
      id: generateUniqueId(),
      product,
    };

    cartList.push(newCartProduct);

    return HttpResponse.json(newCartProduct, { status: 201 });
  }),

  http.delete('/carts/product/:id', ({ params }) => {
    const { id: targetProductId } = params;
    const targetCart = cartList.find(
      (cart) => cart.product.id === Number(targetProductId)
    );

    if (!targetCart) {
      return new HttpResponse(null, { status: 400 });
    }

    cartList = [...cartList.filter((cart) => cart.id !== targetCart.id)];

    return new HttpResponse(null, { status: 204 });
  }),

  http.delete('/carts/products', async ({ request }) => {
    const requestDeleteIdList = (await request.json()) as Array<
      CartProduct['product']['id']
    >;

    cartList = [
      ...cartList.filter(
        (cart) => !requestDeleteIdList?.includes(cart.product.id)
      ),
    ];
    return new HttpResponse(null, { status: 204 });
  }),
];
