import React from 'react';
import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <ScaleLoader color="#94a3b8" />
    </div>
  );
};

export default LoadingSpinner;
