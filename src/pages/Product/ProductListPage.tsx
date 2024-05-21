import ProductItem from '@components/Product/ProductItem';
import { useGetProductListQuery } from '@/hooks/queries/useGetProductListQuery';
import { Product } from '@/types/product';

export default function ProductListPage() {
  const { products, ref } = useGetProductListQuery();

  return (
    <>
      <section className='product-container'>
        <ul className='product-list'>
          {products?.map((product: Product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </ul>
      </section>

      <div ref={ref} />
    </>
  );
}
