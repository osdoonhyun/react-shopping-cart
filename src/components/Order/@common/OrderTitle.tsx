interface OrderTitleProps {
  title: string;
}

export default function OrderTitle({ title }: OrderTitleProps) {
  return (
    <header className='flex-col-center mt-20'>
      <h2 className='order-section__title'>{title}</h2>
      <hr className='divide-line mt-20' />
    </header>
  );
}
