import React from 'react'
import './category.css'
function Categoryproduct(props) {
    return (
            <div className="card c">
                <img src={props.product.image} className="card-img-top" alt={props.product.title} />
                <div className="card-body">
                    <h4 className="card-title">{props.product.title}</h4>
                </div>
            </div>
    )
}

export default Categoryproduct