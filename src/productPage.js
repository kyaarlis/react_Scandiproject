import './CSS/productPage.css';
import Select from 'react-dropdown-select';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductPage() {
  const [selectOption, setSelectOption] = useState([])
  
  const [formData, setFormData] = useState({})

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
    
    axios.post('http://localhost/react_ScandiProject/src/PHP/index.php', formData).then(function(res){
      console.log(res.data)
      // routes the user to added product page after form is submitted
      handleClick()
    })
  }

        return (
                <div>
                  <form
                    onSubmit={handleSubmit}
                    id="product_form" 
                    className="product_form"
                    >
                  <header className="header">
                    <h2 className="heading">Product Add</h2>
                    <div className="product__buttons">
                      <button type="submit" id="save-product-button" className="save__product" style={{display: 'inline'}}>Save</button>
                      <button className="cancel__button" onClick={handleClick}>Cancel</button> 
                    </div>
                  </header>
                  <hr size="2,5" width="95%" color="black" className="header__line" />
                  
                    <label htmlFor="sku" className="sku">SKU</label>
                    <input type="text" id="sku" className="sku" name="sku"
                    onChange={handleChange}
                    required />
                    <br /><br />
                    <label htmlFor="name" className="name">Name</label>
                    <input type="text" id="name" className="name" name="name" 
                    onChange={handleChange}
                    required />
                    <br /><br />
                    <label htmlFor="price">Price ($)</label>
                    <input type="number" min={0} id="price" name="price"
                    onChange={handleChange}
                     required />
                    <div className="product_switcher" id="product_switcher">
                      <span className="product_switcher-title">Type Switcher</span>  

                    {/* Allows the user to select desired product type */}
                      <Select name="productType" id="productType"
                      options={options} 
                      value={selectOption} 
                      onChange={(selected) => 
                        setSelectOption(selected)
                      }
                     />
                    </div>
                    <div className="dvd_content" id="dvd_content" style={{display: selectOption[0]?.value === "DVD" ? 'block' : 'none'}}>
                      <div className="dvd" id="DVD">
                        <label htmlFor="size">Size (MB)</label>
                        <input type="number" min={0} id="size" name="size"  
                        // value={formData.size}
                        onChange={handleChange}
                          />
                      </div>
                      <p className="dvd_descr">Please specify DVD's size in megabytes</p>
                    </div>
                    <div className="furniture_content" id="furniture_content" style={{display: selectOption[0]?.value === "Furniture" ? 'block' : 'none'}}>
                      <div className="furniture" id="Furniture">
                        <label htmlFor="height">Height (CM)</label>
                        <input type="number" min={0} id="height" name="height" 
                        // value={formData.height}
                        onChange={handleChange}
                         />
                        <label htmlFor="width">Width (CM)</label>
                        <input type="number" min={0} id="width" name="width" 
                        onChange={handleChange}
                         />
                        <label htmlFor="length">Length (CM)</label>
                        <input type="number" min={0} id="length" name="length" 
                       onChange={handleChange}
                         />
                      </div>
                      <p className="furniture_descr">Please provide dimensions in HxWxL format</p>
                    </div>
                    <div className="book_content" id="book_content" style={{display: selectOption[0]?.value === "Book" ? 'block' : 'none'}}>
                      <div className="book" id="Book">
                        <label htmlFor="weight">Weight (KG)</label>
                        <input type="number" min={0} id="weight" name="weight"
                        // value={formData.book}
                        onChange={handleChange}
                         />
                      </div>
                      <p className="book_descr">Please specify Book's weight in kg</p>
                    </div>
                  </form>
                    <div className="d-flex flex-row bd-highlight mb-3 flex-wrap">
                      <footer className="footer">
                        <hr size="2,5" width="95%" color="black" className="footer__line" />
                        <p className="footer__p">Scandiweb Test assignment</p>
                      </footer>
                      </div>
                </div>
              )  
            }


   
