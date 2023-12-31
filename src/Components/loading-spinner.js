import React from 'react';
import { DotLoader} from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <DotLoader color="#94a3b8" />
    </div>
  );
};

export default LoadingSpinner;
