"use client"
import { useState } from 'react';
import jsonData from '../../public/data/Dados.json'

const Filter = ({ onChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);

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
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
      
        const filteredData = selectedCategory
          ? data.filter((item) => item.Category === selectedCategory)
          : data;
      
        onChange({
          startDate,
          endDate,
          category: selectedCategory || null,
          application: selectedApplication || null,
          filteredData,
        });
        console.log(selectedCategory);
      };
      
      const handleApplicationChange = (event) => {
        const selectedApplication = event.target.value;
        setSelectedApplication(selectedApplication);
      
        const filteredData = selectedApplication
          ? data.filter((item) => item.Application === selectedApplication)
          : data;
      
        onChange({
          startDate,
          endDate,
          category: selectedCategory || null,
          application: selectedApplication || null,
          filteredData,
        });
        console.log(selectedApplication);
      };
      
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
            className='custom-select mr-2 rounded-xl mt-4'
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />

          <input
            className='custom-select rounded-xl mt-4'
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

            <option value="">All Categories</option>

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

            <option value="">All Applications</option>

            {App.map((application) => (
              <option key={application} value={application}>
                {application}
              </option>
            ))}

          </select>

        </div>

        <button
          className="bg-hiddenButtonColor hover:bg-newViolet text-white px-4 py-2 rounded"
          onClick={applyFilter}
        >
          Apply Filter
        </button>

      </div>
    );
  };

  export default Filter;