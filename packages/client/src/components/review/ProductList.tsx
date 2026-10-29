import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';

const ProductList = () => {
  const { productId } = useParams<{ productId: string }>();

  return (
    <div className="py">
      <ReviewList productId={Number(productId)} />
    </div>
  );
};

export default ProductList;
