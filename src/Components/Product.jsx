import React from "react";

export default function Product(props) {
  const { product, TogglleElementInCart } = props;

  return (
    <>
        <div className="w-full md:w-1/3 lg:w-1/4 p-3">
            <div className="card  shadow min-h-[300px] rounded-lg overflow-hidden">
            <figure className="bg-gray-100 h-44">
                <img
                src={product.image}
                alt={product.brand}
                className="h-28"
                 />
            </figure>
            <div className="card-body bg-white h-48">
                <div className="w-full flex justify-between items-center">
                    <h4 className="card-title text-sm w-fit"> {product.brand} {product.model} </h4>
                    <p className="text-gray-500 text-xs text-end"> Price : {product.pricePerDay}00$ </p>
                </div>
                <p className="text-xs mt-2"> {product.description.split(" ").slice(0, 10).join(" ")}... </p>
                <div className="card-actions ">
                    <button onClick={() => TogglleElementInCart(product)} className={` btn text-xs px-2  text-white w-full ${!product.isInCart ? "bg-primary " : "bg-red-600"} `}> {!product.isInCart ? "Add To Cart" : "Remove From Cart"} </button>
                </div>
            </div>
            </div>

        </div>

    </>
  );
}
