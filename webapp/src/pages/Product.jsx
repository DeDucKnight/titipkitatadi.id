import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Button from '../components/Button'
import Switch from '../components/Switch'
import Image from '../components/Image'
import CategorySelection from '../components/CategorySelection'
import Dropdown from '../components/Dropdown'
import axios from 'axios';

const productDetail = {
    productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
    productName: 'Summer Top',
    shipping: 'Summer Top for Summer',
    price: '100000',
    discountPrice: '80000',
    Brand: 'Mihel',
    colors: ['#FF0000', '#008000', '#0000FF'],
    size: ['xs', 's', 'm', 'l'],
    materials: ['wool', 'wool2'],
    sizeMetric: 'shirt',
    onlineStores: [
        {
            onlineStore: 'Tokopedia',
            link: 'link1',
        },
        {
            onlineStore: 'Shopee',
            link: 'link2',
        },
    ],
    status: 'Pre-Order',
    createdDate: '2024-01-01 00:00:00',
    productImages: [
        {
            productImageId: '1fc20b9d-5618-42ba-aeac-d115b3473e13',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '8db6aa5b-7e3c-492c-b4f9-37318ffd0266',
            color: '#FF0000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/7787d351-6e74-413c-bbce-0cd7223277ce.jpg',
        },
        {
            productImageId: '036149ff-e51b-4d72-9d56-9aad3b67b677',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '5431e5f5-cd84-432a-a7e8-8e4e70421b7f',
            color: '#FF0000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
        },
        {
            productImageId: '0625c12a-ea5d-4d29-8d5b-13ef9a1c57c8',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: 'c27853c3-ffc7-449a-a1b5-b7fcc4ab70ea',
            color: '#FF0000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/13/7787d351-6e74-413c-bbce-0cd7223277ce.jpg',
        },
        {
            productImageId: '7ec24887-cb81-403f-a65d-9aa7898c9588',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '3a11f5f0-d375-404a-8753-4749011d8c4a',
            color: '#FF0000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/8/13/055c6c8f-9feb-4372-988f-bce9af89f3c2.jpg',
        },
        {
            productImageId: '8a4799ab-88e9-481c-9901-2655bb54d405',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '81f45c76-a228-436b-828d-b21c2d290713',
            color: '#008000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/faf76160-9c09-44d3-abc5-bfd3f25e44f2.jpg',
        },
        {
            productImageId: 'a650dc2e-8b11-442c-b54c-a8da3a3ffd11',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '8e7dad98-3fa8-4a17-a288-5266d853ade7',
            color: '#008000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/8/12/bcb6f6ba-82eb-4ca1-bf3a-395f3aaa16bf.jpg.webp?ect=4g',
        },
        {
            productImageId: '5a4aba90-d25c-4df8-9278-d49b50459a69',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '86e04072-0dac-4f1e-8028-704323c66f50',
            color: '#008000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/faf76160-9c09-44d3-abc5-bfd3f25e44f2.jpg',
        },
        {
            productImageId: 'b2a0c503-b7a5-45a7-9e1a-badf46c70e1a',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: 'c5d2f9c1-f826-4958-bfc5-fae6b0471099',
            color: '#008000',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/8/12/bcb6f6ba-82eb-4ca1-bf3a-395f3aaa16bf.jpg.webp?ect=4g',
        },
        {
            productImageId: '5f0c7eea-6a20-46cc-80c5-7f1666112866',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '89917aa4-c02e-4c0e-9232-015767c863c9',
            color: '#0000FF',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/ef850124-1abd-4aad-81e2-b13e8a80270e.jpg',
        },
        {
            productImageId: 'd4a31ff9-7a6d-4e72-83ee-dc36c7d8aa74',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '8d355aad-4b06-44f4-bcf4-e8121028046b',
            color: '#0000FF',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/8/12/eb885ea3-07be-480b-a6fb-81ef1314a239.jpg',
        },
        {
            productImageId: '39e0f184-05fc-4893-b4e9-c958b0d9dee0',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: '18c8b572-d767-450d-b653-5b8cd003bcfd',
            color: '#0000FF',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/200-square/VqbcmM/2024/8/12/ef850124-1abd-4aad-81e2-b13e8a80270e.jpg',
        },
        {
            productImageId: '21916f5d-2d2c-4e4f-b325-070c3fb67690',
            productId: '5e84b303-208c-4576-a494-072ebb9ecfca',
            imageId: 'ab7be47c-46f9-494a-996b-d544c49eeeae',
            color: '#0000FF',
            isDefault: true,
            status: true,
            createdDate: '2024-01-01 00:00:00',
            imagePath:
                'https://images.tokopedia.net/img/cache/700/VqbcmM/2024/8/12/eb885ea3-07be-480b-a6fb-81ef1314a239.jpg',
        },
    ],
    categoryDetails: [
        {
            categoryDetailId: 'c5181fc1-f153-45b0-9417-f099428a0fd9',
            categoryId: '883ff002-1310-4043-a927-a5bd55562d81',
            categoryDetailName: 'Shirt',
            status: true,
            createdDate: '2024-01-01 00:00:00',
            categoryName: 'Top',
        },
        {
            categoryDetailId: '75763ee3-842d-4da1-8651-98fb650eb81d',
            categoryId: '2a11a5d1-f9b4-4100-a43c-977db901e7d9',
            categoryDetailName: 'Summer',
            status: true,
            createdDate: '2024-01-01 00:00:00',
            categoryName: 'Season',
        },
    ],
}
const categories = [
    {
        categoryId: '883ff002-1310-4043-a927-a5bd55562d81',
        categoryName: 'Top',
        isStandard: true,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: 'c5181fc1-f153-45b0-9417-f099428a0fd9',
                categoryId: '883ff002-1310-4043-a927-a5bd55562d81',
                categoryDetailName: 'Shirt',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '5fa90e08-73c0-46b8-aeb2-85209b63061d',
                categoryId: '883ff002-1310-4043-a927-a5bd55562d81',
                categoryDetailName: 'Short Sleeve',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: 'e1029e04-bfe8-464f-9f83-a81fb539dc76',
                categoryId: '883ff002-1310-4043-a927-a5bd55562d81',
                categoryDetailName: 'Long Sleeve',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: 'd059cb7e-ebfb-45d0-986f-617dd0293b4c',
                categoryId: '883ff002-1310-4043-a927-a5bd55562d81',
                categoryDetailName: 'Tee',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
        ],
    },
    {
        categoryId: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
        categoryName: 'Bottom',
        isStandard: true,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: '2472d16e-76c9-4300-aa26-38c4f5c3b0b3',
                categoryId: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
                categoryDetailName: 'Pants',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '5115cb17-a50d-461c-9bfd-dd012dd288bc',
                categoryId: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
                categoryDetailName: 'Jeans',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '21b8c2af-7b51-4962-b720-9702ec87b827',
                categoryId: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
                categoryDetailName: 'Shorts',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '6daab82b-f3e3-4c76-8488-1f4a2aa7c2f0',
                categoryId: 'c876961c-80d4-4cdf-a43f-aaec29081ea6',
                categoryDetailName: 'Skirt',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
        ],
    },
    {
        categoryId: '265feaad-65c7-445a-a10f-490856e0cb74',
        categoryName: 'Outer',
        isStandard: true,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: '8cdff4dd-eb37-46d0-b3fe-cef4a0143dac',
                categoryId: '265feaad-65c7-445a-a10f-490856e0cb74',
                categoryDetailName: 'Blazer and Jacket',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '3076cde8-3676-441b-9347-fc4baf7d4cce',
                categoryId: '265feaad-65c7-445a-a10f-490856e0cb74',
                categoryDetailName: 'Coat',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '518b90ed-1acb-487d-81b9-c7e2aeb6f06e',
                categoryId: '265feaad-65c7-445a-a10f-490856e0cb74',
                categoryDetailName: 'Cardigan',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
        ],
    },
    {
        categoryId: '5d9e2c87-6f42-4004-98fd-d721c9bdd9cb',
        categoryName: 'Dress',
        isStandard: true,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: '20127569-88df-4806-9b0c-5c438f3e28f8',
                categoryId: '5d9e2c87-6f42-4004-98fd-d721c9bdd9cb',
                categoryDetailName: 'Dress',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
        ],
    },
    {
        categoryId: '0e12ac4f-8c6c-4433-9343-aa3d86b2fd86',
        categoryName: 'Accessories',
        isStandard: true,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: '9109ae65-8fe9-4510-a386-f89c9ea8faf8',
                categoryId: '0e12ac4f-8c6c-4433-9343-aa3d86b2fd86',
                categoryDetailName: 'Accessories',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
        ],
    },
    {
        categoryId: '2a11a5d1-f9b4-4100-a43c-977db901e7d9',
        categoryName: 'Season',
        isStandard: false,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: 'c669439f-b0af-4440-9553-f5ff4012f336',
                categoryId: '2a11a5d1-f9b4-4100-a43c-977db901e7d9',
                categoryDetailName: 'Spring',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '75763ee3-842d-4da1-8651-98fb650eb81d',
                categoryId: '2a11a5d1-f9b4-4100-a43c-977db901e7d9',
                categoryDetailName: 'Summer',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '846abc03-7bcc-4847-8cb1-94d14ddbbf70',
                categoryId: '2a11a5d1-f9b4-4100-a43c-977db901e7d9',
                categoryDetailName: 'Fall',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: 'edddf750-2dd0-42a0-a8c8-eeb5cf8834a6',
                categoryId: '2a11a5d1-f9b4-4100-a43c-977db901e7d9',
                categoryDetailName: 'Winter',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
        ],
    },
    {
        categoryId: '5ca78044-2b0a-48be-9fc6-80af6f4d23f0',
        categoryName: 'Collection',
        isStandard: false,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: '9a8c5c27-b6d5-4a0d-9a60-6f49691ab129',
                categoryId: '5ca78044-2b0a-48be-9fc6-80af6f4d23f0',
                categoryDetailName: 'Basics',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '7f50e139-7d74-45fa-a46a-f9166fec2baf',
                categoryId: '5ca78044-2b0a-48be-9fc6-80af6f4d23f0',
                categoryDetailName: 'Signatures',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '12ece0ed-02e0-4b7d-b1d2-c876d08a77c2',
                categoryId: '5ca78044-2b0a-48be-9fc6-80af6f4d23f0',
                categoryDetailName: 'Essentials',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
            {
                categoryDetailId: '0be6cb59-ee75-44a2-994d-72c074201252',
                categoryId: '5ca78044-2b0a-48be-9fc6-80af6f4d23f0',
                categoryDetailName: 'Best Sellers',
                status: true,
                createdDate: '2024-01-01 00:00:00',
            },
        ],
    },
]

