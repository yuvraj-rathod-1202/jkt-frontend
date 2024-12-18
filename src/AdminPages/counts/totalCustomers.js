import getBaseUrl from "../../utils/baseURL";

const totalCustomers = async () => {
    try{
        // Fetch data from the API
        const response = await fetch(`${getBaseUrl()}/api/customers/`);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data.customers)) {
            return (data.data.customers.length);
          } else {
            throw new Error("Invalid data format: 'brands' is not an array.");
          }
        
    }catch{
        return "0"
    }
}

export default totalCustomers;