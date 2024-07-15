import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './product.css'
function Product() {
    const param = useParams()
    const [product, setproduct] = useState()
    useEffect(() => {
        fetch(`https://vivacious-gentle-divan.glitch.me/products/${param.id}`)
            .then(res => res.json())
            .then(data => setproduct(data))
    })
    return (
        <>
            {product ?
                <div className="card mb-3 pro" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={product.image} className="imgpro img-fluid" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title">{product.title}</h2>
                                <p className="card-text des">{product.description}</p>
                                <p className=" text-body-secondary">{`price: ${product.price}`}</p>
                                <p className=" text-body-secondary">{`rate: ${product.rating.rate}`}</p>
                                <p className=" text-body-secondary">{`count: ${product.rating.count}`}</p>
                            </div>
                        </div>
                    </div>
                </div>

                : null}
        </>

    )
}

export default Product
