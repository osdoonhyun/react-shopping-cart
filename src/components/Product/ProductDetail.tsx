import { useNavigate } from '@tanstack/react-router';
import { Product } from '@/types/product';
import { usePostCartProductMutation } from '@/hooks/mutations/usePostCartProductMutation';

export default function ProductDetail({ id, name, price, imageUrl }: Product) {
  const navigate = useNavigate();

  const { mutate: postCartProduct } = usePostCartProductMutation();

  const handleCartClick = () => {
    postCartProduct({ product: { id, name, price, imageUrl } });

    navigate({ to: '/cart' });
  };

  return (
    <div className='product-detail-container'>
      <div className='flex-col-center w-520'>
        <img className='w-480 h-480 mb-10' src={imageUrl} alt={name} />
        <div className='product-detail-info'>
          <span className='product-detail-info__name'>{name}</span>
          <hr className='divide-line-gray my-20' />
          <div className='flex justify-between'>
            <span>금액</span>
            <span className='product-detail-info__price'>{price}원</span>
          </div>
        </div>
        <button
          onClick={handleCartClick}
          className='product-detail-button flex-center mt-20'
        >
          장바구니
        </button>
      </div>
    </div>
  );
}
