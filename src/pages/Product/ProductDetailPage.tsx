import ProductDetail from '@components/Product/ProductDetail';
import { useGetProductDetailQuery } from '@/hooks/queries/useGetProductDetailQuery';
import { Product } from '@/types/product';

type ProductDetailPayload = {
  id: Product['id'];
};

export default function ProductDetailPage({ id }: ProductDetailPayload) {
  const { product } = useGetProductDetailQuery(id);

  if (!product) {
    return <>상품 준비중 입니다.</>;
  }

  return <ProductDetail product={product} />;
}
