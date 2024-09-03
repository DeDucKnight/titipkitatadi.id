import { useState } from 'react'
import Icon from './Icons'

const Input = ({
    labelText = '',
    labelCLassName = '',
    type = 'text',
    id,
    placeholder = '',
    inputClassName = '',
    required = false,
}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <label
                htmlFor={id}
                className={`${labelCLassName} mb-2 block text-sm font-medium text-gray-900`}
            >
                {labelText}
                <span></span>
            </label>
            <div className="relative flex items-center">
                <input
                    type={
                        type == 'password'
                            ? showPassword
                                ? 'text'
                                : type
                            : type
                    }
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    className={`${inputClassName} focus:ring-primary-600 focus:border-primary-600 block w-full border border-gray-300 p-2.5 text-gray-900`}
                    required={required}
                />
                {type.toLowerCase() == 'password' && !showPassword && (
                    <button
                        className="absolute right-4 h-4 w-4 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <Icon name="eye" className="h-4 w-4" />
                    </button>
                )}
                {type.toLowerCase() == 'password' && showPassword && (
                    <button
                        className="absolute right-4 h-4 w-4 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <Icon name="eye-slash" className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Input
