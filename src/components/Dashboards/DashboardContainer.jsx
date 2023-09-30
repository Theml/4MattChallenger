"use client"
import Dashboard from './Dashboard';
import DashboardBar from './DashboardBar';
import DashboardCircle from './DashboardCircle';
import DashboardHorizontalBar from './DashboardHorizontalBar';
import Filter from '../FilteredData';
import { useState } from 'react';
import { ApplyFilter } from '../Filter';
import jsonData from '../../../public/data/Dados.json'

function DashboardContainer() {

  const [filterOptions, setFilterOptions] = useState({
    startDate: '',
    endDate: '',
    selectedCategory: '',
    selectedApp: '',
  })

  const [filteredData, setFilteredData] = useState([])

  const handleFilterChanges = (newFilterOptions) => {
    setFilterOptions(newFilterOptions);
  
    let newData = jsonData;
  
    // Apply date filter
    newData = ApplyFilter(
      newData,
      newFilterOptions.startDate,
      newFilterOptions.endDate,
      null, 
      null 
    );
  
    // Apply category filter if a category is selected
    if (newFilterOptions.selectedCategory) {
      newData = ApplyFilter(
        newData,
        newFilterOptions.startDate,
        newFilterOptions.endDate,
        newFilterOptions.selectedCategory,
        null  
      );
    }
  
    // Apply application filter if an application is selected
    if (newFilterOptions.selectedApplication) {
      newData = ApplyFilter(
        newData,
        newFilterOptions.startDate,
        newFilterOptions.endDate,
        null,  
        newFilterOptions.selectedApplication
      );
    }
  
    setFilteredData(newData);
  };

  return (
    <div className='flex flex-1 bg-newGray flex-col'>

      <Filter onChange={handleFilterChanges}/>

      <div className="mb-4">

        <Dashboard 
          data={filteredData}
        />

      </div>

      <div className="flex flex-grow bg-newGray">

        <div className="ml-4 w-1/2 ">

          <DashboardBar 
          data={filteredData}
          />
          <DashboardHorizontalBar 
          data={filteredData}
          />

        </div>

        <div className=" ml-4 w-1/2 ">

          <DashboardBar className='bg-white'
          data={filteredData}
          />
          <DashboardCircle 
          data={filteredData}
          />
          
        </div>
        
      </div>

    </div>
  );
}

export default DashboardContainer;