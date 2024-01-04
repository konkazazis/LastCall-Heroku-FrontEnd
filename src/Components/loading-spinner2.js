import React from 'react';
import { BeatLoader} from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <BeatLoader color="#94a3b8" />
    </div>
  );
};

export default LoadingSpinner;
