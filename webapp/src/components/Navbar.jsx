import { forwardRef } from 'react'
import Icon from './Icons'
import { Link, useLocation } from 'react-router-dom'

const Navbar = forwardRef((props, ref) => {
    return (
        <nav
            className="fixed left-0 top-0 h-screen min-w-[250px] overflow-auto px-4 py-6 shadow-lg"
            ref={ref}
        >
            <a
                href="/"
                className="flex items-center justify-center border-b py-4"
            >
                <Icon name="logo" className="lg:size-18 size-16" />
            </a>

            <div className="mt-6">
                <ul className="mt-3">
                    <Link
                        to={'/products'}
                        className="hover:bg-primary-50 hover:text-primary-600 flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all"
                    >
                        <Icon name="products" />
                        <span>Products</span>
                    </Link>
                    <Link
                        to={'/categories'}
                        className="hover:bg-primary-50 hover:text-primary-600 flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all"
                    >
                        <Icon name="categories" />
                        <span>Categories</span>
                    </Link>
                    <Link
                        to={'/images'}
                        className="hover:bg-primary-50 hover:text-primary-600 flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all"
                    >
                        <Icon name="images" />
                        <span>Images</span>
                    </Link>
                </ul>
            </div>
        </nav>
    )
})

Navbar.displayName = 'Navbar'

export default Navbar
