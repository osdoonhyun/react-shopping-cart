import { MouseEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePostCartProductMutation } from '@components/hooks/mutations/usePostCartProductMutation';
import { Product } from '@components/types/product';

interface ProductItemProps extends Product {}

export default function ProductItem({
  id,
  name,
  imageUrl,
  price,
}: ProductItemProps) {
  const navigate = useNavigate({ from: '/list' });

  const { mutate: postCartProduct } = usePostCartProductMutation();

  const handleClickProductItem = (productId: string) => {
    navigate({ to: '/list/$productId', params: { productId } });
  };

  const handleCartClick = (event: MouseEvent) => {
    event.stopPropagation();
    postCartProduct({ product: { id, name, price, imageUrl } });
  };
  return (
    <li
      className='product-item-box'
      onClick={() => handleClickProductItem(String(id))}
    >
      <img src={imageUrl} alt={name} />
      <div className='flex justify-between p-5'>
        <div className='product-info'>
          <span className='product-info__name'>{name}</span>
          <span className='product-info__price'>{price}원</span>
        </div>
        <button onClick={handleCartClick}>
          <img src='@/assets/svgs/cart.svg' alt='장바구니' />
        </button>
      </div>
    </li>
  );
}
