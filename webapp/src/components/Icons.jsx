import React from 'react'
import Logo from './Icons/icon-logo.jsx'
import Eye from './Icons/icon-eye.jsx'
import EyeSlash from './Icons/icon-eye-slash.jsx'
import Categories from './Icons/icon-categories.jsx'
import Images from './Icons/icon-images.jsx'
import Products from './Icons/icon-products.jsx'
import Edit from './Icons/icon-edit.jsx'
import ChevronRight from './Icons/icon-chevron-right.jsx'
import ChevronDown from './Icons/icon-chevron-down.jsx'
import ChevronLeft from './Icons/icon-chevron-left.jsx'
import Trash from './Icons/icon-trash.jsx'
import Checkbox from './Icons/icon-checkbox.jsx'
import Customer from './Icons/icon-customer.jsx'
import Logout from './Icons/icon-logout.jsx'
import Widgets from './Icons/icon-widgets.jsx'

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
        case 'chevron-right':
            return <ChevronRight {...props} />
        case 'chevron-left':
            return <ChevronLeft {...props} />
        case 'chevron-down':
            return <ChevronDown {...props} />
        case 'trash':
            return <Trash {...props} />
        case 'checkbox':
            return <Checkbox {...props} />
        case 'customer':
            return <Customer {...props} />
        case 'widgets':
            return <Widgets {...props} />
        case 'logout':
            return <Logout {...props} />
        default:
    }
}

export default Icon
