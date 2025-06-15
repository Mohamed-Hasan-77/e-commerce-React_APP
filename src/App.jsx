import { BrowserRouter, Routes, Route } from "react-router";
import { ProductProvider } from "./Context/ProductContext";

import Blog from './Pages/Blog'
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Admin from "./Pages/Admin";
import AddProduct from "./Pages/AddProduct";
import AddPost from "./Pages/AddPost";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute"; 
import { AuthProvider } from "./Context/AuthContext";

import './App.css'
import Footer from "./Components/Footer";



function App() {

  return <>  
  <BrowserRouter>
    <AuthProvider>
    <ProductProvider>
      <Navbar />
        <Routes>
          <Route path="/" 
          element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={
             <ProtectedRoute> <Admin /></ProtectedRoute>} />
          <Route path="/addProduct" element={<ProtectedRoute> <AddProduct /></ProtectedRoute> } />
          <Route path="/addPost" element={<ProtectedRoute> <AddPost /></ProtectedRoute> } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
    </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
  </>

}

export default App
