import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import axios from 'axios'
import Skeleton from '../components/Skeleton'

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const handleOnChange = () => {}

    const fetchCustomers = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                'http://localhost:5000/api/customers'
            )
            setCustomers(response.data)
        } catch (error) {
            console.error('Error fetching customers:', error)
        } finally {
            setIsLoading(false)
        }
    }
    const handleDelete = async (customer) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(
                `http://localhost:5000/api/customer/${customer.customerid}`
            )
            debugger
            if (response.status >= 200 && response.status < 300) {
                fetchCustomers()
            }
        } catch (error) {
            console.error('Error fetching customers:', error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchCustomers()
    }, [])
    return (
        <div className="relative mx-4 w-full py-3">
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
                    <div className="sticky top-[60px] z-20 flex items-center justify-between bg-white py-4 lg:top-0">
                        <h1 className="mx-4 mb-4 text-3xl font-bold">
                            Customers
                        </h1>

                        <Button
                            text={'Add Customer'}
                            isLink={true}
                            urlTarget={'./customer'}
                        />
                    </div>
                    <table className="top-0 z-10 min-w-full bg-white">
                        <thead className="sticky top-0 z-10 whitespace-nowrap bg-gray-100">
                            <tr className="top-0 z-10">
                                <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                                    Customer Name
                                </th>
                                <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                                    Email
                                </th>
                                <th className="top-0 z-10 w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                            {customers.map((item, index) => (
                                <tr
                                    className="hover:bg-gray-50"
                                    key={item.customerid}
                                >
                                    <td className="p-4 text-gray-800">
                                        <p>{item.customername}</p>
                                    </td>
                                    <td className="p-4 text-gray-800">
                                        <p>{item.customeremail}</p>
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
                </>
            )}
        </div>
    )
}

export default Customers
