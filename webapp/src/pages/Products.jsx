import React, { useState, useEffect, useRef } from 'react'
import placeholderImg from '../assets/images/placeholder-image.jpg'
import Switch from '../components/Switch'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Skeleton from '../components/Skeleton'

const Products = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const [isLoadedAll, setIsLoadedAll] = useState(false)
    const [products, setProducts] = useState([])
    const [imgData, setImgData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const scrollRef = useRef(null)
    const tableRef = useRef(null)
    const isMounted = useRef(false)
    const isFirstLoad = useRef(true)
    const isFetchingMore = useRef(false)

    const handleOnChange = () => {}
    const tableElement = tableRef.current

    const fetchImages = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/images`
            )
            if (response.data?.length > 0) {
                // If images are present, update the state with images
                setImgData(response.data)
            } else {
                // If no images found, handle the message
                console.warn('No images found')
                // Set image data to an empty array or take further actions
                setImgData([])
            }
        } catch (error) {
            console.error('Error fetching images:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchProducts = async (page = 1) => {
            if (isFirstLoad.current) {
                try {
                    setIsLoading(true)
                    isFirstLoad.current = false
                    const response = await axios.get(
                        `${import.meta.env.VITE_API_URL}/api/products?page=${page}`
                    )
                    setProducts(response.data.products)
                    fetchImages()
                    setCurrentPage(response.data.nextPage)
                    setIsLoadedAll(!response.data.nextPage)
                } catch (error) {
                    console.error('Error fetching products:', error)
                } finally {
                    setIsLoading(false)
                    setIsLoadMore(false)
                }
            }
        }

        fetchProducts()
    }, [isFirstLoad])

    useEffect(() => {
        const element = scrollRef.current
        const containerEl = document.querySelector('#container')
        if (!element && !containerEl) return
        const handleScroll = () => {
            if (isLoadedAll) return
            const element = scrollRef.current
            const containerEl = document.querySelector('#container')
            const headerEl = document.querySelector('#sticky_header')
            if (headerEl && tableRef.current) {
                const tableRowEl = tableRef.current.querySelector('td')
                if (
                    containerEl.scrollHeight -
                        containerEl.scrollTop -
                        headerEl.offsetHeight -
                        12 <=
                        containerEl.clientHeight &&
                    !isLoadMore
                ) {
                    setIsLoadMore(true)
                }
            }
        }
        containerEl.addEventListener('scroll', handleScroll)
        return () => containerEl.removeEventListener('scroll', handleScroll) // Cleanup
    }, [isLoadMore, isLoadedAll])

    useEffect(() => {
        const tableEl = document.querySelector('#table_products')
        if (tableEl) {
            setIsLoadMore(scrollRef.current.offsetHeight > tableEl.offsetHeight)
        }
    }, [products])

    useEffect(() => {
        if (!isLoadMore) return
        const fetchProductsMore = async (page) => {
            try {
                setIsLoadingMore(true)
                isFetchingMore.current = false
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/products?page=${page}`
                )

                setProducts((prevData) => [
                    ...prevData,
                    ...response.data.products,
                ])
                setCurrentPage(response.data.nextPage)
                setIsLoadedAll(!response.data.nextPage)
                setIsLoadMore(false)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setIsLoadingMore(false)
            }
        }

        fetchProductsMore(currentPage)
    }, [isLoadMore, currentPage])

    const handleDelete = async (product) => {
        const productId = product.productid
        try {
            setIsLoading(true)
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/products/${productId}`
            )
            if (response.status === 200) {
                setProducts((prevData) =>
                    prevData.filter(
                        (product) => product.productid !== productId
                    )
                )
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative mx-4 w-full py-3" ref={scrollRef}>
            {isLoading ? (
                <div>
                    <Skeleton className="mb-4 h-9 w-4/12 lg:w-3/12" />
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
                    <div
                        className="sticky top-[60px] z-20 flex items-center justify-between bg-white py-4 lg:top-0"
                        id="sticky_header"
                    >
                        <h1 className="mx-4 mb-4 text-3xl font-bold">
                            Products
                        </h1>

                        <Button
                            text={'Add Product'}
                            isLink={true}
                            urlTarget={'./product'}
                        />
                    </div>
                    <table
                        className="top-0 z-10 min-w-full bg-white"
                        id="table_products"
                        ref={tableRef}
                    >
                        <thead className="sticky top-0 z-10 whitespace-nowrap bg-gray-100">
                            <tr className="top-0 z-10">
                                <th className="top-0 z-10 w-24 p-4 text-left text-xs font-semibold text-gray-800">
                                    Product Image
                                </th>
                                <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                                    Product Name
                                </th>
                                <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                                    Price
                                </th>
                                <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                                    Last Edited
                                </th>
                                <th className="top-0 z-10 w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                            {products.map((item, index) => (
                                <tr
                                    className="hover:bg-gray-50"
                                    key={item.productid}
                                >
                                    <td className="table-cell size-24 p-4 text-gray-800">
                                        <Link
                                            to={`/products/${item.productid}`}
                                        >
                                            <img
                                                src={
                                                    imgData.find(
                                                        (image) =>
                                                            image.imagetype.split(
                                                                '_'
                                                            )[0] ===
                                                            item.productid
                                                    )?.imagepath
                                                        ? imgData.find(
                                                              (image) =>
                                                                  image.imagetype.split(
                                                                      '_'
                                                                  )[0] ===
                                                                  item.productid
                                                          )?.imagepath
                                                        : placeholderImg
                                                }
                                                className="h-full w-full border"
                                            />
                                        </Link>
                                    </td>
                                    <td className="p-4 text-gray-800">
                                        <Button
                                            isLink={true}
                                            type={'link'}
                                            urlTarget={`/products/${item.productid}`}
                                            text={item.productname}
                                            className="!justify-start"
                                        />
                                    </td>
                                    <td className="p-4 text-gray-800">
                                        {item.price}
                                    </td>
                                    <td className="p-4 text-gray-800">
                                        {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        }).format(new Date(item.createddate))}
                                    </td>
                                    <td className="w-[1%] p-4">
                                        <div className="inline-flex w-full items-center justify-end gap-4">
                                            <Button
                                                iconName={'trash'}
                                                type={'link'}
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isLoadingMore && (
                        <div>
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
                    )}
                </>
            )}
        </div>
    )
}

export default Products
