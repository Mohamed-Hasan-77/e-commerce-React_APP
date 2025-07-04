import { Link, NavLink } from "react-router";
import { useProductContext } from "../Context/ProductContext";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {


  const {products} = useProductContext();
  const { user, logout } = useAuth();

  const numberOfProductsInCart = products?.filter((product) => product.isInCart).length;


  return (
    <>
      <div className="navbar bg-base-100 shadow-sm px-5">
        <div className="flex-1">
          <Link to="/" className=""> <img src="./src/assets/logo.png" className="w-20" alt="logo" /> </Link>
        </div>
        <div className="flex items-center  ">
          <div className="links">
            <ul className="flex items-center justify-between gap-3 ">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => isActive ? "text-blue-500" : ""}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) => isActive ? "text-blue-500" : ""}
                >
                  Blog
                </NavLink>
              </li>

              {user?.role === "admin" && (
                <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                  >
                    Admin
                  </NavLink>
                    </li>
                )}


              {!user && (
                <>
                  <li>
                      <NavLink
                        to="/login"
                        className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/register"
                        className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                      >
                        Register
                      </NavLink>
                    </li>
                </>
              )}

              {user && (
                  <>
                    <li>Hello, {user.name}</li>
                    <li>
                      <button onClick={logout} className="btn btn-sm">Logout</button>
                    </li>
                  </>
                )}

            </ul>
          </div>

          <NavLink
            to="/cart"
            tabIndex={0}
            role="button"
            className={`${(isActive) =>
              isActive && "text-blue-500"} btn btn-ghost btn-circle `}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item bg-green-500">
                {numberOfProductsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
