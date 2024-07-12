import React from 'react'
import { useState, useEffect } from 'react'
import './Allproducts.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
function Allproducts() {
    const [product, setproducts] = useState([])
    const getallproducts = () => {
        fetch("http://localhost:9000/products")
            .then(res => res.json())
            .then(data => setproducts(data))
    }
    useEffect(() => {
        getallproducts()
    }
    )

    const deleteproduct = (proid) => {
        Swal.fire({
            title: 'are you sure about delete this product',
            showCancelButton: true,
        })
            .then(data =>{if (data.isConfirmed) {
                fetch(`http://localhost:9000/products/${proid}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => getallproducts())
            }})

    }
    return (
        <>
            <Link to='/products/add' className='btn btn-success m-2'>Add new product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Describtion</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map(pro => {
                        return (
                            <tr key={pro.id}>
                                <td>{pro.id}</td>
                                <td>{pro.title}</td>
                                <td>{pro.price}</td>
                                <td>{pro.description}</td>
                                <td>
                                    <button onClick={() => deleteproduct(pro.id)} className='btn btn-danger m-2'>delete</button>
                                    <Link to={`/products/${pro.id}`} className='btn btn-info m-2'>view</Link>
                                    <Link to={`/edit/${pro.id}`} className='btn btn-primary m-2'>Edit</Link>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}

export default Allproducts