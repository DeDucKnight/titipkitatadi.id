import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
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

const App = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [navbarWidth, setNavbarWidth] = useState(0)
    const navbarRef = useRef(null)
    const location = useLocation()
    const [currLocation, setCurrentLocation] = useState('')
    const [heightNavbar, setHeightNavbar] = useState(0)

    useEffect(() => {
        setIsLoggedIn(() => localStorage.getItem('isLoggedIn') === 'true')
    }, [])

    useEffect(() => {
        const loc =
            isLoggedIn && location.pathname == '/login'
                ? '/'
                : location.pathname
        setCurrentLocation(loc)
        setMobileDrawerOpen(false)
    }, [location.pathname, isLoggedIn])

    useEffect(() => {
        if (window.innerWidth >= 768) {
            const element = navbarRef.current
            if (element) {
                setNavbarWidth(element.offsetWidth)
            }
        }
    }, [isLoggedIn])

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true')
        setIsLoggedIn(true)
        Navigate('/')
    }
    const toggleNavbar = (e) => {
        e.stopPropagation()
        setMobileDrawerOpen(!mobileDrawerOpen)
    }

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
            {isLoggedIn && (
                <Navbar
                    ref={navbarRef}
                    mobileDrawerOpen={mobileDrawerOpen}
                    setMobileDrawerOpen={setMobileDrawerOpen}
                    toggleNavbar={toggleNavbar}
                    heightNavbar={heightNavbar}
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
                className={`${isLoggedIn ? 'flex h-screen justify-center' : ''} container mx-auto w-full lg:overflow-x-hidden`}
                style={{
                    maxWidth: `calc(100vw - ${navbarWidth}px)`,
                    marginLeft: `${navbarWidth}px`,
                }}
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/products" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? (
                                <Navigate to={currLocation} />
                            ) : (
                                <Login onLogin={handleLogin} />
                            )
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            isLoggedIn ? <Products /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/products/:guid"
                        element={
                            isLoggedIn ? <Product /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/categories"
                        element={
                            isLoggedIn ? (
                                <Categories />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/categories/:guid"
                        element={
                            isLoggedIn ? <Category /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/images"
                        element={
                            isLoggedIn ? <Images /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/customers"
                        element={
                            isLoggedIn ? (
                                <Customers />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/customers/:guid"
                        element={
                            isLoggedIn ? <Customer /> : <Navigate to="/login" />
                        }
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
