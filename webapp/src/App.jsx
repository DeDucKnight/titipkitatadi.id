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

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [navbarWidth, setNavbarWidth] = useState(0)
    const navbarRef = useRef(null)
    const location = useLocation()
    const [currLocation, setCurrentLocation] = useState('')

    useEffect(() => {
        setIsLoggedIn(() => localStorage.getItem('isLoggedIn') === 'true')
    }, [])

    useEffect(() => {
        const loc =
            isLoggedIn && location.pathname == '/login'
                ? '/'
                : location.pathname
        setCurrentLocation(loc)
    }, [location.pathname, isLoggedIn])

    useEffect(() => {
        const element = navbarRef.current
        if (element) {
            setNavbarWidth(element.offsetWidth)
        }
    }, [isLoggedIn])

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true')
        setIsLoggedIn(true)
        Navigate('/')
    }

    return (
        <div className="overflow-x-hidden">
            {isLoggedIn && <Navbar ref={navbarRef} />}
            <div
                className={`${isLoggedIn && 'flex justify-center'} container mx-auto w-full overflow-x-hidden py-6`}
                style={{
                    maxWidth: `calc(100vw - ${navbarWidth}px)`,
                    marginLeft: `${navbarWidth}px`,
                }}
            >
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? <Home /> : <Navigate to="/login" />
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
                </Routes>
            </div>
        </div>
    )
}

export default App
