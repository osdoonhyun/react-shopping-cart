import useCartStore from '@/store/cartStore';

export default function CartProductsHeader() {
  const cart = useCartStore.use.cart();
  return (
    <>
      <h3 className='cart-title'>{`든든배송 상품(${cart?.length ?? 0}개)`}</h3>
      <hr className='divide-line-gray mt-10' />
    </>
  );
}
