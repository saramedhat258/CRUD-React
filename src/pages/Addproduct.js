import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [product, setProduct] = useState({
        id: '', title: '', price: '', description: '', image: null, category: '', rating: { count: '', rate: '' }
    });
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    
    /* fetch all products  */

    const fetchproducts = () => {
        fetch("https://vivacious-gentle-divan.glitch.me/products")
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
            })
            .catch(err => console.error("Failed to fetch products:", err));
    }

    /* fetch categorise  */

    const fetchcategory = () => {
        fetch("https://vivacious-gentle-divan.glitch.me/catigories")
            .then(res => res.json())
            .then(data => {
                setCategories(data);
            })
            .catch(err => console.error("Failed to fetch category:", err));
    }
    useEffect(() => {
        fetchproducts()
        fetchcategory()
    }, []);

    /*to submit the form and send data to server */
    const submit = (e) => {
        e.preventDefault();
        /* to set id */
        product.id = (allProducts.length + 1).toString()
        const formData = new FormData();
        formData.append('id', product.id);
        formData.append('title', product.title);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('rating[count]', product.rating.count);
        formData.append('rating[rate]', product.rating.rate);
        formData.append('image', product.image); // Ensure this is the file object
        const productData = {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            rating: product.rating,
            image: product.image ? `http://localhost:3001/uploads/${product.image.name}` : null,
        }
        formData.append('productData', JSON.stringify(productData));
        axios.post("http://localhost:3001/products", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(() => {
                navigate('/products');
            })
            .catch(err => console.error("Failed to add product:", err));

        /* add new category */

        const newCategory = product.category;
        const categoryExists = categories.some(cat => cat.type.toLowerCase() === newCategory.toLowerCase());
        if (!categoryExists) {
            const newCategoryData = { id: (categories.length + 1).toString(), type: newCategory };
            axios.post("http://localhost:9000/catigories", newCategoryData);
            setCategories([...categories, newCategoryData]);
        }
    };

    return (
        <>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titleInput"
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="priceInput" className="form-label">Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="priceInput"
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descriptionInput"
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoryInput" className="form-label">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoryInput"
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="countInput" className="form-label">Count</label>
                    <input
                        type="number"
                        className="form-control"
                        id="countInput"
                        onChange={e => setProduct({ ...product, rating: { ...product.rating, count: e.target.value } })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rateInput" className="form-label">Rate</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rateInput"
                        onChange={e => setProduct({ ...product, rating: { ...product.rating, rate: e.target.value } })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageInput" className="form-label">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imageInput"
                        onChange={e => setProduct({ ...product, image: e.target.files[0] })}/>
                </div>
                <button type="submit" className="btn btn-primary">Add product</button>
            </form>
        </>
    );
}

export default AddProduct;



