import { http, HttpResponse } from 'msw';
import { MOCK_CARTS_DATA } from '../data/carts';
import { CartProduct } from '@/types/cart';
import { generateUniqueId } from '@/utils/uniqueId';

export const cartsHandlers = [
  // 장바구니 목록(상품 조회)
  http.get('/carts', () => {
    return HttpResponse.json(MOCK_CARTS_DATA);
  }),
  // 장바구니 상품 추가
  http.post('/carts', async ({ request }) => {
    const { product } = (await request.json()) as Pick<CartProduct, 'product'>;

    const newCartProduct = {
      id: generateUniqueId(),
      product,
    };

    // 새로운 상품 추가
    MOCK_CARTS_DATA.push(newCartProduct);

    return HttpResponse.json(newCartProduct, { status: 201 });
  }),
  // TODO: 장바구니 상품 삭제
];
