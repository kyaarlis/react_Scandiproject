import React, { useState, useEffect } from "react";
import './CSS/productList.css';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductList() {
  // holds products for display
  const [form, setForm] = useState([])   

  // holds checked products that are about to get deleted
  const [isChecked, setisChecked]= useState([]);

  const dbUrl = 'http://karlis-veckagans.atwebpages.com/PHP/index.php'
  const deleteUrl = 'http://karlis-veckagans.atwebpages.com/PHP/delete.php'

  useEffect(() => {
    getFormData()
  }, [])

  // recieves products from database
  const getFormData = () => {
    axios.get(dbUrl).then(function(res) {
    // console.log(res.data)
    setForm(res.data)
  })
  }

  const handleCheckbox = (productSku) => {
    if (isChecked.includes(productSku)) {
      setisChecked(isChecked.filter(sku => sku !== productSku));
    } else {
      setisChecked([...isChecked, productSku]);
    }
  };
  
  // console.log(isChecked)
  
  // page routing
  const navigate = useNavigate() 
  function handleClick() {
    navigate("../addproduct")
  }

  function handleLogOut() {
    navigate("/")
  }

  // Page title
  document.title = 'Products'

    return (
        <>  
      
  <div className="page-content" id="pageContent">

    <form onSubmit={(e) => {
      e.preventDefault()
      // sends selected products to PHP page for deletion
      axios.post(deleteUrl, { productSku: isChecked })
      .then(response => {
        console.log(response.data);
        getFormData()
        setisChecked([])
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
    }}>
         <Row>
          <Col>
          <Button className="mb-2" variant="warning" size="sm" onClick={handleLogOut}>Log Out</Button>
          </Col>
        </Row> 
    <div className="header">
        {/* add and delete buttons  */}
        <h2 className="heading">Product List</h2>
        <div className="product__buttons">
          <button type="button" id="delete-product-btn" className="btn btn-primary btn-sm" onClick={handleClick}>ADD</button>

          <button
            id="delete-product-btn"
            type="submit"
            name="please_delete"
            className="btn btn-danger btn-sm"
            >MASS DELETE
          </button>
          
        </div>
      </div>
     <hr className="border border-dark my-6 header-line"></hr>

      <div className="product-list">
        {form.map((value, index) =>
        <div key={index} className="card-box-order-mine">
        <input className="delete-checkbox" type="checkbox"
        value={value.sku}
        checked={isChecked.includes(value.sku)}

        onChange={() => handleCheckbox(value.sku)}
        />
          {/* logic for differencing product types */}
            <div className="card-box-values">
                <p>{value.sku}</p>
                <p>{value.name}</p>
                <p>{value.price}.00 $</p>
                {value.height ? (
                <p className="dimensions">
                  Dimension: {value.height}x{value.width}x{value.length}
                  </p>
                ) : value.size ? (
                    <p>Size: {value.size}</p>
                ) : value.weight ? (
                    <p>Weight: {value.weight}</p>
                ) : (
                    <p></p>
                )
                }
                
                </div>
            </div>  
        )}

        <footer className="footer">
        <hr className="border border-dark my-4 border-bottom"></hr>
          <p className="footer__p">Scandiweb Test assignment</p>
        </footer>
      </div>
    </form>
  </div>
</>
    )
}

export default ProductList