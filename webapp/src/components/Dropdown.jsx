import React, { useState } from 'react'

const Dropdown = ({
    id,
    labelText,
    options = [],
    value,
    handleChange,
    optionFetched,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleOnClick = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <div className="relative">
            <select
                name={id}
                id={id}
                className="flex border-none bg-primary-500 px-5 py-3 text-sm font-semibold text-white outline-none hover:bg-primary-700 active:bg-primary-600"
                onChange={handleChange}
                value={value}
            >
                {optionFetched && (
                    <>
                        {options.map((option, index) => (
                            <option key={index} value={option.sizemetricid}>
                                {option.sizemetricname}
                            </option>
                        ))}
                    </>
                )}
                {!optionFetched && (
                    <>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </>
                )}
            </select>
        </div>
    )
}

export default Dropdown
