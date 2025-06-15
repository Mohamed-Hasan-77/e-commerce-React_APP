import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching data
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/cars");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetching categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Initial data fetch
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  //  handlers

    // Decrement product count 
  const increment = (product) => {
    const newProducts = [...products];
    const index = newProducts.findIndex((p) => p.id === product.id);
    newProducts[index].count += 1;
    setProducts(newProducts);
  };

  // Decrement product count 
  const decrement = (product) => {
    const newProducts = [...products];
    const index = newProducts.findIndex((p) => p.id === product.id);
    newProducts[index].count -= 1;
    if (newProducts[index].count === 0) {
      newProducts[index].count = 1;
      newProducts[index].isInCart = false;
    }
    setProducts(newProducts);
  };

  // Reset all products 
  const reset = () => {
    const newProducts = products.map((product) => ({
      ...product,
      count: 1,
      isInCart: false,
    }));
    toast.success('Products Removed From Cart Successfully !');
    setProducts(newProducts);
  };

  // Toggle product in cart
  const TogglleElementInCart = (product) => {
    const newProducts = products.map((p) => {
      if( p.id === product.id ) {
         return { ...product, isInCart: !product.isInCart, count: 1 } 
      } else {
        return p
      }});
    toast.success(' Successfull !');
    setProducts(newProducts);
  };

  // Handle category selection
  const handleCategory = (categoryId) => {
    setCurrentPage(1);
    setSearchValue("");
    setSelectedCategory(categoryId);
  };

  // Handle search input
  const handleSearch = (text) => {
    setCurrentPage(1);
    setSelectedCategory(0);
    setSearchValue(text);
  };

  // Handle pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageSize = 8;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  // Filter products based on selected category or search value
  let filteredProducts = [...products];
  if (parseInt(selectedCategory) !== 0) {
    filteredProducts = products.filter(
      (product) => parseInt(product.categoryId) === parseInt(selectedCategory)
    );
  } else if (searchValue) {
    filteredProducts = products.filter(
      (product) => product.brand.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  filteredProducts = filteredProducts.slice(start, end);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        filteredProducts,
        searchValue,
        selectedCategory,
        currentPage,
        pagesArr,
        increment,
        decrement,
        reset,
        TogglleElementInCart,
        handleCategory,
        handleSearch,
        handlePagination,
        getAllProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
