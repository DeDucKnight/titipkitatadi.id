import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true }
        case 'logout':
            return { ...state, user: null, isAuthenticated: false }
        default:
            throw new Error('Unknown action')
    }
}

// "username": "titipkitatadi-admin",
//     "password": "Test123",
//     "role": "admin"

const AuthProvider = ({ children }) => {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    )
    const navigate = useNavigate()

    const login = async (username, password) => {
        try {
            debugger
            const userData = {
                username,
                password,
            }
            const response = await axios.post(
                `http://localhost:5000/api/products/api/admin-login`,
                userData
            )
            if (response.status >= 200 && response.status < 300) {
                dispatch({ type: 'login', payload: username })
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }
    const logout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/admin-login`
            )
            if (response.status >= 200 && response.status < 300) {
                debugger
                dispatch({ type: 'logout' })
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined)
        throw new Error('AuthContext was used outside AuthProvider')

    return context
}

export { AuthProvider, useAuth }
