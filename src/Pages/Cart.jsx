import React from "react";
import CartItem from "../Components/CartItem";
import { ToastContainer } from 'react-toastify';
import { useProductContext } from "../Context/ProductContext";

export default function Cart() {

    const {
        products,
        reset,
        increment,
        decrement,
        TogglleElementInCart,
        } = useProductContext();

    const productsInCart = products.filter(product => product.isInCart);

    
  return <>
    <div className="min-h-screen px-4">
  <h1 className="text-4xl font-bold my-6 text-center">🛒 Cart</h1>

  <div className="flex flex-col items-center">
    {productsInCart.length === 0 ? (
      <h1 className="text-2xl text-red-500 my-10">Your Cart is Empty</h1>
    ) : (
      <div className="w-full max-w-4xl overflow-x-auto rounded-lg shadow">
        <table className="table w-full text-center">
          <thead className="bg-base-200 text-gray-600">
            <tr>
              <th>Count</th>
              <th>Image</th>
              <th>Product</th>
              <th>Delete</th>
              <th>+</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody className="bg-base-100">
            {products.map(
              (product, index) =>
                product.isInCart && (
                  <CartItem
                    key={product.id}
                    index={index + 1}
                    product={product}
                    increment={increment}
                    decrement={decrement}
                    TogglleElementInCart={TogglleElementInCart}
                  />
                )
            )}
          </tbody>
        </table>
      </div>
    )}

    {productsInCart.length > 0 && (
      <button
        onClick={reset}
        className="btn mt-6 text-red-500 border border-red-400 hover:bg-red-100"
      >
        Reset Cart
      </button>
    )}
  </div>
</div>
<ToastContainer />

  
  </>
}
