import { http, HttpResponse } from 'msw';
import list from '@/mocks/db.json';

export const handlers = [
  http.get('/products', () => {
    return HttpResponse.json(list.products);
  }),
  http.get('/carts', () => {
    return HttpResponse.json(list.carts);
  }),
  http.get('/orders', () => {
    return HttpResponse.json(list.orders);
  }),
];
