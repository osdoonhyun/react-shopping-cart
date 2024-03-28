import ProductDetail from '@components/@common/Product/ProductDetail';
import { useGetProductDetailQuery } from '@components/hooks/queries/useGetProductDetailQuery';

type DetailProps = {
  id: string;
};

export default function Detail({ id }: DetailProps) {
  const { product } = useGetProductDetailQuery(id);

  if (!product) {
    return <>상품 준비중 입니다.</>;
  }

  return <ProductDetail {...product} />;
}
