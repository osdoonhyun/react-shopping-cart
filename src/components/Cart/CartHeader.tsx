import Title from '@components/common/Title/Title';

export default function CartHeader() {
  return (
    <header className='flex-col-center mt-20'>
      <Title as='h2' variant='title'>
        장바구니
      </Title>
    </header>
  );
}
