import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
function Edit() {
    const param = useParams()
    const [product, setproduct] = useState({ title: '', price: '', description: '',category:'', image: '', rating: { count: '', rate: ''} })
    const nav = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:9000/products/${param.id}`)
            .then(res => setproduct(res.data))
            .catch(err => console.log(err))
    }, [])
    const submit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:9000/products/${param.id}`, product)
            .then(
                nav('/products')
            )
    }
    console.log({...product})
    return (
        <>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={product.title} onChange={(e) => { setproduct({ ...product, title: e.target.value }) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">price</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" defaultValue={product.price} onChange={(e) => { setproduct({ ...product, price: e.target.value }) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">description</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" defaultValue={product.description} onChange={(e) => { setproduct({ ...product, description: e.target.value }) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">rate</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" defaultValue={product.rating.rate} onChange={(e) => { setproduct({ ...product, rating: { ...product.rating, rate: e.target.value } }) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">count</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" defaultValue={product.rating.count} onChange={(e) => { setproduct({ ...product, rating: { ...product.rating, count: e.target.value } }) }} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </>
    )
}

export default Edit