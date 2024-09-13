import { useState } from 'react'

const Switch = ({
    text,
    isChecked,
    id,
    handleChange,
    containerClassName = '',
}) => {
    return (
        <div
            className={`${containerClassName} flex flex-col items-center gap-2`}
        >
            {text && (
                <p className="mb-2 block text-sm font-medium text-gray-900">
                    {text}
                </p>
            )}
            <label htmlFor={id} className="relative cursor-pointer">
                <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={handleChange}
                    checked={isChecked}
                    name={id}
                    id={id}
                />
                {/* calc(2.5rem - 2px - 1rem */}
                <div className="peer flex h-5 w-10 min-w-10 items-center rounded-full bg-gray-300 after:absolute after:left-0 after:top-1/2 after:h-4 after:w-4 after:-translate-y-1/2 after:translate-x-[calc(2px)] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary-500 peer-checked:after:translate-x-[calc(2.5rem-2px-1rem)] peer-checked:after:border-white"></div>
            </label>
        </div>
    )
}

export default Switch
