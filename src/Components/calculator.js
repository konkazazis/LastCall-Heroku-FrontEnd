import React, { useState } from 'react';

function MyComponent() {
  const [calculation, setCalculation] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const calculatedResult = eval(calculation);
        setResult(calculatedResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setCalculation('');
      setResult('');
    } else {
      setCalculation((prevCalculation) => prevCalculation + value);
    }
  };

  return (
    <div className='animate__animated animate__fadeIn m-2 h-max'>
        <h2 className='text-2xl font-semibold mb-4'>Calculator</h2>
        <div className='flex justify-between'>
          <div>
            Maybe a history of calculations here?
          </div>

          <div className='calculator w-[30rem] mt-4'>
            <div className='display p-2 text-3xl font-bold text-right h-10'>
              {result !== '' ? result : calculation}
            </div>
            <div className='buttons grid grid-cols-4 gap-2 p-2'>
              {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 'C', 0, '=', '/'].map(
                (value, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(value)}
                    className={`w-full p-2 text-2xl font-semibold bg-gray-200 hover:bg-gray-300 rounded`}
                  >
                    {value}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        
      
    </div>
  );
}

export default MyComponent;
