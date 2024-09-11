import React, { useEffect, useState } from 'react'
import Icon from './Icons'

const CategorySelection = ({ category, formData, handleCategorySelect }) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCategoryParent, setSelectedCategoryParent] = useState('')
    useEffect(() => {
        if (formData) {
            const data = formData.find(
                (el) => 
                    (el.CategoryDetail?.Category?.categoryid === category.categoryid) || 
                (el.categoryid === category.categoryid)
            )
            if (data) {
                setSelectedCategory(data.categorydetailid)
                setSelectedCategoryParent(category.categoryid)
            }
        }
    }, [category.categoryid, formData])

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
                            <div className="inline-flex items-center">
                                <label
                                    className="relative flex cursor-pointer items-center"
                                    htmlFor={categoryDetail.categorydetailid}
                                >
                                    <input
                                        type="checkbox"
                                        name={categoryDetail.categorydetailid}
                                        id={categoryDetail.categorydetailid}
                                        value={categoryDetail.categorydetailid}
                                        checked={
                                            selectedCategory ===
                                                categoryDetail.categorydetailid &&
                                            selectedCategoryParent ==
                                                category.categoryid
                                        }
                                        // onChange={() => {
                                        //     setSelectedCategory(
                                        //         categoryDetail.categorydetailid
                                        //     )
                                        //     setSelectedCategoryParent(
                                        //         category.categoryid
                                        //     )
                                        //     handleCategorySelect(
                                        //         category,
                                        //         categoryDetail
                                        //     )
                                        // }}
                                        onChange={() => {
                                            // Toggle the selection
                                            if (selectedCategory === categoryDetail.categorydetailid) {
                                                // If the category is already selected, uncheck it
                                                setSelectedCategory('');
                                                setSelectedCategoryParent('');
                                                
                                                // Remove this category detail from formData (deselect)
                                                handleCategorySelect(category, categoryDetail, false);
                                            } else {
                                                // If it's not selected, check it
                                                setSelectedCategory(categoryDetail.categorydetailid);
                                                setSelectedCategoryParent(category.categoryid);
                                                
                                                // Add the category detail to formData (select)
                                                handleCategorySelect(category, categoryDetail);
                                            }
                                        }}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all checked:border-slate-800 checked:bg-slate-800 hover:shadow-md"
                                    />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                                        <Icon name="checkbox" />
                                    </span>
                                </label>
                                <label
                                    className="ml-2 cursor-pointer text-sm text-slate-600"
                                    htmlFor={categoryDetail.categorydetailid}
                                >
                                    {categoryDetail.categorydetailname}
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
