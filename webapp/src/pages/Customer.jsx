import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import Icon from '../components/Icons'
import Input from '../components/Input'
import Skeleton from '../components/Skeleton'

const Cusstomer = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isChanged, setIsChanged] = useState(false)
    const { guid } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((el) => el)
    const [initialData, setInitialData] = useState([])
    const [formData, setFormData] = useState({
        customername: '',
        customeremail: '',
    })

    useEffect(() => {
        setIsLoading(false)
    }, [guid])

    useEffect(() => {
        const isFormChanged =
            JSON.stringify(formData) !== JSON.stringify(initialData)
        setIsChanged(isFormChanged)
    }, [formData, initialData])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/customer-create`,
                formData
            )
            if (response.status >= 200 && response.status < 300) {
                navigate('/customers')
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
                                                    {formData.customername}
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
                                    {formData.customername
                                        ? formData.customername
                                        : 'Add Customer'}
                                </h1>

                                <Button
                                    text={'Save'}
                                    btnType={'submit'}
                                    disabled={!isChanged}
                                />
                            </div>
                            <Input
                                id="customername"
                                labelText="Customer Name"
                                value={formData.customername}
                                handleChange={handleChange}
                            />
                            <Input
                                id="customeremail"
                                labelText="Customer Email"
                                type="email"
                                value={formData.customeremail}
                                handleChange={handleChange}
                            />
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cusstomer
