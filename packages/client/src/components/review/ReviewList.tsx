import axios from 'axios';
import StartRating from './StartRating';
import Skeleton from 'react-loading-skeleton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { HiSparkles } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { reviewsApi, type ReviewResponse } from './reviewsApi';

type ReviewListProps = {
  productId: number;
};

const ReviewList = ({ productId }: ReviewListProps) => {
  const { data, isLoading, error } = useQuery<ReviewResponse>({
    queryKey: ['reveiws', productId],
    queryFn: () => reviewsApi.fetchReviews(productId),
  });

  if (isLoading) {
    return <ReviewSkeleton />;
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      console.log('🚀 ~ ReviewList ~ error:', error.response);
      console.error('👉 Server Response Data:', error.response?.data);
    }

    if (axios.isAxiosError(error) && error.response?.data) {
      const serverMessage = error.response.data.message || error.response.data.error;

      return (
        <p className="text-red-500">
          Error: {serverMessage || 'Could not load reviews. Please try again.'}
        </p>
      );
    }
  }

  if (!data?.reviews.length) {
    return null;
  }

  return (
    <div>
      <div className="space-y-3">
        <div className="">
          {data.summary ? data.summary : <SummarizeReviews productId={productId} />}
        </div>
        <div className="space-y-3">
          {data?.reviews.map((review) => (
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

const SummarizeReviews = ({ productId }: ReviewListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: reviewsApi.summarizeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reveiws', productId] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log('🚀 ~ SummarizeReviews ~ error:', error.response);
        console.error('👉 Server Response Data:', error.response?.data);
        toast.error(
          error.response?.data.error ? error.response.data.error : 'Failed to summarize review'
        );
      } else {
        toast.error('Failed to summarize review');
      }
    },
  });

  return (
    <div className="space-y-3">
      <Button
        onClick={() => mutation.mutate(productId)}
        className="cursor-pointer"
        disabled={mutation.isPending}
      >
        <HiSparkles /> {mutation.isPending ? 'Loading...' : 'Summarize'}
      </Button>
      {mutation.isPending ? (
        <div className="space-y-1">
          <Skeleton width="95%" height={18} />
          <Skeleton width="95%" height={18} />
          <Skeleton width="95%" height={18} />
          <Skeleton width="45%" height={18} />
        </div>
      ) : null}
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
