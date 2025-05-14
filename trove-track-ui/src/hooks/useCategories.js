import { useState, useEffect } from "react";
import { getAllCategories } from "../services/categoryService";

const useCategories = () => {
  // State setup
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // Async function that uses the category service to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError("Oops! We couldn't fetch the categories. Please try again.");
      console.error(err);
    }
  };

  // Runs fetchCategories once when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, error, refetch: fetchCategories };
};

export default useCategories;
