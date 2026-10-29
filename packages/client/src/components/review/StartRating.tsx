import { FaRegStar, FaStar } from 'react-icons/fa';

type StartRatingProps = {
  value: number;
};
const StartRating = ({ value }: StartRatingProps) => {
  const placeholders = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1 pt-1 pb-2 text-yellow-500">
      {placeholders.map((p) => (p <= value ? <FaStar key={p} /> : <FaRegStar key={p} />))}
    </div>
  );
};

export default StartRating;
