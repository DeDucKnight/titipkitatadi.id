import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
    const { guid } = useParams()
    return <div className="mx-4 w-full overflow-x-auto">product {guid}</div>
}

export default Product
