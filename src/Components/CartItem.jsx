import React from "react";
import { useProductContext } from "../Context/ProductContext";


export default function CartItem(props) {
    const { product, increment, decrement, TogglleElementInCart} = props

  return <>
        <tr className="hover">
      <td className="text-xl">{product.count}</td>
      <td>
        <img src={product.image} alt={product.brand} className="w-24 object-contain mx-auto" />
      </td>
      <td className="font-semibold text-xl">{product.brand} {product.model}</td>
      <td>
        <button onClick={() => TogglleElementInCart(product)}>
          <div><img className="size-5 rounded-box cursor-pointer" src="https://cdn-icons-png.freepik.com/512/8567/8567781.png"/></div>
        </button>
      </td>
      <td>
        <button onClick={() => increment(product)} className="btn btn-sm btn-outline text-green-600">
          +
        </button>
      </td>
      <td>
        <button onClick={() => decrement(product)} className="btn btn-sm btn-outline text-red-600">
          -
        </button>
      </td>
    </tr>
  </>;
}


