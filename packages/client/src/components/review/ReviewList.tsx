import axios from 'axios';
import { useEffect, useState } from 'react';
import StartRating from './StartRating';
import Skeleton from 'react-loading-skeleton';

type ReviewListProps = {
  productId: string;
};

type Review = {
  id: string;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};

type ReviewResponse = {
  summary: string | null;
  reviews: Review[];
};

const ReviewList = ({ productId }: ReviewListProps) => {
  const [reviews, setReviews] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(`/api/v1/products/${productId}/reviews/`);
        setReviews(data);
      } catch (error) {
        console.error(error);
        setError('Coulnot load the reviews. Please try again');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return <ReviewSkeleton />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <div className="space-y-3">
        <div className="">{reviews?.summary}</div>
        <div className="space-y-3">
          {reviews?.reviews.map((review) => (
            <div key={review.id}>
              <p className="font-semibold">{review.author}</p>
              <StartRating value={review.rating} />
              <p className="">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewSkeleton = () => {
  return (
    <div className="space-y-3">
      {/* Summary Block Skeleton */}
      <div className="space-y-1">
        <Skeleton width="75%" height={18} />
        <Skeleton width="45%" height={18} />
      </div>

      {/* Reviews List Skeleton */}
      <div className="space-y-6 pt-4">
        {/* Generates 3 mock review item blocks */}
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0"
          >
            {/* Author Line placeholder */}
            <div>
              <Skeleton width={120} height={16} />
            </div>

            {/* Stars Block (mimics star layout structure) */}
            <div className="flex space-x-1 py-1">
              <Skeleton circle width={14} height={14} count={5} inline />
            </div>

            {/* Review Content Paragraph (renders 2 distinct paragraphs lines automatically) */}
            <div>
              <Skeleton count={2} height={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
