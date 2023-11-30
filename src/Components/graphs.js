import React, { useEffect, useState } from 'react';
import GraphDays from './graphDays';
import GraphMonths from './graphMonths';
import { getExpenses } from '../Services/requests';

function Graphs() {
  const [expenses, setExpenses] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const savedSelectedComponent = localStorage.getItem('selectedComponent');

  useEffect(() => {
    getExpenses()
      .then((data) => {
        setExpenses(data);
  
        // Get the previously selected value from localStorage
        //const savedSelectedComponent = localStorage.getItem('selectedComponent');
      
        // Set the selected component based on the saved value
        if (savedSelectedComponent === 'component1') {
          setSelectedComponent(<GraphMonths expenses={data} />);
        } else if (savedSelectedComponent === 'component2') {
          setSelectedComponent(<GraphDays expenses={data} />);
        } else {
          // Default selection if nothing is saved in localStorage
          setSelectedComponent(<GraphMonths expenses={data} />);
        }
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  const handleComponentChange = (event) => {
    const selectedValue = event.target.value;
    
    localStorage.setItem('selectedComponent', selectedValue);
    
    // Based on the selected value, set the selected component
          switch (selectedValue) {
        case 'component1':
          setSelectedComponent(<GraphMonths expenses={expenses} />);
          break;
        case 'component2':
          setSelectedComponent(<GraphDays expenses={expenses} />);
          break;
    }
  };

  return (
    <div>
      <div className='animate__animated animate__fadeIn m-2'>
        <label htmlFor="componentSelector">Expenses by : </label>
        <select value={savedSelectedComponent} className='ml-2 bg-slate-50 border-4 rounded-lg ' id="componentSelector" onChange={handleComponentChange}>
          <option value="component1">Month</option>
          <option value="component2">Days of the Month</option>
        </select>
      </div>
      <div>
        {/* Render the selected component */}
        {selectedComponent}
      </div>
    </div>
  );
}

export default Graphs;
