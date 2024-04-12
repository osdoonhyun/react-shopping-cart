import { http, HttpResponse } from 'msw';
import { MOCK_PRODUCTS_DATA } from '../data/products';

export const productsHandlers = [
  // 상품 목록 조회
  http.get('/products', () => {
    return HttpResponse.json(MOCK_PRODUCTS_DATA);
  }),
  // 상품 상세(단일) 조회
  http.get('/products/:id', ({ params }) => {
    const { id } = params;
    const product = MOCK_PRODUCTS_DATA.find(
      (product) => product.id === Number(id)
    );

    return HttpResponse.json(product);
  }),
];
