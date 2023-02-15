import './productPage.css';
import Select from 'react-dropdown-select';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductPage() {
  const [selectOption, setSelectOption] = useState([])
  
  const [formData, setFormData] = useState({ 
    // sku: "", 
    // name: "",
    // price: '', 
    // productType: "",
    // size: "",
    // height: "", 
    // width: "", 
    // length: "", 
    // weight: "", 
  })

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
  

    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setFormData(values => ({...values, [name]: value}))
    }

  const navigate = useNavigate()

  function handleClick() {
    navigate("/")
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost/react_ScandiProject/src/PHP/index.php', formData).then(function(res){
      console.log(res.data)
      handleClick()
    })
  }

        return (
                <div>
                  <meta charSet="UTF-8" />
                  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <link rel="stylesheet" type="text/css" href="css/add_styles.css" />
                  <link rel="icon" type="image/x-icon" href="data:image/png;base64,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" />
                  <title>Product Add</title>
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


   
