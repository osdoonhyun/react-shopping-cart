import ProductItem from '@components/Product/ProductItem';
import { grid } from '@/styled-system/patterns';
import { useGetProductListQuery } from '@/hooks/queries/useGetProductListQuery';
import { Product } from '@/types/product';

export default function ProductListPage() {
  const { products, ref } = useGetProductListQuery();

  return (
    <>
      <section
        className={grid({
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          rowGap: '40px',
          columnGap: '40px',
          maxWidth: '1200px',
          '@media (max-width: 1024px)': {
            maxWidth: 'unset',
          },
        })}
      >
        {products?.map((product: Product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </section>

      <div ref={ref} />
    </>
  );
}
