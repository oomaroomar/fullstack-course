import React from 'react';

interface TotalProps {
  total: number;
}

const Total: React.FC<TotalProps> = ({ total }: TotalProps) => {
  return <h2>Total number of exercises: {total}</h2>;
};

export default Total;
