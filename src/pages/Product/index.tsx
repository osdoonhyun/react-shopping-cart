import { useGetProductsQuery } from '@components/hooks/queries/useGetProductsQuery';

export default function ProductList() {
  const { products } = useGetProductsQuery();

  return <>Product List</>;
}
