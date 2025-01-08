import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import type { StarRating } from '../types';

export function StarRatingDisplay({ rating, maxRating }: StarRating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-4 h-4 text-yellow-400" />}
      {[...Array(maxRating - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
      ))}
    </div>
  );
}