import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Switch from '../components/Switch'
import Button from '../components/Button'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Image from '../components/Image'
import Skeleton from '../components/Skeleton'
import Dropdown from '../components/Dropdown'

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
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [categoryParent, setCategoryParent] = useState('')
    const [isChanged, setIsChanged] = useState(false)
    const { guid } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [initialData, setInitialData] = useState([])
    const [formData, setFormData] = useState({
        categoryid: '',
        CategoryName: '',
        categoryname: '',
        isstandard: true,
        IsStandard: true,
        status: true,
        createddate: '',
        CategoryDetails: [],
    })
    const [imgData, setImgData] = useState([])

    const fetchCategory = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/categories/${guid}`
            )
            setFormData(response.data)
            setInitialData(response.data)
            setCategoryParent(response.data.categoryname)
        } catch (error) {
            console.error('Error fetching categories:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (guid !== 'category') {
            fetchCategory()
        } else {
            setIsLoading(false)
        }
    }, [guid])

    useEffect(() => {
        const isFormChanged =
            JSON.stringify(formData) !== JSON.stringify(initialData)
        setIsChanged(isFormChanged)
    }, [formData, initialData])

    const handleChange = (e) => {
        const { type, name, value } = e.target

        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: e.target.checked,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }

        if (name == 'categoryname') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                CategoryName: prevFormData.categoryname,
            }))
        }
    }

    const handleChangeTable = (e) => {
        const { name, value, checked } = e.target
        const currentId = name.split('_')[1]
        setFormData((prevFormData) => ({
            ...prevFormData,
            CategoryDetails: prevFormData.CategoryDetails.map(
                (cat) =>
                    cat.categorydetailid === currentId
                        ? { ...cat, status: checked }
                        : cat // ,
            ),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (guid !== 'category') {
                const response = await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/categories/${guid}`,
                    formData
                )
                if (response.status >= 200 && response.status < 300) {
                    fetchCategory()
                }
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/categories`,
                    formData
                )
                if (response.status >= 200 && response.status < 300) {
                    navigate(`/categories/${response.data.category.categoryid}`)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleAddCategories = (e) => {
        e.preventDefault()
        if (inputValue) {
            const category = {
                categorydetailid: generateGUID(),
                categoryid: guid,
                categorydetailname: inputValue,
                CategoryDetailName: inputValue,
                status: true,
                createddate: new Date(),
            }

            setFormData((prevFormData) => ({
                ...prevFormData,
                CategoryDetails: [...prevFormData.CategoryDetails, category],
            }))
            setInputValue('')
        }
    }

    const handleImgChange = async (e, data) => {
        e.preventDefault()
        setIsLoadingImage(true)

        if (e.target.type === 'file') {
            const file = e.target.files[0]
            const formData = new FormData()

            // Append the file to the FormData object
            formData.append('file', file)
            formData.append('imagetype', `${guid}_${data.categorydetailname}`) // hardcoded

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/upload-image/`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                console.log('Image Uploaded:', response.data)
                setImgData((prevData) => [...prevData, response.data.image])
                setFormData((prevData) => ({
                    ...prevData,
                    CategoryDetails: prevData.CategoryDetails.map((detail) =>
                        detail.categorydetailname ===
                        response.data.image.imagetype.split('_')[1]
                            ? { ...detail, image: response.data.image }
                            : detail
                    ),
                }))

                // append imageId to ProductImages
            } catch (error) {
                console.error('Error uploading image:', error)
            } finally {
                setIsLoadingImage(false)
            }
        }
    }

    const handleDelete = async (e, data) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/category-details/${data.categorydetailid}`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            if (response.status >= 200 && response.status < 300) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    CategoryDetails: prevFormData.CategoryDetails.filter(
                        (detail) =>
                            detail.categorydetailid !== data.categorydetailid
                    ),
                }))
            }
        } catch (error) {
            console.error('Error delete category:', error)
        } finally {
            setIsLoading(false)
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
                                    {guid !== 'category'
                                        ? formData.categoryname
                                        : 'Add Category'}
                                </h1>

                                <Button
                                    text={'Save'}
                                    btnType={'submit'}
                                    disabled={!isChanged}
                                />
                            </div>
                            <div className="flex w-full items-center gap-4">
                                <Input
                                    id="categoryname"
                                    labelText="Category Group Name"
                                    handleChange={handleChange}
                                    value={formData.categoryname}
                                    required={true}
                                    containerClassName="flex-grow"
                                />

                                <Switch
                                    handleChange={handleChange}
                                    isChecked={formData.status}
                                    text={'Status'}
                                    id="status"
                                />
                            </div>
                            <Input
                                id="categories"
                                labelText="Categories"
                                btnText={'Add'}
                                btnOnClick={handleAddCategories}
                                value={inputValue}
                                handleChange={handleInputChange}
                            />
                            {formData.CategoryDetails &&
                                formData.CategoryDetails.length > 0 && (
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
                                            {formData.CategoryDetails.map(
                                                (data, index) => (
                                                    <tr
                                                        className="hover:bg-gray-50"
                                                        key={index}
                                                    >
                                                        <td className="p-4 align-top text-sm text-gray-800">
                                                            {
                                                                data.categorydetailname
                                                            }
                                                        </td>
                                                        <td className="p-4 align-top text-sm text-gray-800">
                                                            <div className="flex w-full flex-wrap gap-3">
                                                                {imgData
                                                                    .filter(
                                                                        (img) =>
                                                                            img.imagetype ===
                                                                            `${guid}_${data.categorydetailname}`
                                                                    )
                                                                    .map(
                                                                        (
                                                                            img
                                                                        ) => (
                                                                            <Image
                                                                                key={
                                                                                    img.imageid
                                                                                }
                                                                                imgSrc={
                                                                                    img.imagepath
                                                                                }
                                                                                ratio="aspect-20x9"
                                                                                className="h-48"
                                                                            />
                                                                        )
                                                                    )}
                                                                {imgData.filter(
                                                                    (img) =>
                                                                        img.imagetype ===
                                                                        `${guid}_${data.categorydetailname}`
                                                                ).length > 0 ? (
                                                                    ''
                                                                ) : (
                                                                    <Input
                                                                        handleChange={(
                                                                            event
                                                                        ) =>
                                                                            handleImgChange(
                                                                                event,
                                                                                data
                                                                            )
                                                                        }
                                                                        id={
                                                                            data.categorydetailid
                                                                        }
                                                                        imgUploadContainerClassName={
                                                                            '!aspect-20x9 !h-48'
                                                                        }
                                                                        isUploadImage={
                                                                            true
                                                                        }
                                                                        isLoading={
                                                                            isLoadingImage
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="w-[1%] p-4 align-top">
                                                            <div className="inline-flex w-full items-center justify-end gap-4">
                                                                <Button
                                                                    iconName={
                                                                        'trash'
                                                                    }
                                                                    type={
                                                                        'link'
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleDelete(
                                                                            e,
                                                                            data
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                )}
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default Category
