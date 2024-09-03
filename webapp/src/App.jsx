import React, { useEffect, useRef, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Images from './pages/Images'
import Product from './pages/Product'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [navbarWidth, setNavbarWidth] = useState(0)
    const navbarRef = useRef(null)

    useEffect(() => {
        setIsLoggedIn(() => localStorage.getItem('isLoggedIn') === 'true')
    }, [])

    useEffect(() => {
        const element = navbarRef.current
        if (element) {
            setNavbarWidth(element.offsetWidth)
        }
    }, [isLoggedIn])

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true')
        setIsLoggedIn(true)
    }

    return (
        <div className="overflow-x-hidden">
            <Router>
                {isLoggedIn && <Navbar ref={navbarRef} />}
                <div
                    className="container mx-auto flex w-full overflow-hidden py-6"
                    style={{
                        maxWidth: `calc(100vw - ${navbarWidth}px)`,
                        marginLeft: `${navbarWidth}px`,
                    }}
                >
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                isLoggedIn ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Login onLogin={handleLogin} />
                                )
                            }
                        />
                        <Route
                            path="/"
                            element={
                                isLoggedIn ? <Home /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="/products"
                            element={
                                isLoggedIn ? (
                                    <Products />
                                ) : (
                                    <Navigate to="/login" />
                                )
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
                            path="/images"
                            element={
                                isLoggedIn ? (
                                    <Images />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/products/:guid"
                            element={
                                isLoggedIn ? (
                                    <Product />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App
