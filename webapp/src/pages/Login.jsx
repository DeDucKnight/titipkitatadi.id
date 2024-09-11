import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Icon from '../components/Icons'
import Button from '../components/Button'

const Login = ({ onLogin }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('titipkitatadi-admin')
    const [password, setPassword] = useState('Test123')
    const [error, setError] = useState(null)

    const handleLogin = (event) => {
        event.preventDefault()
        if (username && password) {
            const user = {
                username,
                password,
            }
            onLogin(user)
        } else {
            setError('Invalid username or password')
        }
    }
    return (
        <section>
            <div className="mx-auto flex h-screen flex-col items-center justify-center gap-7 px-6 py-8 lg:py-0">
                <Icon name="logo" className="lg:size-18 size-16" />
                <div className="w-full border border-gray-700 shadow sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in
                        </h1>
                        {error && (
                            <div className="mb-4 text-red-500">{error}</div>
                        )}
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={handleLogin}
                        >
                            <Input
                                type="text"
                                id="username"
                                placeholder="name@company.com"
                                labelText="E-mail"
                                required={true}
                                value={username}
                                handleChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                            <Input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                labelText="Password"
                                required={true}
                                value={password}
                                handleChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                            <Button
                                btnType="submit"
                                text="Sign in"
                                className="!w-full"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
