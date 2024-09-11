import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import axios from 'axios'
import Skeleton from '../components/Skeleton'

const Users = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const handleOnChange = () => {}

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users`
            )
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setIsLoading(false)
        }
    }
    const handleDelete = async (admin) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/admin/${admin.userid}`
            )
            debugger
            if (response.status >= 200 && response.status < 300) {
                fetchUsers()
            }
        } catch (error) {
            console.error('Error fetching users:', error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchUsers()
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
                        <h1 className="mx-4 mb-4 text-3xl font-bold">Users</h1>

                        <Button
                            text={'Add User'}
                            isLink={true}
                            urlTarget={'./user'}
                        />
                    </div>
                    <table className="top-0 z-10 min-w-full bg-white">
                        <thead className="sticky top-0 z-10 whitespace-nowrap bg-gray-100">
                            <tr className="top-0 z-10">
                                <th className="top-0 z-10 p-4 text-left text-xs font-semibold text-gray-800">
                                    User Name
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
                            {users.map((item, index) => (
                                <tr
                                    className="hover:bg-gray-50"
                                    key={item.userid}
                                >
                                    <td className="p-4 text-gray-800">
                                        <p>{item.username}</p>
                                    </td>
                                    <td className="p-4 text-gray-800">
                                        <p>{item.useremail}</p>
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

export default Users
