import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Button from '../components/Button'
import Switch from '../components/Switch'
import Image from '../components/Image'
import CategorySelection from '../components/CategorySelection'
import Dropdown from '../components/Dropdown'
import Skeleton from '../components/Skeleton'
import axios from 'axios'

const Product = () => {
    const [initialData, setInitialData] = useState({
        productname: '',
        description: '',
        price: '',
        discountprice: '',
        brand: '',
        colors: [],
        sizes: [],
        material: '',
        onlinestores: [],
        status: true,
        productimages: [],
        productcategories: [],
    })
    const [formData, setFormData] = useState({
        productname: '',
        price: '',
        discountprice: '',
        brand: '',
        colors: [],
        sizes: [],
        material: '',
        onlinestores: [],
        shipping: '',
        status: '',
        productimages: [],
        productcategories: [],
    })
    const [isChanged, setIsChanged] = useState(false)
    const [categoriesData, setCategoriesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { guid } = useParams()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `http://localhost:5000/api/products/${guid}`
                )
                setFormData(response.data)
                setInitialData(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchCategories = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `http://localhost:5000/api/categories`
                )
                setCategoriesData(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setIsLoading(false)
            }
        }
        if (guid !== 'product') {
            fetchProduct()
        }
        fetchCategories()
    }, [guid])

    useEffect(() => {
        const isFormChanged =
            JSON.stringify(formData) !== JSON.stringify(initialData)
        setIsChanged(isFormChanged)
    }, [formData, initialData])

    const handleAddColor = (e) => {
        e.preventDefault()
        const { value } = document.querySelector('#colors')
        if (value) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                colors: [...prevFormData.colors, value],
            }))
        }
    }
    const handleAddSize = (e) => {
        e.preventDefault()
        const { value } = document.querySelector('#size')
        if (value) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                sizes: [...prevFormData.sizes, value],
            }))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleImgChange = async (e) => {
        e.preventDefault();
    
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            const formData = new FormData();
    
            // Append the file to the FormData object
            formData.append('file', file);
            formData.append('imagetype', 'product'); // hardcoded
    
            try {
                const response = await axios.post(
                    `http://localhost:5000/api/upload-image/`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log('Image Uploaded:', response.data);

                // append imageId to ProductImages
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleDeleteColor = (color) => {
        setFormData((prevData) => ({
            ...prevData,
            colors: prevData.colors.filter((item) => item !== color),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (guid !== 'product') {
                const response = await axios.put(
                    `http://localhost:5000/api/products/${guid}`,
                    formData
                )
                if (response.status >= 200 && response.status < 300) {
                    setInitialData(response.data.product)
                }
            } else {
                const response = await axios.post(
                    `http://localhost:5000/api/products`,
                    formData
                )
                if (response.status >= 200 && response.status < 300) {
                    setInitialData(response.data.product)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="mx-4 w-full px-4">
            {isLoading ? (
                <div className="py-4">
                    <Skeleton className="mb-7 h-7 w-3/12" />
                    <Skeleton className="mb-7 h-10 w-4/12 lg:w-3/12" />
                    {Array(5)
                        .fill()
                        .map((_, index) => (
                            <div key={index}>
                                <Skeleton className="mb-2 h-5 w-4/12 lg:w-2/12" />
                                <Skeleton className="mb-7 h-10 w-full" />
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
                                                    {formData.productname}
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
                                    {guid !== 'product'
                                        ? formData.productname
                                        : 'Add Product'}
                                </h1>

                                <Button
                                    text={'Save'}
                                    btnType={'submit'}
                                    disabled={!isChanged}
                                />
                            </div>
                            <div className="flex w-full items-end gap-4">
                                <Input
                                    handleChange={handleChange}
                                    id="productname"
                                    labelText="Product Name"
                                    required={true}
                                    value={formData.productname}
                                    containerClassName="flex-grow"
                                />
                                <Dropdown
                                    handleChange={handleChange}
                                    id={'status'}
                                    labelText={'Status'}
                                    options={[
                                        'Active',
                                        'Pre-Order',
                                        'Out of Stock',
                                    ]}
                                    value={formData.status}
                                />
                            </div>
                            <Input
                                handleChange={handleChange}
                                id="price"
                                labelText="Price"
                                type="number"
                                required={true}
                                value={formData.price}
                            />
                            <Input
                                handleChange={handleChange}
                                id="discountPrice"
                                type="number"
                                labelText="Discount Price"
                                value={formData.discountprice}
                            />
                            <Input
                                handleChange={handleChange}
                                id="brand"
                                labelText="Brand"
                                value={formData.brand}
                            />
                            <Input
                                id="colors"
                                labelText="Colors"
                                isColorPicker={true}
                                btnText={'Add'}
                                btnOnClick={handleAddColor}
                            />
                            <table className="min-w-full bg-white">
                                <thead className="whitespace-nowrap bg-gray-100">
                                    <tr className="">
                                        <th className="p-4 text-left text-sm font-semibold text-gray-800">
                                            Colors
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
                                    {formData.colors.map((color, index) => (
                                        <tr
                                            className="hover:bg-gray-50"
                                            key={index}
                                        >
                                            <td className="p-4 align-top text-sm text-gray-800">
                                                {color}
                                            </td>
                                            <td className="p-4 align-top text-sm text-gray-800">
                                                <div className="flex w-full flex-wrap gap-3">
                                                    {formData.ProductImages?.map(
                                                        (image, index) =>
                                                            image.color ===
                                                                color && (
                                                                <Image
                                                                    key={
                                                                        image.imageid
                                                                    }
                                                                    imgSrc={
                                                                        image.imagePath
                                                                    }
                                                                    ratio="aspect-card"
                                                                    className="h-48"
                                                                />
                                                            )
                                                    )}
                                                    <Input
                                                        handleChange={
                                                            handleImgChange
                                                        }
                                                        id={color}
                                                        isUploadImage={true}
                                                    />
                                                </div>
                                            </td>
                                            <td className="w-[1%] p-4 align-top text-sm">
                                                <div className="inline-flex w-full items-center justify-end gap-4 text-sm">
                                                    <Button
                                                        iconName={'trash'}
                                                        type={'link'}
                                                        onClick={() =>
                                                            handleDeleteColor(
                                                                color
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Input
                                id="size"
                                labelText="Sizes"
                                btnText={'Add'}
                                btnOnClick={handleAddSize}
                            />
                            <table className="min-w-full bg-white">
                                <thead className="whitespace-nowrap bg-gray-100">
                                    <tr className="">
                                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                            Sizes
                                        </th>
                                        <th className="w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                                    {formData.sizes.map((size, index) => (
                                        <tr
                                            className="hover:bg-gray-50"
                                            key={index}
                                        >
                                            <td className="p-4 text-sm text-gray-800">
                                                {size}
                                            </td>
                                            <td className="w-[1%] p-4 text-sm">
                                                <div className="inline-flex w-full items-center justify-end gap-4 text-sm">
                                                    <Button
                                                        iconName={'edit'}
                                                        type={'link'}
                                                    />
                                                    <Button
                                                        iconName={'trash'}
                                                        type={'link'}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex flex-col gap-2">
                                <p className="block text-sm font-medium text-gray-900">
                                    Size Metrics
                                </p>
                                <Dropdown
                                    handleChange={handleChange}
                                    id={'sizeMetric'}
                                    labelText={'Size Metric'}
                                    options={[
                                        'tshirt',
                                        'coat',
                                        'dress',
                                        'pants',
                                        'shirt',
                                        'skirt',
                                        'trousers',
                                    ]}
                                    value={formData.sizeMetric}
                                />
                            </div>
                            <Input
                                handleChange={handleChange}
                                id="material"
                                labelText="Material"
                                value={formData.material}
                            />
                            <div className="flex flex-col gap-2">
                                <p className="block text-sm font-medium text-gray-900">
                                    Online Stores
                                </p>
                                <table className="min-w-full bg-white">
                                    <thead className="whitespace-nowrap bg-gray-100">
                                        <tr className="">
                                            <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                                Online Store
                                            </th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                                Link
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                                        {formData.onlinestores.map(
                                            (store, index) => (
                                                <tr
                                                    className="hover:bg-gray-50"
                                                    key={index}
                                                >
                                                    <td className="p-4 text-sm text-gray-800">
                                                        {store.onlineStore}
                                                    </td>
                                                    <td className="w-full p-4 text-sm">
                                                        <Input
                                                            handleChange={
                                                                handleChange
                                                            }
                                                            id={`link_${index}`}
                                                            required={true}
                                                            value={store.link}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <ul className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap">
                                    {categoriesData.map((category, index) => (
                                        <li
                                            className="list-nonez mb-2"
                                            key={index}
                                        >
                                            <CategorySelection
                                                category={category}
                                                formData={
                                                    formData.ProductCategories
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Input
                                handleChange={handleChange}
                                id="shipping"
                                labelText="Shipping"
                                value={formData.shipping}
                            />
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default Product
