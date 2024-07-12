import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
    return (
        <>
        <ul className='list-unstyled'>
            <li>
                <Link to="/products">get all products</Link>
            </li>
            <li>
                <Link to="/catigorize">get all Catigories</Link>
            </li>
        </ul>
        </>
    )
}

export default Sidebar