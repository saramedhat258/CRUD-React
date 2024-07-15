import React from 'react'
import { useState, useEffect } from 'react'
import Categoryproduct from './Categoryproduct'
import './category.css'
function Catigorize() {
    const [product, setproduct] = useState([])
    const [category, setcategory] = useState([])
    const [cat, setcat] = useState("all")
    const getproducts = () => {
        fetch("https://vivacious-gentle-divan.glitch.me/products")
            .then(res => res.json())
            .then(data => setproduct(data))
    }
    const getcategory = () => {
        fetch("https://vivacious-gentle-divan.glitch.me/catigories")
            .then(res => res.json())
            .then(data => setcategory(data))
    }
    useEffect(() => {
        getproducts()
        getcategory()
    }, [])
    return (
        <>
            <div className='row'>
                <div className='col-2'>
                    <button className='btn btn-info m-2 cat' onClick={() => setcat("all")}>All</button>
                    {
                        category.map((cat) => {
                            return (
                                <button className='btn btn-info m-2 cat' key={cat.id} onClick={() => setcat(cat.type)} >{cat.type}</button>
                            )
                        })
                    }
                </div>
                <div className='col-10 parent'>
                    {
                        product.map((pro) => {
                                    if(cat==="all"){
                                        return <Categoryproduct product={pro} key={pro.id} />
                                    }
                                    else if(pro.category===cat){
                                        return <Categoryproduct product={pro} key={pro.id}/>
                                    }
                                }
                            )
                    }
                </div>
            </div>
        </>

    )
}

export default Catigorize
