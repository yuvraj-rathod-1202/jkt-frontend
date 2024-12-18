import getBaseUrl from "../../utils/baseURL";

const totalItems = async () => {
  try {
    // Fetch data from the API
    const response = await fetch(`${getBaseUrl()}/api/items/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Ensure `items` is an array before returning its length
    if (Array.isArray(data.items)) {
      return (data.items.length);
    } else {
      throw new Error("Invalid data format: 'items' is not an array.");
    }
  } catch (error) {
    console.error("Error fetching total items:", error);
    return 0; // Return 0 or handle the error appropriately
  }
};

export default totalItems;
