"use client"
import { useState } from 'react';
import jsonData from '../../public/data/Dados.json'

const Filter = ({ onChange, categoryOptions, applicationOptions }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedApplication, setSelectedApplication] = useState('');

    const data = jsonData;

    const Categories = Array.from(new Set(data.map((item) => item.Category)));
    const App = Array.from(new Set(data.map((item) => item.Application)));
  
    const handleStartDateChange = (event) => {
      setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
      };
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handleApplicationChange = (event) => {
      setSelectedApplication(event.target.value);
    };
  
    // Pass the selected values to the parent component when the filter changes
    const applyFilter = () => {
      onChange({
        startDate,
        endDate,
        category: selectedCategory || null,
        application: selectedApplication || null,
      });
    };
  
    return (
      <div className="justify-center items-center flex h-12 p-4 space-y-4">
        <div>
          <input
            className='mr-2 rounded-xl mt-4'
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <input
            className='rounded-xl mt-4'
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div>
          <select
            className='custom-select m-2'
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className='custom-select m-2'
            value={selectedApplication}
            onChange={handleApplicationChange}
          >
            <option value="">Select an application</option>
            {App.map((application) => (
              <option key={application} value={application}>
                {application}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={applyFilter}
        >
          Apply Filter
        </button>
      </div>
    );
  };
  
  export default Filter;