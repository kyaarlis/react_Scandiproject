import './CSS/productPage.css';
import Select from 'react-dropdown-select';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductPage() {
  const [selectOption, setSelectOption] = useState([])
  
  const [formData, setFormData] = useState({})

  // this is where form data goes for validation and to be insered in DB
  const dbUrl = 'http://karlis-veckagans.atwebpages.com/PHP/index.php'
  
    const options = [
      {
        value: "DVD",
        label: "DVD"
      },
      {
        value: "Furniture",
        label: "Furniture"
      },
      {
        value: "Book",
        label: "Book"
      },
    ]
  
    // updates the form data as the user provides data
    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setFormData(values => ({...values, [name]: value}))
    }

  // page routing
  const navigate = useNavigate()

  function handleClick() {
    navigate("/")
  }

  // sends form data to PHP to insert into DB
  const handleSubmit = (event) => {
    event.preventDefault();
  
    // fetches all sku values from the database
    axios.get(dbUrl)
      .then(function (response) {
        // checks if the sku value from the form is already present in the database
        if (response.data.some(item => item.sku === formData.sku)) {
          alert('SKU value already exists in the database. Please enter a different SKU value.');
        } else {
          // sends form data to PHP to insert into DB
          axios.post(dbUrl, formData)
            .then(function (res) {
              console.log(res.data);
              // routes the user to added product page after form is submitted
              handleClick();
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  // Page title
  document.title = 'Add Product'

        return (
                <div>
                  
                  <form
                    onSubmit={handleSubmit}
                    id="product_form" 
                    className="product_form"
                    >
                  <header className="header">
                    <h2 className="heading">Product Add</h2>
                    <div className="buttons">
                      <button type="submit" id="save-product-button" className="btn btn-primary btn-sm">Save</button> 

                      <button type="button" className="btn btn-primary btn-sm" onClick={handleClick}>Cancel</button>
                    </div>
                    <hr className="border border-dark my-4"></hr>
                  </header>
                  
                  <div className='form-container'>

                    <div className="mb-3 row g-1 align-items-center">
                      <div className="col-auto">
                        <label htmlFor="sku" className="col-form-label sku">SKU</label>
                      </div>
                      <div className="col-auto">
                        <input type="text" id="sku" className="form-control sku" name="sku" 
                        onChange={handleChange}
                        required />
                      </div>
                    </div>


                    <div className="mb-3 row g-1 align-items-center">
                      <div className="col-auto">
                        <label htmlFor="name" className="name">Name</label>
                      </div>
                      <div className="col-auto">
                        <input type="text" id="name" className="form-control name" name="name" 
                        onChange={handleChange}
                        required />
                      </div>
                    </div>


                    <div className="mb-3 row g-1 align-items-center">
                      <div className="col-auto">
                        <label htmlFor="price" className="col-form-label sku">Price</label>
                      </div>
                      <div className="col-auto">
                        <input type="number" id="price" min={0} className="form-control price" name="price" 
                        onChange={handleChange}
                        required />
                      </div>
                    </div>
            
                    <div className="product_switcher" id="product_switcher">
                      <span className="product_switcher-title">Type Switcher</span> 
                    {/* Allows the user to select desired product type */}
                      <Select name="productType" id="productType"
                      options={options} 
                      value={selectOption} 
                      onChange={(selected) => 
                        setSelectOption(selected)
                      }
                      required/>
                    </div>
                    <div className="dvd_content" id="dvd_content" style={{display: selectOption[0]?.value === "DVD" ? 'block' : 'none'}}>
                      <div className="dvd" id="DVD">
                        <label htmlFor="size">Size (MB)</label>
                        <input type="number" min={0} id="size" name="size"
                        required={selectOption[0]?.value === "DVD" ? true : false}
                        onChange={handleChange}
                          />
                      </div>
                      <p className="dvd_descr">Please specify DVD's size in megabytes</p>
                    </div>
                    <div className="furniture_content" id="furniture_content" style={{display: selectOption[0]?.value === "Furniture" ? 'block' : 'none'}}>
                      <div className="furniture" id="Furniture">
                        <label htmlFor="height">Height (CM)</label>
                        <input type="number" min={0} id="height" name="height" 
                        required={selectOption[0]?.value === "Furniture" ? true : false}
                        onChange={handleChange}
                         />
                        <label htmlFor="width">Width (CM)</label>
                        <input type="number" min={0} id="width" name="width" 
                        required={selectOption[0]?.value === "Furniture" ? true : false}
                        onChange={handleChange}
                         />
                        <label htmlFor="length">Length (CM)</label>
                        <input type="number" min={0} id="length" name="length" 
                        required={selectOption[0]?.value === "Furniture" ? true : false}
                        onChange={handleChange}
                         />
                      </div>
                      <p className="furniture_descr">Please provide dimensions in HxWxL format</p>
                    </div>
                    <div className="book_content" id="book_content" style={{display: selectOption[0]?.value === "Book" ? 'block' : 'none'}}>
                      <div className="book" id="Book">
                        <label htmlFor="weight">Weight (KG)</label>
                        <input type="number" min={0} id="weight" name="weight"
                        required={selectOption[0]?.value === "Book" ? true : false}
                        onChange={handleChange}
                         />
                      </div>
                      <p className="book_descr">Please specify Book's weight in kg</p>
                    </div>
                  </div>
                  </form>
                    
                      <footer className="footer">
                      <hr className="border border-dark my-4"></hr>
                        <p className="footer__p">Scandiweb Test assignment</p>
                      </footer>
                      
                </div>
              )  
            }


   
