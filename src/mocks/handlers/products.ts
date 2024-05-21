import { http, HttpResponse } from 'msw';
import { MOCK_PRODUCTS_DATA } from '../data/products';

const productList = MOCK_PRODUCTS_DATA;

export const productsHandlers = [
  // 상품 목록 조회
  http.get('/products', ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get('offset') || 8);
    const limit = Number(url.searchParams.get('limit') || 0);

    const totalSize = productList.length;
    const products = productList.slice(offset, offset + limit);
    const next = offset + limit < totalSize ? offset + limit : null;

    console.log('PRODUCTHANDLERS', { totalSize, products, next });

    return HttpResponse.json({
      products,
      totalSize,
      next,
    });
  }),
  // 상품 상세(단일) 조회
  http.get('/products/:id', ({ params }) => {
    const { id } = params;
    const product = productList.find((product) => product.id === Number(id));

    return HttpResponse.json(product);
  }),
];
