import React, { useState } from 'react'

const Dropdown = ({ id, labelText, options = [], value, handleChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleOnClick = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <div className="relative">
            <select
                name={id}
                id={id}
                className="hover:bg-primary-700 active:bg-primary-600 flex border-none bg-primary-500 px-5 py-3 text-sm font-semibold text-white outline-none"
                onChange={handleChange}
                value={value}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
