import ProductDetail from '@components/Product/ProductDetail';
import { useGetProductDetailQuery } from '@/hooks/queries/useGetProductDetailQuery';

type DetailProps = {
  id: string;
};

export default function ProductDetailPage({ id }: DetailProps) {
  const { product } = useGetProductDetailQuery(id);

  if (!product) {
    return <>상품 준비중 입니다.</>;
  }

  return <ProductDetail product={product} />;
}
