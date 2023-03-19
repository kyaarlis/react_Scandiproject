import React from 'react';
import ProductPage from './productPage'
import ProductList from './productList';
import LogInPage from './login/LogIn'
import SignUpPage from './login/SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';

export default function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogInPage />}/>
      <Route path='addproduct' element={<ProductPage />} /> 
      <Route path='products' element={<ProductList />} /> 
      <Route path='signup' element={<SignUpPage />} /> 
    </Routes>
  </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
