import { http, HttpResponse } from 'msw';
import list from '@/mocks/db.json';
import { CartProduct } from '@/types/cart';
import { MOCK_CARTS_DATA } from './data/carts';
import { Order } from '@/types/order';
import { MOCK_ORDERS_DATA } from './data/orders';

export const handlers = [
  // 상품 목록 조회
  http.get('/products', () => {
    return HttpResponse.json(list.products);
  }),
  // 상품 상세(단일) 조회
  http.get('/products/:id', ({ params }) => {
    const { id } = params;
    const product = list.products.find((product) => product.id === Number(id));

    return HttpResponse.json(product);
  }),
  // 장바구니 아이템 목록 조회
  http.get('/carts', () => {
    return HttpResponse.json(MOCK_CARTS_DATA);
  }),
  // 주문 목록(내역 조회)
  http.get('/orders', () => {
    return HttpResponse.json(list.orders);
  }),
  // 주문 상세(단일) 조회
  http.get('/orders/:id', ({ params }) => {
    const { id } = params;
    const orderDetail = list.orders.find((order) => order.id === Number(id));

    return HttpResponse.json(orderDetail);
  }),
  // 주문 추가(주문하기)
  http.post('orders', async ({ request }) => {
    const { orderDetails } = (await request.json()) as Pick<
      Order,
      'orderDetails'
    >;

    const newOrderDetails = {
      id: Math.floor(Math.random() * 1000),
      orderDetails,
    };

    // 새로운 주문 추가
    MOCK_ORDERS_DATA.push(newOrderDetails);

    return HttpResponse.json(newOrderDetails, { status: 201 });
  }),
  // 장바구니 아이템(상품) 추가
  http.post('/carts', async ({ request }) => {
    const { product } = (await request.json()) as Pick<CartProduct, 'product'>;

    const newCartProduct = {
      id: Math.floor(Math.random() * 1000),
      product,
    };

    // 새로운 상품 추가
    list.carts.push(newCartProduct);
    MOCK_CARTS_DATA.push(newCartProduct);

    return HttpResponse.json(newCartProduct, { status: 201 });
  }),
];
