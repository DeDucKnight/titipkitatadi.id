import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Switch from '../components/Switch'
import Button from '../components/Button'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Image from '../components/Image'
import Skeleton from '../components/Skeleton'

function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        }
    )
}

const Category = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { guid } = useParams()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [initialData, setInitialData] = useState([])
    const [formData, setFormData] = useState([])
    const [categoryParent, setCategoryParent] = useState('')
    const [isChanged, setIsChanged] = useState(false)
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `http://localhost:5000/api/categories/${guid}`
                )
                setFormData(response.data)
                setInitialData(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategory()
    }, [guid])

    useEffect(() => {
        const isFormChanged =
            JSON.stringify(formData) !== JSON.stringify(initialData)
        setIsChanged(isFormChanged)
    }, [formData, initialData])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log(formData)
            const response = await axios.post(
                `http://localhost:5000/api/categories`,
                formData
            )
        } catch (error) {
            console.error(error)
        }
    }

    const handleAddCategories = (e) => {
        e.preventDefault()
        const { value } = document.querySelector('#categories')
        if (value) {
            const category = {
                categoryDetailId: generateGUID(),
                categoryId: guid,
                categoryDetailName: value,
                status: true,
                createdDate: new Date(),
            }

            setFormData((prevFormData) => [...prevFormData, category])
        }
    }
    const handleImgChange = (e) => {
        let imgFile = ''
        if (e.target.type === 'file') {
            imgFile = e.target.files[0]
        }
    }
    return (
        <div className="mx-4 w-full px-4">
            {isLoading ? (
                <div className="py-4">
                    <Skeleton className="mb-7 h-7 w-3/12" />
                    <Skeleton className="mb-7 h-10 w-4/12 lg:w-3/12" />

                    <Skeleton className="mb-2 h-5 w-4/12 lg:w-2/12" />
                    <Skeleton className="mb-7 h-10 w-full" />

                    <div className="border-b pb-4">
                        <Skeleton
                            items="5"
                            classContainer="flex gap-3 justify-between "
                            className="h-12 w-4/12 lg:w-2/12"
                        />
                    </div>
                    {Array(8)
                        .fill()
                        .map((_, index) => (
                            <div key={index}>
                                <div className="border-b py-4">
                                    <Skeleton
                                        items="5"
                                        classContainer="flex gap-3 justify-between "
                                        className="h-7 w-4/12 lg:w-2/12"
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                <>
                    <div className="border-b py-4">
                        <div className="flex items-center justify-between">
                            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                                {pathnames.map((value, index) => {
                                    let to = `/${pathnames.slice(0, index + 1).join('/')}`

                                    return (
                                        <li
                                            key={index}
                                            className="flex items-center"
                                        >
                                            {index === pathnames.length - 1 ? (
                                                <span className="text-sm font-medium capitalize text-gray-400">
                                                    {categoryParent}
                                                </span>
                                            ) : (
                                                <>
                                                    <Link
                                                        to={to}
                                                        className="text-sm font-medium capitalize text-gray-700 hover:text-gray-900"
                                                    >
                                                        {decodeURI(value)}
                                                    </Link>
                                                    <Icon
                                                        className="h-6 w-6 text-gray-400"
                                                        name="chevron-right"
                                                        width={20}
                                                        fill={'#374151'}
                                                    />
                                                </>
                                            )}
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>
                    </div>
                    <div className="mb-7 pb-4">
                        <form
                            className="relative h-max space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={handleSubmit}
                        >
                            <div className="sticky top-[60px] z-20 flex items-center justify-between bg-white py-4 lg:top-0">
                                <h1 className="text-3xl font-bold">
                                    {categoryParent}
                                </h1>

                                <Button
                                    text={'Save'}
                                    btnType={'submit'}
                                    disabled={!isChanged}
                                />
                            </div>
                            <Input
                                id="categories"
                                labelText="Categories"
                                btnText={'Add'}
                                btnOnClick={handleAddCategories}
                            />
                            <table className="min-w-full bg-white">
                                <thead className="whitespace-nowrap bg-gray-100">
                                    <tr className="">
                                        <th className="p-4 text-left text-sm font-semibold text-gray-800">
                                            Categories
                                        </th>
                                        <th className="p-4 text-left text-sm font-semibold text-gray-800">
                                            Images
                                        </th>
                                        <th className="w-[1%] p-4 text-end text-sm font-semibold text-gray-800">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                                    {formData.map((data, index) => (
                                        <tr
                                            className="hover:bg-gray-50"
                                            key={index}
                                        >
                                            <td className="p-4 align-top text-sm text-gray-800">
                                                {data.categoryDetailName}
                                            </td>
                                            <td className="p-4 align-top text-sm text-gray-800">
                                                <div className="flex w-full flex-wrap gap-3">
                                                    {/* <Image
                                            key={image.imageId}
                                            imgSrc={image.imagePath}
                                            ratio="aspect-card"
                                            className="h-48"
                                        /> */}
                                                    <Input
                                                        handleChange={
                                                            handleImgChange
                                                        }
                                                        id={`img_${data.categoryDetailName}`}
                                                        isUploadImage={true}
                                                        imgUploadContainerClassName={
                                                            '!aspect-20x9 !h-full'
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className="w-[1%] p-4 align-top">
                                                <div className="inline-flex w-full items-center justify-end gap-4">
                                                    <Switch
                                                        isChecked={data.status}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default Category
