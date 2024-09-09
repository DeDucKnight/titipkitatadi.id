import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Image from '../components/Image'
import Button from '../components/Button'
import axios from 'axios'
import Skeleton from '../components/Skeleton'

const Images = () => {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [formData, setFormData] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log(formData)
            const response = await axios.post(
                `http://localhost:5000/api/products`,
                formData
            )
        } catch (error) {
            console.error(error)
        }
    }
    const fetchImages = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                'http://localhost:5000/api/images'
            )
            setFormData(response.data)
        } catch (error) {
            console.error('Error fetching images:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleImgChange = async (e) => {
        e.preventDefault();
    
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            const formData = new FormData();
    
            // Append the file to the FormData object
            formData.append('file', file);
            formData.append('imagetype', 'banner'); // hardcoded - change to proper banner type
    
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/upload-image',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log('Image Uploaded:', response.data);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div className="mx-4 w-full overflow-x-hidden px-4">
            {isLoading ? (
                <div className="py-4">
                    <Skeleton className="mb-11 h-9 w-3/12" />
                    <Skeleton className="mb-7 h-6 w-4/12 lg:w-3/12" />
                    <Skeleton
                        classContainer="relative mb-6 w-full lg:w-1/3 flex aspect-20x9 overflow-hidden"
                        className="aspect-20x9 h-full"
                    />
                    <Skeleton className="mb-7 h-6 w-4/12 lg:w-3/12" />
                    <Skeleton
                        classContainer="relative mb-4 w-full lg:w-1/3 flex aspect-20x9 overflow-hidden"
                        className="aspect-20x9 h-full"
                    />
                </div>
            ) : (
                <div className="mb-7 pb-4">
                    <form
                        className="relative h-max space-y-4 py-4 md:space-y-6"
                        action="#"
                        onSubmit={handleSubmit}
                    >
                        <div className="sticky top-[60px] z-20 flex items-center justify-between bg-white py-4 lg:top-0">
                            <h1 className="mb-4 text-3xl font-bold">Images</h1>

                            <Button text={'Save'} btnType={'submit'} />
                        </div>
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
                                        className="w-full lg:w-1/3"
                                    />
                                    <Input
                                        handleChange={handleImgChange}
                                        id="banner_img"
                                        isUploadImage={true}
                                        containerClassName={'w-full lg:!w-1/3'}
                                        imgUploadContainerClassName={
                                            '!aspect-20x9 !h-full'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-semibold">
                                    Banner Footer
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Image
                                        // key={image.imageId}
                                        // imgSrc={image.imagePath}
                                        ratio="aspect-20x9"
                                        className="w-full lg:w-1/3"
                                    />
                                    <Input
                                        handleChange={handleImgChange}
                                        id="footer"
                                        isUploadImage={true}
                                        containerClassName={'w-full lg:!w-1/3'}
                                        imgUploadContainerClassName={
                                            '!aspect-20x9 !h-full'
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Images
