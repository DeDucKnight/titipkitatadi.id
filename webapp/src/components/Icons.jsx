import React from 'react'
import Logo from './Icons/icon-logo.jsx'
import Eye from './Icons/icon-eye.jsx'
import EyeSlash from './Icons/icon-eye-slash.jsx'
import Categories from './Icons/icon-categories.jsx'
import Images from './Icons/icon-images.jsx'
import Products from './Icons/icon-products.jsx'
import Edit from './Icons/icon-edit.jsx'

const Icon = (props) => {
    switch (props.name) {
        case 'logo':
            return <Logo {...props} />
        case 'eye':
            return <Eye {...props} />
        case 'eye-slash':
            return <EyeSlash {...props} />
        case 'categories':
            return <Categories {...props} />
        case 'images':
            return <Images {...props} />
        case 'products':
            return <Products {...props} />
        case 'edit':
            return <Edit {...props} />
        default:
    }
}

export default Icon
