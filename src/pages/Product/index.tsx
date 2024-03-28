import ProductItem from '@components/@common/Product/ProductItem';
import { useGetProductsQuery } from '@components/hooks/queries/useGetProductsQuery';
import { Product } from '@components/types/product';

export default function ProductList() {
  const { products } = useGetProductsQuery();

  return (
    <section className='product-container'>
      <ul className='product-list'>
        {products?.map((product: Product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </ul>
    </section>
  );
}
