import React, { useEffect } from "react";
import { Link } from "react-router";
import { useProductContext } from "../Context/ProductContext";

export default function Admin() {

  const {products, getAllProducts} = useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  return <div className="flex flex-col items-center justify-center gap-4 p-4">
    
    <h1 className="text-4xl">Admin </h1>

    <div className="flex flex-wrap gap-3 mx-auto items-center w-3/4">
          {products.map((product) => (
            <div key={product.id} className="w-1/4 flex items-center justify-between p-3 rounded-lg shadow-md bg-black/10">
                <div><img className="h-10 rounded-box" src={product.image}/></div>
                <div className="list-col-grow">
                <div> {product.brand} {product.model} </div>
                </div>
            </div>
        ))}
      
    </div>
    <Link to="/addProduct" className="btn btn-ghost bg-black/20 mt-4">
        Add New Product +
    </Link>
  
  </div>;
}
