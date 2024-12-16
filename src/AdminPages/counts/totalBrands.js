import getBaseUrl from "../../utils/baseURL";

const totalBrands = async () => {
  try {
    // Fetch data from the API
    const response = await fetch(`${getBaseUrl()}/api/brands/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Ensure `brands` is an array before returning its length
    if (Array.isArray(data.Brands)) {
      return (data.Brands.length);
    } else {
      throw new Error("Invalid data format: 'brands' is not an array.");
    }
  } catch (error) {
    console.error("Error fetching total brands:", error);
    return 0; // Return 0 or handle the error appropriately
  }
};

export default totalBrands;
