import { forwardRef } from 'react'
import Icon from './Icons'
import { Link } from 'react-router-dom'
const Navbar = forwardRef(
    ({ handleLogout, mobileDrawerOpen, toggleNavbar, heightNavbar }, ref) => {
        return (
            <nav className="sticky top-0 z-50 bg-white" id="navbar">
                <div
                    className={`${mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'} absolute left-0 z-50 h-screen w-3/4 overflow-auto bg-white px-4 py-6 shadow-lg transition-transform duration-300 ease-in-out lg:fixed lg:w-fit lg:min-w-[250px] lg:translate-x-0`}
                    style={{
                        top: `${heightNavbar}px`,
                    }}
                    ref={ref}
                >
                    <Link
                        to="/"
                        className="flex items-center justify-center border-b py-4"
                    >
                        <Icon name="logo" className="lg:size-18 size-14" />
                    </Link>

                    <div className="mt-6">
                        <ul className="mt-3">
                            <Link
                                to={'/products'}
                                className="flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all hover:bg-primary-50 hover:text-primary-600"
                            >
                                <Icon name="products" />
                                <span>Products</span>
                            </Link>
                            <Link
                                to={'/categories'}
                                className="flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all hover:bg-primary-50 hover:text-primary-600"
                            >
                                <Icon name="categories" />
                                <span>Categories</span>
                            </Link>
                            <Link
                                to={'/images'}
                                className="flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all hover:bg-primary-50 hover:text-primary-600"
                            >
                                <Icon name="images" />
                                <span>Images</span>
                            </Link>
                            <Link
                                to={'/customers'}
                                className="flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all hover:bg-primary-50 hover:text-primary-600"
                            >
                                <Icon name="customer" />
                                <span>Customers</span>
                            </Link>
                            <Link
                                to={'/widgets'}
                                className="flex items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all hover:bg-primary-50 hover:text-primary-600"
                            >
                                <Icon name="widgets" />
                                <span>Widgets</span>
                            </Link>
                            <button
                                className="flex w-full items-center gap-4 rounded px-4 py-3 text-sm text-primary-500 transition-all hover:bg-primary-50 hover:text-primary-600"
                                onClick={handleLogout}
                            >
                                <Icon name="logout" />
                                <span>Logout</span>
                            </button>
                        </ul>
                    </div>
                </div>
                <div className="h-full border-b py-4 lg:hidden">
                    <div className="flex-col justify-end md:flex lg:hidden">
                        <button
                            className="relative px-5 py-2.5 focus:outline-none"
                            onClick={toggleNavbar}
                        >
                            <span
                                className={`absolute block h-0.5 w-5 transform bg-current text-primary-500 transition duration-500 ease-in-out ${mobileDrawerOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                            ></span>
                            <span
                                className={`absolute block h-0.5 w-5 transform bg-current text-primary-500 transition duration-500 ease-in-out ${mobileDrawerOpen ? 'opacity-0' : ''}`}
                            ></span>
                            <span
                                className={`absolute block h-0.5 w-5 transform bg-current text-primary-500 transition duration-500 ease-in-out ${mobileDrawerOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                            ></span>
                        </button>
                    </div>
                </div>
            </nav>
        )
    }
)

Navbar.displayName = 'Navbar'

export default Navbar
