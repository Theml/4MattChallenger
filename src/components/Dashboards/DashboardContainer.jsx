"use client"
import Dashboard from './Dashboard';
import DashboardBar from './DashboardBar';
import DashboardInactiveUsers from './DashboardInactiveUsers';
import DashboardHorizontalBar from './DashboardHorizontalBar';
import Filter from '../FilteredData';
import { useState } from 'react';
import { ApplyFilter } from '../Filter';
import jsonData from '../../../public/data/Dados.json'
import DashboardActiveUsers from './DashboardActiveUsers';

function DashboardContainer() {

  const [filterOptions, setFilterOptions] = useState({
    startDate: '',
    endDate: '',
    selectedCategory: '',
    selectedApplication: '',
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
      newFilterOptions.selectedCategory || null,
      newFilterOptions.selectedApplication || null, 
    );
      console.log(newData);
    setFilteredData(newData);
  };

  return (
    <div className='flex flex-1 bg-newGray flex-col'>

      <Filter onChange={handleFilterChanges}/>

      <div className="mb-4">

        <Dashboard 
          filteredData={filteredData} 
          startDate={filterOptions.startDate} 
          endDate={filterOptions.endDate} 
          selectedApplication={filterOptions.selectedApplication} 
          selectedCategory={filterOptions.selectedCategory}
        />

      </div>

      <div className="flex flex-grow bg-newGray">

        <div className="ml-4 w-1/2 ">

          <DashboardBar 
            filteredData={filteredData} 
            startDate={filterOptions.startDate} 
            endDate={filterOptions.endDate} 
            selectedApplication={filterOptions.selectedApplication} 
            selectedCategory={filterOptions.selectedCategory}
          />
          <DashboardHorizontalBar 
            filteredData={filteredData} 
            startDate={filterOptions.startDate} 
            endDate={filterOptions.endDate} 
            selectedApplication={filterOptions.selectedApplication} 
            selectedCategory={filterOptions.selectedCategory}
          />

        </div>

        <div className=" ml-4 w-1/2 ">

          <DashboardActiveUsers
            filteredData={filteredData} 
            startDate={filterOptions.startDate} 
            endDate={filterOptions.endDate} 
            selectedApplication={filterOptions.selectedApplication} 
            selectedCategory={filterOptions.selectedCategory}
          />
          <DashboardInactiveUsers 
            filteredData={filteredData} 
            startDate={filterOptions.startDate} 
            endDate={filterOptions.endDate} 
            selectedApplication={filterOptions.selectedApplication} 
            selectedCategory={filterOptions.selectedCategory}
          />
          
        </div>
        
      </div>

    </div>
  );
}

export default DashboardContainer;