const Product = () => {
    // const [formData2, setFormData] = useState({
    //     productId: '',
    //     productName: '',
    //     shipping: '',
    //     price: '',
    //     discountPrice: '',
    //     Brand: '',
    //     colors: [],
    //     size: [],
    //     materials: [],
    //     sizeMetric: '',
    //     productImages: [],
    //     status: '',
    //     categories: [],
    //     onlineStores: [],
    // });

    const [formData, setFormData] = useState({
        productname: "",
        description: "",
        price: "",
        discountprice: "",
        brand: "",
        colors: [],
        sizes: [],
        material: "",
        onlinestores: [],
        status: true,
        productimages: [],
        productcategories: []
    });
    const [loading, setLoading] = useState(true);

    const { guid } = useParams()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/products/${guid}`); 
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct()
        // setFormData({
        //     productName: productDetail.productName || '',
        //     shipping: productDetail.shipping || '',
        //     price: productDetail.price || '',
        //     discountPrice: productDetail.discountPrice || '',
        //     Brand: productDetail.Brand || '',
        //     colors: productDetail.colors || [],
        //     size: productDetail.size || [],
        //     materials: productDetail.materials || [],
        //     status: productDetail.status || '',
        //     sizeMetric: productDetail.sizeMetric || '',
        //     onlineStores: productDetail.onlineStores || [],
        //     categoryDetails: productDetail.categoryDetails || [],
        //     productImages: productDetail.productImages || [],
        // })
    }, [])

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
                size: [...prevFormData.size, value],
            }))
        }
    }
    const handleAddMaterial = (e) => {
        e.preventDefault()
        const { value } = document.querySelector('#material')
        if (value) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                materials: [...prevFormData.materials, value],
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

    const handleImgChange = (e) => {
        let imgFile = ''
        if (e.target.type === 'file') {
            imgFile = e.target.files[0]
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const jsonData = JSON.stringify(formData)
        console.log('Form Data as JSON:', jsonData)
    }
    return (
        <div className="mx-4 w-full overflow-x-hidden px-4">
            <div className="mb-7 border-b pb-4">
                <div className="flex items-center justify-between">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        {pathnames.map((value, index) => {
                            let to = `/${pathnames.slice(0, index + 1).join('/')}`

                            return (
                                <li key={index} className="flex items-center">
                                    {index === pathnames.length - 1 ? (
                                        <span className="text-sm font-medium capitalize text-gray-400">
                                            {formData.productName}
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
            <div className="mb-7">
                <form
                    className="space-y-4 md:space-y-6"
                    action="#"
                    onSubmit={handleSubmit}
                >
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">
                            {formData.productName}
                        </h1>

                        <Button text={'Save'} btnType={'submit'} />
                    </div>
                    <div className="flex w-full items-end gap-4">
                        <Input
                            handleChange={handleChange}
                            id="productName"
                            labelText="Product Name"
                            required={true}
                            value={formData.productname}
                            containerClassName="flex-grow"
                        />
                        <Dropdown
                            handleChange={handleChange}
                            id={'status'}
                            labelText={'Status'}
                            options={['Active', 'Pre-Order', 'Out of Stock']}
                            value={formData.status}
                        />
                    </div>
                    <Input
                        handleChange={handleChange}
                        id="description"
                        labelText="Description"
                        value={formData.description}
                        isResizeable={true}
                    />
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
                                <tr className="hover:bg-gray-50" key={index}>
                                    <td className="p-4 align-top text-sm text-gray-800">
                                        {color}
                                    </td>
                                    <td className="p-4 align-top text-sm text-gray-800">
                                        <div className="flex w-full flex-wrap gap-3">
                                            {formData.ProductImages.map(
                                                (image, index) =>
                                                    image.color === color && (
                                                        <Image
                                                            key={image.imageId}
                                                            imgSrc={
                                                                image.imagePath
                                                            }
                                                            ratio="aspect-card"
                                                            className="h-48"
                                                        />
                                                    )
                                            )}
                                            <Input
                                                handleChange={handleImgChange}
                                                id={color}
                                                isUploadImage={true}
                                            />
                                        </div>
                                    </td>
                                    <td className="w-[1%] p-4 align-top text-sm">
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
                                <tr className="hover:bg-gray-50" key={index}>
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
                    {/* <Input
                        id="material"
                        labelText="Materials"
                        btnText={'Add'}
                        btnOnClick={handleAddMaterial}
                    /> */}
                    {/* <table className="min-w-full bg-white">
                        <thead className="whitespace-nowrap bg-gray-100">
                            <tr className="">
                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                    Materials
                                </th>
                                <th className="w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                            {formData.material.map((material, index) => (
                                <tr className="hover:bg-gray-50" key={index}>
                                    <td className="p-4 text-sm text-gray-800">
                                        {material}
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
                    </table> */}
                    <Input
                        handleChange={handleChange}
                        id="material"
                        labelText="Material"
                        value={formData.material}
                        isResizeable={true}
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
                                {formData.onlinestores.map((store, index) => (
                                    <tr
                                        className="hover:bg-gray-50"
                                        key={index}
                                    >
                                        <td className="p-4 text-sm text-gray-800">
                                            {store.onlineStore}
                                        </td>
                                        <td className="w-full p-4 text-sm">
                                            <Input
                                                handleChange={handleChange}
                                                id={`link_${index}`}
                                                required={true}
                                                value={store.link}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <ul className="flex gap-4">
                            {categories.map((category, index) => (
                                <li className="mb-2 list-none" key={index}>
                                    <CategorySelection
                                        category={category}
                                        formData={formData.ProductCategories}
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
        </div>
    )
}

export default Product
