"use client"
// Para ter garantia que o filtro ta funcionando tenho que possibilitar que o dashboard funcione de forma que onde vem seus dados seja alterado para isso teria que deixar como um state sendo default o que eu já quero e possibilitando um effect para alterar o state e visualizar a alteração de fato.
function ApplyFilter(data, startDate, endDate, selectedCategory, selectedApp) {
    let filteredData = data;

  if (startDate && endDate) {

    const startDateObj = new Date(startDate);

    const endDateObj = new Date(endDate);

    filteredData = filteredData.filter((item) => {
      const itemDate = new Date(item.Data);
      
      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
  }

  if (selectedCategory && selectedCategory !== "All Categories") {
    filteredData = filteredData.filter((item) => item.Category === selectedCategory);
  }

  if (selectedApp && selectedApp !== "All Applications") {
    filteredData = filteredData.filter((item) => item.Application === selectedApp);
  }

  return filteredData;
}

export { ApplyFilter };
