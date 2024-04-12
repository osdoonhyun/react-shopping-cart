import { http, HttpResponse } from 'msw';
import { MOCK_ORDERS_DATA } from '../data/orders';
import { Order } from '@/types/order';
import { generateUniqueId } from '@/utils/uniqueId';

export const ordersHandlers = [
  // 주문 목록(내역 조회)
  http.get('/orders', () => {
    return HttpResponse.json(MOCK_ORDERS_DATA);
  }),
  // 주문 상세(단일) 조회
  http.get('/orders/:id', ({ params }) => {
    const { id } = params;
    const orderDetail = MOCK_ORDERS_DATA.find(
      (order) => order.id === Number(id)
    );

    return HttpResponse.json(orderDetail);
  }),
  // 주문 추가(주문하기)
  http.post('orders', async ({ request }) => {
    const { orderDetails } = (await request.json()) as Pick<
      Order,
      'orderDetails'
    >;

    const newOrderDetails = {
      id: generateUniqueId(),
      orderDetails,
    };

    // 새로운 주문 추가
    MOCK_ORDERS_DATA.push(newOrderDetails);

    return HttpResponse.json(newOrderDetails, { status: 201 });
  }),
];
