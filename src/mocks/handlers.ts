import { http, HttpResponse } from 'msw';
import list from '@/mocks/db.json';
import { CartProduct } from '@/types/product';

export const handlers = [
  http.get('/products', () => {
    return HttpResponse.json(list.products);
  }),
  http.get('/products/:id', ({ params }) => {
    const { id } = params;
    const product = list.products.find((product) => product.id === Number(id));

    return HttpResponse.json(product);
  }),
  http.get('/carts', () => {
    return HttpResponse.json(list.carts);
  }),
  http.get('/orders', () => {
    return HttpResponse.json(list.orders);
  }),
  http.post('/carts', async ({ request }) => {
    const { product } = (await request.json()) as Pick<CartProduct, 'product'>;

    const newCartProduct = {
      id: Math.floor(Math.random() * 1000),
      product,
    };

    // 새로운 상품 추가
    list.carts.push(newCartProduct);

    return HttpResponse.json(newCartProduct, { status: 201 });
  }),
];
