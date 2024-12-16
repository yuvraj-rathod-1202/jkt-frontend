import getBaseUrl from "../../utils/baseURL";

const totalCustomers = async () => {
  try {
    // Fetch data from the API
    const response = await fetch(`${getBaseUrl()}/api/stocks/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data.Stocks)) {
      let totalBuying = 0; // Initialize totalBuying as let (not const)
      
      // Iterate through the array properly
      for (let i = 0; i < data.Stocks.length; i++) {
        totalBuying += Number(data.Stocks[i]?.totalPrice) || 0; // Handle undefined or null values safely
      }
      
      return totalBuying; // Return the calculated totalBuying
    } else {
        throw new Error("Invalid data format: 'stocks' is not an array.");
    }
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    return "0"; // Return "0" in case of an error
  }
};

export default totalCustomers;
