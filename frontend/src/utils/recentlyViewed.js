const STORAGE_KEY = "recentlyViewed";

export const addToRecentlyViewed = (product) => {
  try {
    const existingProducts =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const filteredProducts = existingProducts.filter(
      (item) => item._id !== product._id,
    );

    const updatedProducts = [product, ...filteredProducts].slice(0, 6);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  } catch (error) {
    console.log("Recently viewed error:", error);
  }
};

export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
};

export const clearRecentlyViewed = () => {
  localStorage.removeItem(STORAGE_KEY);
};
