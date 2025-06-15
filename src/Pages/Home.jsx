import React from 'react'
import Product from "../Components/Product";
import { useProductContext } from "../Context/ProductContext";
import HomeBanner from "../Components/HomeBanner"

import { ToastContainer } from 'react-toastify';

export default function Home() {

  const {
    products,
    filteredProducts,
    categories,
    increment,
    decrement,
    TogglleElementInCart,
    handleCategory,
    handleSearch,
    handlePagination,
    searchValue,
    selectedCategory,
    currentPage,
    pagesArr,
  } = useProductContext();
  
  
  
  if(!products.length || !categories.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-spinner loading-lg"> Loading </div>
      </div>
    );
  }

  return (
     <>
          <div className="container gap-3 p-5 min-h-screen">
              <HomeBanner/>
              <div className="filter bg-gray-50 p-3 flex flex-column md:flex-row items-center justify-between rounded-lg shadow-lg  ">
                <div className="search w-full md:w-1/2 px-3">
                  <h2 className="text-2xl font-bold mb-3">Search</h2>
                  <input
                    type="text"
                    placeholder="Search Products"
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchValue}
                    className="input input-bordered w-full  "
                  />
                </div>
                <div className="categories w-full md:w-1/2 px-3 mt-5 md:mt-0">
                  <h2 className="text-2xl font-bold mb-3">Categories</h2>
                  <select
                      onChange={(e) => handleCategory(e.target.value)}
                      className="select w-full">
                      <option value="0" >All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
    
              <div className="flex items-center  flex-wrap mt-10 ">
                {filteredProducts?.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    increment={increment}
                    decrement={decrement}
                    TogglleElementInCart={TogglleElementInCart}
                  />
                ))}
    
                <div className="join w-full flex justify-center mt-5">
                  {pagesArr.map((page) => {
                    return  <button key={page} onClick={() => handlePagination(page)} className={`join-item btn ${page === currentPage ? "bg-slate-700 text-white" : ""}`}> {page} </button>
                  })}
                </div>
    
              </div>
          </div>
          <ToastContainer />
         
        </>
      );
}
