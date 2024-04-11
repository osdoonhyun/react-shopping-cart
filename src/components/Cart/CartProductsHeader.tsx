interface CartProductsHeaderProps {
  productCount: number;
}

export default function CartProductsHeader({
  productCount,
}: CartProductsHeaderProps) {
  return (
    <>
      <h3 className='cart-title'>{`든든배송 상품(${productCount}개)`}</h3>
      <hr className='divide-line-gray mt-10' />
    </>
  );
}
