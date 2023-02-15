import React, { useState, useEffect } from "react";
import axios from "axios";
import './productList.css';

export default function FurnitureBox() {
    const [form, setForm] = useState([])   
    const [erease, setErease] = useState({})

    useEffect(() => {
      getFormData()
    }, [])

    const getFormData = () => {
        axios.get('http://localhost/react_ScandiProject/src/PHP/index.php').then(function(res) {
        console.log(res.data)
        setForm(res.data)
      })
      }

    const ereaseFormData = () => {
        axios.delete('http://localhost/react_ScandiProject/src/PHP/index.php', erease).then(function(res) {
            console.log(res.data)
            setErease(res.data)
        })
    }

      return (
        <div className="form-container">
        {form.map((value) =>
        <div className="card-box-order-mine">
        <input className="delete-checkbox" type="checkbox" name="delete[]"   
        onChange={e => {
            let value = e.target.checked
            setErease(
                form.map(product => {
                    product.select = value
                    return product
                })
            )
            }}/>
            <div className="card-box-values">
                <p>{value.sku}</p>
                <p>{value.name}</p>
                <p>{value.price}.00 $</p>
                {value.height ? (
                <p>Dimension: {value.height}x{value.width}x{value.length}</p>
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
    </div>
    )
}