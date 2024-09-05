import { useState } from 'react'

const Switch = ({ text, isChecked }) => {
    const [isToggled, setIsToggled] = useState(isChecked)
    const handleToggle = (event) => {
        // Toggle the state value
        setIsToggled(event.target.checked)
    }
    return (
        <div className="flex items-center">
            {text && (
                <p className="mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {text}
                </p>
            )}
            <label className="relative cursor-pointer">
                <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={handleToggle}
                    checked={isToggled}
                />
                {/* calc(2.5rem - 2px - 1rem */}
                <div className="peer flex h-5 w-10 min-w-10 items-center rounded-full bg-gray-300 after:absolute after:left-0 after:top-1/2 after:h-4 after:w-4 after:-translate-y-1/2 after:translate-x-[calc(2px)] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary-500 peer-checked:after:translate-x-[calc(2.5rem-2px-1rem)] peer-checked:after:border-white"></div>
            </label>
        </div>
    )
}

export default Switch
