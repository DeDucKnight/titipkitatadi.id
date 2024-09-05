import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Image from '../components/Image'

const Images = () => {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [formData, setFormData] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        const jsonData = JSON.stringify(formData)
        console.log('Form Data as JSON:', jsonData)
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
                        <li className="flex items-center">
                            <span className="text-sm font-medium capitalize text-gray-700">
                                {location.pathname.split('/')}
                            </span>
                        </li>
                    </ol>
                </div>
            </div>
            <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
            >
                <div className="space-y-7">
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold">
                            Banner Slide Show
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Image
                                // key={image.imageId}
                                // imgSrc={image.imagePath}
                                ratio="aspect-20x9"
                                className="w-1/3"
                            />
                            <Input
                                handleChange={handleImgChange}
                                id="banner_img"
                                isUploadImage={true}
                                containerClassName={'!w-1/3'}
                                imgUploadContainerClassName={
                                    '!aspect-20x9 !h-full'
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold">Banner Footer</p>
                        <div className="flex flex-wrap gap-4">
                            <Image
                                // key={image.imageId}
                                // imgSrc={image.imagePath}
                                ratio="aspect-20x9"
                                className="w-1/3"
                            />
                            <Input
                                handleChange={handleImgChange}
                                id="footer"
                                isUploadImage={true}
                                containerClassName={'!w-1/3'}
                                imgUploadContainerClassName={
                                    '!aspect-20x9 !h-full'
                                }
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Images
