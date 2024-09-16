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
    const [isChanged, setIsChanged] = useState(false)
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [sizeValue, setSizeValue] = useState('')
    const [selectedSizeMetricId, setselectedSizeMetricId] = useState('')
    const [error, setError] = useState(null)
    const { guid } = useParams()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [initialData, setInitialData] = useState({
        productname: '',
        price: 0,
        discountprice: 0,
        brand: '',
        colors: [],
        sizes: [],
        material: '',
        onlinestores: [
            { onlineStore: 'Tokopedia', link: 'https://www.tokopedia.com' },
            { onlineStore: 'Shopee', link: 'https://www.shopee.com' },
        ],
        status: 'Active',
        ProductImages: [],
        ProductCategories: [],
        ProductSizeMetrics: [],
        sizemetricid: '',
    })
    const [formData, setFormData] = useState({
        productname: '',
        price: 0,
        discountprice: 0,
        brand: '',
        colors: [],
        sizes: [],
        material: '',
        onlinestores: [
            { onlineStore: 'Tokopedia', link: 'https://www.tokopedia.com' },
            { onlineStore: 'Shopee', link: 'https://www.shopee.com' },
        ],
        status: 'Active',
        ProductImages: [],
        ProductCategories: [],
        ProductSizeMetrics: [],
        sizemetricid: '',
    })
    const [categoriesData, setCategoriesData] = useState([])
    const [imgData, setImgData] = useState([])
    const [sizeMetrics, setSizeMetrics] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/categories`
                )
                setCategoriesData(response.data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchImages = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/images`
                )
                const { images, message } = response.data

                if (images && images.length > 0) {
                    // If images are present, update the state with images
                    setImgData(images)
                } else {
                    // If no images found, handle the message
                    console.warn(message || 'No images found')
                    // Set image data to an empty array or take further actions
                    setImgData([])
                }
            } catch (error) {
                console.error('Error fetching images:', error)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchSizeMetrics = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/size-metrics`
                )

                const sizeArray = response.data
                setSizeMetrics(sizeArray)

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    sizemetricid: prevFormData.sizemetricid
                        ? prevFormData.sizemetricid
                        : response.data[0].sizemetricid,
                    ProductSizeMetrics:
                        prevFormData.ProductSizeMetrics?.length > 0
                            ? // ? prevFormData.ProductSizeMetrics.map((metric) => ({
                              //       ...metric,
                              //       measurements:
                              //           prevFormData.sizes.length > 0
                              //               ? prevFormData.sizes.map((size) => ({
                              //                     [size]: '',
                              //                 }))
                              //               : [],
                              //   }))
                              prevFormData.ProductSizeMetrics.map((metric) => ({
                                  ...metric,
                                  measurements:
                                      prevFormData.sizes.length > 0 &&
                                      (!metric.measurements ||
                                          metric.measurements.length === 0)
                                          ? prevFormData.sizes.map((size) => ({
                                                [size]: '', // Initialize with empty values if sizes exist and measurements are null/empty
                                            }))
                                          : metric.measurements === null
                                            ? [] // Return empty array if measurements are null
                                            : metric.measurements, // Return the existing measurements
                              }))
                            : response.data[0].SizeAttributes.map(
                                  (attribute) => ({
                                      productsizemetricid:
                                          attribute.productsizemetricid
                                              ? attribute.productsizemetricid
                                              : '',
                                      productid: prevFormData.productid
                                          ? prevFormData.productid
                                          : '',
                                      sizeattributeid:
                                          attribute.sizeattributeid,
                                      measurements:
                                          prevFormData.sizes.length > 0
                                              ? prevFormData.sizes.map(
                                                    (size) => ({
                                                        [size]: '',
                                                    })
                                                )
                                              : [],
                                      SizeAttribute: {
                                          sizeattributeid:
                                              attribute.sizeattributeid,
                                          sizeattributename:
                                              attribute.sizeattributename,
                                          SizeMetric: {
                                              sizemetricid:
                                                  response.data[0].sizemetricid,
                                              sizemetricname:
                                                  response.data[0]
                                                      .sizemetricname,
                                          },
                                      },
                                  })
                              ),
                }))
                setInitialData((prevInitialData) => ({
                    ...prevInitialData,
                    sizemetricid: prevInitialData.sizemetricid
                        ? prevInitialData.sizemetricid
                        : response.data[0].sizemetricid,
                    ProductSizeMetrics:
                        prevInitialData.ProductSizeMetrics?.length > 0
                            ? // ? prevInitialData.ProductSizeMetrics.map(
                              //       (metric) => ({
                              //           ...metric,
                              //           measurements:
                              //               prevInitialData.sizes.length > 0
                              //                   ? prevInitialData.sizes.map(
                              //                         (size) => ({
                              //                             [size]: '',
                              //                         })
                              //                     )
                              //                   : [],
                              //       })
                              //   )
                              prevInitialData.ProductSizeMetrics.map(
                                  (metric) => ({
                                      ...metric,
                                      measurements:
                                          prevInitialData.sizes.length > 0 &&
                                          (!metric.measurements ||
                                              metric.measurements.length === 0)
                                              ? prevInitialData.sizes.map(
                                                    (size) => ({
                                                        [size]: '', // Initialize with empty values if sizes exist and measurements are null/empty
                                                    })
                                                )
                                              : metric.measurements === null
                                                ? [] // Return empty array if measurements are null
                                                : metric.measurements, // Return the existing measurements
                                  })
                              )
                            : response.data[0].SizeAttributes.map(
                                  (attribute) => ({
                                      productsizemetricid:
                                          attribute.productsizemetricid
                                              ? attribute.productsizemetricid
                                              : '',
                                      productid: prevInitialData.productid
                                          ? prevInitialData.productid
                                          : '',
                                      sizeattributeid:
                                          attribute.sizeattributeid,
                                      measurements: [],
                                      SizeAttribute: {
                                          sizeattributeid:
                                              attribute.sizeattributeid,
                                          sizeattributename:
                                              attribute.sizeattributename,
                                          SizeMetric: {
                                              sizemetricid:
                                                  response.data[0].sizemetricid,
                                              sizemetricname:
                                                  response.data[0]
                                                      .sizemetricname,
                                          },
                                      },
                                  })
                              ),
                }))

                if (formData.sizes.length > 0) {
                    sizeArray.forEach((size) => {
                        size.SizeAttributes.forEach((attr) => {
                            attr.measurements = formData.sizes.map((size) => ({
                                [size]: '',
                            }))
                        })
                    })
                }
            } catch (error) {
                console.error('Error fetching size metrics:', error)
            } finally {
                setIsLoading(false)
            }
        }
        const fetchProduct = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/products/${guid}`
                )

                // Handle the case where colors might be null or undefined
                const productData = response.data;
                productData.colors = productData.colors || []; // Fallback to an empty array if colors is null or undefined

                setFormData(productData)
                setInitialData(productData)
                fetchCategories()
                fetchSizeMetrics()
                fetchImages()
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setIsLoading(false)
            }
        }
        if (guid !== 'product') {
            fetchProduct()
        } else {
            fetchCategories()
            fetchSizeMetrics()
            setIsLoading(false)
        }
    }, [guid])

    useEffect(() => {
        if (sizeMetrics.length < 1) return
        const selectedSizeMetrics = sizeMetrics.find(
            (el) => el.sizemetricid === selectedSizeMetricId
        )
        if (!selectedSizeMetrics) return
        setFormData((prevFormData) => ({
            ...prevFormData,
            sizemetricid: prevFormData.sizemetricid
                ? prevFormData.sizemetricid
                : selectedSizeMetrics.sizemetricid,
            ProductSizeMetrics: selectedSizeMetrics.SizeAttributes.map(
                (attribute) => ({
                    productsizemetricid: attribute.productsizemetricid
                        ? attribute.productsizemetricid
                        : '',
                    productid: prevFormData.productid
                        ? prevFormData.productid
                        : '',
                    sizeattributeid: attribute.sizeattributeid,
                    measurements:
                        prevFormData.sizes.length > 0
                            ? prevFormData.sizes.map((size) => ({
                                  [size]: '',
                              }))
                            : [],
                    SizeAttribute: {
                        sizeattributeid: attribute.sizeattributeid,
                        sizeattributename: attribute.sizeattributename,
                        SizeMetric: {
                            sizemetricid: selectedSizeMetrics.sizemetricid,
                            sizemetricname: selectedSizeMetrics.sizemetricname,
                        },
                    },
                })
            ),
        }))
    }, [selectedSizeMetricId, sizeMetrics, formData.productid])

    useEffect(() => {
        const isFormChanged =
            JSON.stringify(formData) !== JSON.stringify(initialData)
        setIsChanged(isFormChanged)
    }, [formData, initialData])

    const handleAddColor = (e) => {
        e.preventDefault();
        const hex = document.querySelector('#colors').value;
    
        if (hex) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                colors: [...prevFormData.colors, { hex, name: "" }],
            }));
        }
    };

    const handleAddSize = (e) => {
        e.preventDefault()
        const { value } = document.querySelector('#size')
        if (value) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                sizes: [...prevFormData.sizes, value],
                ProductSizeMetrics: prevFormData.ProductSizeMetrics.map(
                    (metric) => ({
                        ...metric,
                        measurements: [...metric.measurements, { [value]: '' }],
                    })
                ),
            }))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (!name) return
        if (name.includes('table')) {
            const storeType = name.split('_')[1]
            setFormData((prevFormData) => ({
                ...prevFormData,
                onlinestores: prevFormData.onlinestores.map((store) =>
                    store.onlineStore === storeType
                        ? { ...store, link: value }
                        : store
                ),
            }))
            return
        }
        setFormData({
            ...formData,
            [name]: value,
        })
        if (name === 'sizemetricid') {
            setselectedSizeMetricId(value)
        }
    }

    const handleChangeSize = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => {
            const updatedData = { ...prevData }
            const measurements = updatedData.ProductSizeMetrics.find(
                (attr) => attr.sizeattributeid === name.split('_')[0]
            )?.measurements

            const updatedMeasurements = measurements.map((measurement) => {
                if (measurement[name.split('_')[1]] !== undefined) {
                    return { [name.split('_')[1]]: value }
                }
                return measurement
            })

            updatedData.ProductSizeMetrics.find(
                (attr) => attr.sizeattributeid === name.split('_')[0]
            ).measurements = updatedMeasurements

            return updatedData
        })
    }

    const handleImgChange = async (e) => {
        e.preventDefault()
        setIsLoadingImage(true)

        if (e.target.type === 'file') {
            const file = e.target.files[0]
            const formData = new FormData()

            // Append the file to the FormData object
            formData.append('file', file)
            formData.append('imagetype', `${guid}_${e.target.id}`) // hardcoded
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/upload-image/${guid}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                setImgData((prevData) => [...prevData, response.data.image])
                setFormData((prevData) => ({
                    ...prevData,
                    ProductImages: [
                        ...imgData.filter(
                            (img) => img.imagetype.split('_')[0] === guid
                        ),
                        response.data.image,
                    ],
                }))

                // append imageId to ProductImages
            } catch (error) {
                console.error('Error uploading image:', error)
            } finally {
                setIsLoadingImage(false)
            }
        }
    }

    const handleClickDeleteImg = async (e, imageId) => {
        e.preventDefault()
        setIsDeletingImage(true)
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/delete-image/${imageId}`
            )

            if (response.status === 200) {
                setImgData((prevData) =>
                    prevData.filter((img) => img.cdnid !== imageId)
                )
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeletingImage(false)
        }
    }

    const handleDeleteColor = (color) => {
        setFormData((prevData) => ({
            ...prevData,
            colors: prevData.colors.filter((item) => item.hex !== color),
        }))
    }

    const handleChangeColorName = (color, newName) => {
        setFormData((prevData) => ({
            ...prevData,
            colors: prevData.colors.map((item) => 
                item.hex === color.hex ? { ...item, name: newName } : item // Update the name only for the matching color
            ),
        }));
    };

    const handleCategorySelect = (
        category,
        categoryDetail,
        isChecked = true
    ) => {
        setFormData((prevData) => {
            if (isChecked) {
                categoryDetail.categoryid = category.categoryid
                const updatedCategories = prevData.ProductCategories.filter(
                    (cat) => {
                        return !(
                            cat?.CategoryDetail?.Category?.categoryid ===
                                category.categoryid ||
                            cat.categoryid === category.categoryid
                        )
                    }
                )
                return {
                    ...prevData,
                    ProductCategories: [...updatedCategories, categoryDetail],
                }
            } else {
                const updatedCategories = prevData.ProductCategories.filter(
                    (cat) =>
                        cat.categorydetailid !== categoryDetail.categorydetailid
                )

                return {
                    ...prevData,
                    ProductCategories: updatedCategories,
                }
            }
        })
    }

    const handleDeleteSize = (size) => {
        setFormData((prevData) => ({
            ...prevData,
            sizes: prevData.sizes.filter((item) => item !== size),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (formData.colors.length < 1) {
            setError({ color: 'Please add at least 1 color' })
            setIsSubmitting(false)
            return
        }
        if (formData.sizes.length < 1) {
            setError({ size: 'Please add at least 1 size' })
            setIsSubmitting(false)
            return
        }
        if (formData.ProductCategories.length < 1) {
            setError({ category: 'Please select at least 1 category' })
            setIsSubmitting(false)
            return
        }
        try {
            if (guid !== 'product') {
                const response = await axios.put(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/products/${guid}`,
                    formData
                )
                if (response.status >= 200 && response.status < 300) {
                    setInitialData(response.data.product)
                    setFormData(response.data.product)
                }
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/products`,
                    formData
                )
                if (response.status >= 200 && response.status < 300) {
                    setInitialData(response.data.product)
                    setFormData(response.data.product)
                }
            }
        } catch (error) {
            // debugger
            console.error(error)
        } finally {
            setIsSubmitting(false)
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
                                    {formData.productname
                                        ? formData.productname
                                        : 'Add Product'}
                                </h1>

                                <Button
                                    text={'Save'}
                                    btnType={'submit'}
                                    disabled={!isChanged}
                                    isSubmitting={isSubmitting}
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
                                id="discountprice"
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
                            <div>
                                <Input
                                    id="colors"
                                    labelText="Colors"
                                    isColorPicker={true}
                                    btnText={'Add'}
                                    btnOnClick={handleAddColor}
                                />
                                {error?.color && (
                                    <p className="mt-2 text-xs text-red-700">
                                        {error?.color}
                                    </p>
                                )}
                            </div>
                            {formData.colors.length > 0 && (
                                <table className="min-w-full bg-white">
                                    <thead className="whitespace-nowrap bg-gray-100">
                                        <tr className="">
                                            <th className="p-4 text-left text-sm font-semibold text-gray-800">
                                                Colors
                                            </th>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-800">
                                                Color Label
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
                                                    <div className="inline-flex items-center gap-4">
                                                        <span
                                                            className="size-6"
                                                            style={{
                                                                backgroundColor:
                                                                    color.hex,
                                                            }}
                                                        ></span>
                                                        <span>{color.hex}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-top text-sm text-gray-800">
                                                    <Input
                                                        handleChange={(e) => 
                                                            handleChangeColorName(color, e.target.value)
                                                        }
                                                        id={`label_${color.hex}`}
                                                        required={false}
                                                        value={color.name}
                                                        inputClassName="!text-xs"
                                                    />
                                                </td>
                                                <td className="p-4 align-top text-sm text-gray-800">
                                                    <div className="flex w-full flex-wrap gap-3">
                                                        {imgData
                                                            .filter(
                                                                (img) =>
                                                                    img.imagetype ===
                                                                    `${guid}_${color}`
                                                            )
                                                            .map((img) => (
                                                                <Image
                                                                    key={
                                                                        img.cdnid
                                                                    }
                                                                    imgSrc={
                                                                        img.imagepath
                                                                    }
                                                                    ratio="aspect-card"
                                                                    className="h-48"
                                                                    handleClickDelete={
                                                                        handleClickDeleteImg
                                                                    }
                                                                    imgCdnId={
                                                                        img.cdnid
                                                                    }
                                                                    isLoading={
                                                                        isLoadingImage
                                                                    }
                                                                    isDeleting={
                                                                        isDeletingImage
                                                                    }
                                                                />
                                                            ))}
                                                        <Input
                                                            handleChange={
                                                                handleImgChange
                                                            }
                                                            id={color}
                                                            ratio="aspect-card"
                                                            className="h-48"
                                                            isUploadImage={true}
                                                            isLoading={
                                                                isLoadingImage
                                                            }
                                                            isDeleting={
                                                                isDeletingImage
                                                            }
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
                            )}
                            <div className="flex flex-col gap-2">
                                <p className="block text-sm font-medium text-gray-900">
                                    Size Metrics
                                </p>
                                {sizeMetrics && (
                                    <Dropdown
                                        handleChange={handleChange}
                                        id={'sizemetricid'}
                                        labelText={'Size Metric'}
                                        options={sizeMetrics}
                                        optionFetched={true}
                                        value={formData.sizemetricid}
                                    />
                                )}
                            </div>
                            <div>
                                <Input
                                    id="size"
                                    labelText="Sizes"
                                    btnText={'Add'}
                                    btnOnClick={handleAddSize}
                                    value={sizeValue}
                                    handleChange={(e) =>
                                        setSizeValue(e.target.value)
                                    }
                                />
                                {error?.size && (
                                    <p className="mt-2 text-xs text-red-700">
                                        {error?.size}
                                    </p>
                                )}
                            </div>
                            <div className="overflow-x-auto">
                                {formData.sizes.length > 0 && (
                                    <table className="min-w-full bg-white">
                                        <thead className="whitespace-nowrap bg-gray-100">
                                            <tr className="">
                                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                                    Sizes
                                                </th>
                                                {formData.ProductSizeMetrics?.map(
                                                    (metric, index) => (
                                                        <td
                                                            key={
                                                                metric.sizeattributeid
                                                            }
                                                            className="p-4 text-left text-xs font-semibold text-gray-800"
                                                        >
                                                            {
                                                                metric
                                                                    .SizeAttribute
                                                                    .sizeattributename
                                                            }
                                                        </td>
                                                    )
                                                )}
                                                <th className="w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                                            {formData.sizes.map(
                                                (size, indexSize) => (
                                                    <tr
                                                        className="hover:bg-gray-50"
                                                        key={indexSize}
                                                    >
                                                        <td className="p-4 text-xs text-gray-800">
                                                            {size}
                                                        </td>
                                                        {formData.ProductSizeMetrics?.map(
                                                            (metric, index) => {
                                                                return (
                                                                    metric
                                                                        .measurements
                                                                        ?.length >
                                                                        0 && (
                                                                        <td
                                                                            key={
                                                                                metric.sizeattributeid
                                                                            }
                                                                            className="p-4 text-xs text-gray-800"
                                                                        >
                                                                            <Input
                                                                                inputClassName="min-w-[200px] !text-xs"
                                                                                id={`${metric.sizeattributeid}_${size}`}
                                                                                value={
                                                                                    metric
                                                                                        .measurements[
                                                                                        indexSize
                                                                                    ][
                                                                                        size
                                                                                    ]
                                                                                }
                                                                                handleChange={
                                                                                    handleChangeSize
                                                                                }
                                                                            />
                                                                        </td>
                                                                    )
                                                                )
                                                            }
                                                        )}
                                                        <td className="w-[1%] p-4 text-xs">
                                                            <div className="inline-flex w-full items-center justify-end gap-4 text-xs">
                                                                <Button
                                                                    iconName={
                                                                        'trash'
                                                                    }
                                                                    type={
                                                                        'link'
                                                                    }
                                                                    onClick={() =>
                                                                        handleDeleteSize(
                                                                            size
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
                            </div>
                            <Input
                                handleChange={handleChange}
                                id="material"
                                labelText="Material"
                                required={true}
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
                                                            id={`table_${store.onlineStore}`}
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
                                <p className="block text-sm font-medium text-gray-900">
                                    Categories
                                </p>
                                {error?.category && (
                                    <p className="mt-2 text-xs text-red-700">
                                        {error?.category}
                                    </p>
                                )}
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
                                                handleCategorySelect={
                                                    handleCategorySelect
                                                }
                                                titleClassName={
                                                    'text-sm !font-medium'
                                                }
                                                listClassName={'text-xs'}
                                                inputClassName={'!w-4 !h-4'}
                                                iconWidth={'12'}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default Product
