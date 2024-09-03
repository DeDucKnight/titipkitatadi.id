import React from 'react'
import placeholderImg from '../assets/images/placeholder-image.jpg'
import Switch from '../components/Switch'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <div className="mx-4 w-full overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="whitespace-nowrap bg-gray-100">
                    <tr>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Product Image
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Product Name
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Description
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Price
                        </th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-800">
                            Last Edited
                        </th>
                        <th className="w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                    <tr className="hover:bg-gray-50">
                        <td className="p-4 text-gray-800">
                            <img
                                src={placeholderImg}
                                className="aspect-4x3 h-16"
                            />
                        </td>
                        <td className="p-4 text-gray-800">John Doe</td>
                        <td className="p-4 text-gray-800">john@example.com</td>
                        <td className="p-4 text-gray-800">Admin</td>
                        <td className="p-4 text-gray-800">2022-05-15</td>
                        <td className="w-[1%] p-4">
                            <div className="inline-flex w-full items-center justify-end gap-4">
                                <Link to={`/products/1111111`}>
                                    <Button
                                        type={'link'}
                                        iconName={'edit'}
                                        iconWidth={16}
                                    />
                                </Link>
                                <Switch />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Products
