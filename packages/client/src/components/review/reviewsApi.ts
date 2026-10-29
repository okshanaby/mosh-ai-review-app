import axios from 'axios';

export type Review = {
  id: string;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
};

export type ReviewResponse = {
  summary: string | null;
  reviews: Review[];
};

export const reviewsApi = {
  async fetchReviews(productId: number) {
    const { data } = await axios.get<ReviewResponse>(`/api/v1/products/${productId}/reviews/`);
    return data;
  },
  summarizeReview(productId: number) {
    return axios.post(`/api/v1/products/${productId}/reviews/summarize`);
  },
};
