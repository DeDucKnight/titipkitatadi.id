import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Switch from '../components/Switch'
import Button from '../components/Button'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Image from '../components/Image'

export const categories = [
    {
        categoryId: '883ff002-1310-4043-a927-a5bd55562d81',
        categoryName: 'Top',
        isStandard: true,
        status: true,
        createdDate: '2024-01-01 00:00:00',
        categoryDetails: [
            {
                categoryDetailId: '5bce91c5-09af-42b3-aaf0-334fadc298b1',
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
                categoryDetailId: '4a364775-7f87-4511-8b7c-6dc0d79c6f8b',
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
    const { guid } = useParams()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [formData, setFormData] = useState([])
    const [categoryParent, setCategoryParent] = useState('')

    useEffect(() => {
        setFormData(() => {
            return categories.find((category) => category.categoryId == guid)
                .categoryDetails
        })

        setCategoryParent(
            categories.find((category) => category.categoryId == guid)
                .categoryName
        )
    }, [guid])
    const handleSubmit = (event) => {
        event.preventDefault()
        const jsonData = JSON.stringify(formData)
        console.log('Form Data as JSON:', jsonData)
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
            <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold">{categoryParent}</h1>

                    <Button text={'Save'} btnType={'submit'} />
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
                            <tr className="hover:bg-gray-50" key={index}>
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
                                            handleChange={handleImgChange}
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
                                        <Switch isChecked={data.status} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Category
