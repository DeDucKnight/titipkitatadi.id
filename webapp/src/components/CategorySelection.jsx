import React, { useEffect, useState } from 'react'

const CategorySelection = ({ category, formData }) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCategoryParent, setSelectedCategoryParent] = useState('')
    useEffect(() => {
        if (formData) {
            const data = formData.find(
                (el) => el.categoryId === category.categoryId
            )
            if (data) {
                setSelectedCategory(data.categorydetailid)
                setSelectedCategoryParent(category.categoryId)
            }
        }
    }, [category.categoryId, formData])

    return (
        <>
            <p className="mx-4 text-nowrap border-b border-gray-300 py-2 font-semibold">
                {category.categoryname}
            </p>
            <ul>
                {category.CategoryDetails.map((categoryDetail, index) => {
                    return (
                        <li
                            className={`px-4 py-2`}
                            key={categoryDetail.categorydetailid}
                        >
                            <div className="flex items-center">
                                <input
                                    className="hidden"
                                    type="radio"
                                    name={categoryDetail.categorydetailid}
                                    id={categoryDetail.categorydetailid}
                                    value={categoryDetail.categorydetailid}
                                    checked={
                                        selectedCategory ===
                                            categoryDetail.categorydetailid &&
                                        selectedCategoryParent ==
                                            categoryDetail.categoryid
                                    }
                                    onChange={() => {
                                        setSelectedCategory(
                                            categoryDetail.categorydetailid
                                        )
                                        setSelectedCategoryParent(
                                            categoryDetail.categoryid
                                        )
                                    }}
                                />
                                <label
                                    className="flex cursor-pointer items-center gap-2 text-nowrap"
                                    htmlFor={categoryDetail.categorydetailid}
                                >
                                    <span
                                        className={`relative h-5 w-5 rounded-full border-2 shadow-sm transition-all ease-in-out before:absolute before:left-1/2 before:top-1/2 before:h-3 before:w-3 before:origin-center before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] ${selectedCategory === categoryDetail.categorydetailid ? 'border-primary-500 before:scale-100 before:bg-primary-500' : 'border-gray-200 before:scale-0 before:bg-transparent'} before:rounded-full`}
                                    ></span>
                                    <span className="radio-text">
                                        {categoryDetail.categorydetailname}
                                    </span>
                                </label>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CategorySelection
