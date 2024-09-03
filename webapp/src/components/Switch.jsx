const Switch = ({ text, handleOnChange }) => {
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
                    onChange={handleOnChange}
                />
                <div className="peer flex h-5 w-10 items-center rounded-full bg-gray-300 after:absolute after:left-[5px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
        </div>
    )
}

export default Switch
