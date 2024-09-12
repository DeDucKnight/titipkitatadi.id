import { useEffect, useState } from 'react'
import Icon from './Icons'
import { Chrome } from '@uiw/react-color'
import Button from './Button'

const Input = ({
    labelText = '',
    labelCLassName = '',
    type = 'text',
    id,
    placeholder = '',
    containerClassName = '',
    inputClassName = '',
    required = false,
    value = '',
    isResizeable = false,
    isUploadImage = false,
    isColorPicker = false,
    btnText,
    handleChange,
    btnOnClick,
    imgUploadContainerClassName,
    isLoading = false,
    isDeleting = false,
}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [inputvalue, setInputValue] = useState('')

    useEffect(() => setInputValue(value), [value])
    const handleOnFocus = () => {
        setShowColorPicker(!showColorPicker)
    }

    return (
        <div className={`relative ${containerClassName}`}>
            {!isUploadImage && (
                <>
                    <label
                        htmlFor={id}
                        className={`${labelCLassName} mb-2 block text-sm font-medium text-gray-900`}
                    >
                        {labelText}
                        <span></span>
                    </label>
                    <div className="relative flex items-center gap-4">
                        {!isResizeable && (
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
                                className={`${inputClassName} block w-full border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600`}
                                required={required}
                                onFocus={handleOnFocus}
                                onBlur={handleOnFocus}
                                onChange={handleChange}
                                readOnly={isColorPicker}
                                {...(isColorPicker
                                    ? { defaultValue: inputvalue }
                                    : { value: inputvalue })}
                            />
                        )}
                        {isResizeable && (
                            <textarea
                                type={type}
                                defaultValue={value}
                                name={id}
                                id={id}
                                placeholder={placeholder}
                                className={`${inputClassName} block w-full border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600`}
                                required={required}
                            />
                        )}
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
                        {btnText && (
                            <Button text={btnText} onClick={btnOnClick} />
                        )}
                        {isColorPicker && showColorPicker ? (
                            <Chrome
                                className="!absolute !bottom-0 z-50 !translate-y-full"
                                color={inputvalue}
                                onChange={(color) => {
                                    setInputValue(color.hex)
                                }}
                            />
                        ) : null}
                    </div>
                </>
            )}
            {isUploadImage && (
                <>
                    <label
                        htmlFor={id}
                        className={`flex aspect-card h-48 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 p-4 hover:bg-gray-100 ${imgUploadContainerClassName}`}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <svg
                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>
                            </p>
                            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG
                                <br />
                                or GIF
                            </p>
                        </div>
                        <input
                            id={id}
                            name={id}
                            type="file"
                            className="hidden"
                            onChange={handleChange}
                        />

                        {(isLoading || isDeleting) && (
                            <div className="pointer-events-none absolute inset-0 top-0 flex items-center justify-center bg-black bg-opacity-30">
                                {' '}
                                <div className="spinner-loader"></div>
                            </div>
                        )}
                    </label>
                </>
            )}
        </div>
    )
}

export default Input
