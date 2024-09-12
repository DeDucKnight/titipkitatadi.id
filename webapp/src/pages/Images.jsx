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
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [isDeletingImage, setIsDeletingImage] = useState(false)
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [imgData, setImgData] = useState([])

    const handleClickDelete = async (e, imageId) => {
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

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/images`
                )
                setImgData(response.data)
            } catch (error) {
                console.error('Error fetching images:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchImages()
    }, [])

    const handleImgChange = async (e) => {
        e.preventDefault()
        setIsLoadingImage(true)

        if (e.target.type === 'file') {
            const file = e.target.files[0]
            const formData = new FormData()

            // Append the file to the FormData object
            formData.append('file', file)
            formData.append('imagetype', e.target.id) // hardcoded - change to proper banner type

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_LOCAL : import.meta.env.VITE_API_URL}/api/upload-image`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                setImgData((prevData) => [...prevData, response.data.image])
            } catch (error) {
                console.error('Error uploading image:', error)
            } finally {
                setIsLoadingImage(false)
            }
        }
    }

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
                        className="relative space-y-4 py-4 md:space-y-6"
                        action="#"
                    >
                        <div className="sticky top-[60px] z-20 flex items-center justify-between bg-white py-4 lg:top-0">
                            <h1 className="mb-4 text-3xl font-bold">Images</h1>

                            {/* <Button text={'Save'} btnType={'submit'} /> */}
                        </div>
                        <div className="space-y-7">
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-semibold">
                                    Banner Slide Show
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {imgData
                                        .filter(
                                            (img) => img.imagetype === 'header'
                                        )
                                        .map((img) => (
                                            <Image
                                                key={img.cdnid}
                                                imgSrc={img.imagepath}
                                                ratio="aspect-20x9"
                                                className="w-96"
                                                handleClickDelete={
                                                    handleClickDelete
                                                }
                                                imgCdnId={img.cdnid}
                                                isLoading={isLoadingImage}
                                                isDeleting={isDeletingImage}
                                            />
                                        ))}

                                    <Input
                                        handleChange={handleImgChange}
                                        id="header"
                                        isUploadImage={true}
                                        containerClassName={'w-96'}
                                        imgUploadContainerClassName={
                                            '!aspect-20x9 !h-full'
                                        }
                                        isLoading={isLoadingImage}
                                        isDeleting={isDeletingImage}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg font-semibold">
                                    Banner Footer
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {imgData
                                        .filter(
                                            (img) => img.imagetype === 'footer'
                                        )
                                        .map((img) => (
                                            <Image
                                                key={img.cdnid}
                                                imgSrc={img.imagepath}
                                                ratio="aspect-20x9"
                                                className="w-96"
                                                handleClickDelete={
                                                    handleClickDelete
                                                }
                                                imgCdnId={img.cdnid}
                                                isLoading={isLoadingImage}
                                                isDeleting={isDeletingImage}
                                            />
                                        ))}
                                    {imgData.filter(
                                        (img) => img.imagetype === 'footer'
                                    ).length > 0 ? (
                                        ''
                                    ) : (
                                        <Input
                                            handleChange={handleImgChange}
                                            id="footer"
                                            isUploadImage={true}
                                            containerClassName={'w-96'}
                                            imgUploadContainerClassName={
                                                '!aspect-20x9 !h-full'
                                            }
                                            isLoading={isLoadingImage}
                                            isDeleting={isDeletingImage}
                                        />
                                    )}
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
