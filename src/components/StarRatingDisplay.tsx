import React from 'react';

// 定义组件属性类型
interface StarRatingDisplayProps {
  rating: number;   // 当前评分
  maxRating: number; // 最大评分
}

// StarRatingDisplay 组件实现
const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({ rating, maxRating }) => {
  // 根据评分生成星星
  const stars = [];
  for (let i = 0; i < maxRating; i++) {
    if (i < rating) {
      stars.push(<span key={i}>&#9733;</span>); // 填充星星字符
    } else {
      stars.push(<span key={i}>&#9734;</span>); // 空心星星字符
    }
  }

  return <div>{stars}</div>;
};

export default StarRatingDisplay;