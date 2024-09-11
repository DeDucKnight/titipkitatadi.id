import React, { useEffect, useRef, useState } from 'react'
import {
    Route,
    Routes,
    Navigate,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Images from './pages/Images'
import Product from './pages/Product'
import Category from './pages/Category'
import Customers from './pages/Customers'
import Customer from './pages/Customer'
import Users from './pages/Users'
import axios from 'axios'

const App = () => {
    const navigate = useNavigate()
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [navbarWidth, setNavbarWidth] = useState(0)
    const navbarRef = useRef(null)
    const location = useLocation()
    const [currLocation, setCurrentLocation] = useState('')
    const [heightNavbar, setHeightNavbar] = useState(0)

    useEffect(() => {
        const parsedState = JSON.parse(localStorage.getItem('authState'))
        if (parsedState) {
            setIsAuthenticated(parsedState.isAuthenticated)
            setUser(parsedState.user)
        }
    }, [])

    useEffect(() => {
        const loc =
            isAuthenticated && location.pathname == '/login'
                ? '/'
                : location.pathname
        setCurrentLocation(loc)
        setMobileDrawerOpen(false)
    }, [location.pathname, isAuthenticated])

    useEffect(() => {
        if (window.innerWidth >= 768) {
            const element = navbarRef.current
            if (element) {
                setNavbarWidth(element.offsetWidth)
            }
        }
    }, [isAuthenticated])

    const handleLogin = async (user) => {
        // Uncomment to have real logic
        try {
            const response = await axios.post(
                `http://localhost:5000/api/admin-login`,
                // `${import.meta.env.VITE_API_URL}/api/admin-login`,
                user
            )

            if (response.status >= 200 && response.status < 300) {
                // only executed if response is successis
                localStorage.setItem(
                    'authState',
                    JSON.stringify({
                        isAuthenticated: true,
                        user: JSON.stringify(user),
                    })
                )
                setIsAuthenticated(true)
                setUser(user)
                navigate('/')
            }
        } catch (error) {
            console.error('Login failed', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('authState')
        setIsAuthenticated(false)
        setUser(null)
        navigate('/login')
    }
    const toggleNavbar = (e) => {
        e.stopPropagation()
        setMobileDrawerOpen(!mobileDrawerOpen)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user && user.tokenExpiry < Date.now()) {
            localStorage.removeItem('authState')
            setIsAuthenticated(false)
            setUser('')
        }
    }, [])

    useEffect(() => {
        var navbar = document.querySelector('#navbar')
        const updateHeight = () => {
            if (navbar) {
                if (window.innerWidth <= 768) {
                    setHeightNavbar(navbar.offsetHeight)
                } else {
                    setHeightNavbar(
                        navbar.offsetHeight + navbar.getClientRects()[0].top + 4
                    )
                }
            }
        }

        setTimeout(() => {
            updateHeight()
        }, 500)

        window.addEventListener('resize', updateHeight)

        return () => {
            window.removeEventListener('resize', updateHeight)
        }
    })

    return (
        <div
            className={`relative h-screen overflow-x-hidden ${mobileDrawerOpen ? 'overflow-y-hidden' : ''} `}
        >
            {isAuthenticated && (
                <Navbar
                    ref={navbarRef}
                    mobileDrawerOpen={mobileDrawerOpen}
                    setMobileDrawerOpen={setMobileDrawerOpen}
                    toggleNavbar={toggleNavbar}
                    heightNavbar={heightNavbar}
                    handleLogout={handleLogout}
                />
            )}
            {mobileDrawerOpen && (
                <div
                    id="drawer_overlay"
                    className={`fixed inset-0 bg-black pt-20 transition-opacity duration-300 ${
                        mobileDrawerOpen
                            ? 'z-30 opacity-50'
                            : 'pointer-events-none opacity-0'
                    }`}
                    onClick={toggleNavbar}
                    style={{
                        marginTop: `${heightNavbar}px`,
                    }}
                ></div>
            )}
            <div
                className={`${isAuthenticated ? 'flex h-screen justify-center' : ''} container mx-auto w-full lg:overflow-x-hidden`}
                style={{
                    maxWidth: `calc(100vw - ${navbarWidth}px)`,
                    marginLeft: `${navbarWidth}px`,
                }}
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/products" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to={currLocation} />
                            ) : (
                                <Login onLogin={handleLogin} />
                            )
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            isAuthenticated ? (
                                <Products />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/products/:guid"
                        element={
                            isAuthenticated ? (
                                <Product />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/categories"
                        element={
                            isAuthenticated ? (
                                <Categories />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/categories/:guid"
                        element={
                            isAuthenticated ? (
                                <Category />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/images"
                        element={
                            isAuthenticated ? (
                                <Images />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/customers"
                        element={
                            isAuthenticated ? (
                                <Customers />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/customers/:guid"
                        element={
                            isAuthenticated ? (
                                <Customer />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    {/* In case needed */}
                    {/* <Route
                        path="/users/:guid"
                        element={
                            isAuthenticated ? <Users /> : <Navigate to="/login" />
                        }
                    /> */}
                </Routes>
            </div>
        </div>
    )
}

export default App
