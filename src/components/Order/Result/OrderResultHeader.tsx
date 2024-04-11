interface OrderResultHeader {
  orderCount: number;
}

export default function OrderResultHeader({ orderCount }: OrderResultHeader) {
  return (
    <>
      <h3 className='order-title'>{`주문 상품(${orderCount}건)`}</h3>
      <hr className='divide-line-gray mt-10' />
    </>
  );
}
