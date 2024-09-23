import React, { useState, useEffect } from 'react'
import Switch from '../components/Switch'
import Button from '../components/Button'
import axios from 'axios'
import Skeleton from '../components/Skeleton'
import Input from '../components/Input'

const Widgets = () => {
    const [widgets, setWidgets] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isChanged, setIsChanged] = useState(false)
    const [announcementBarValue, setAnnouncementBarValue] = useState('')
    const [initialData, setInitialData] = useState({
        announcementBarItems: [],
    })
    const [formData, setFormData] = useState({
        announcementBarItems: [],
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            //
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleAddAnnouncementBarItems = (e) => {
        e.preventDefault()
        const { value } = document.querySelector('#announcementBar')
        if (value) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                announcementBarItems: [
                    ...prevFormData.announcementBarItems,
                    value,
                ],
            }))
            setAnnouncementBarValue('')
        }
    }
    const handleDeleteAnnouncementBarItem = (announcementBarItem, index) => {
        setFormData((prevData) => ({
            ...prevData,
            announcementBarItems: prevData.announcementBarItems.filter(
                (item, i) => item !== announcementBarItem && i === index
            ),
        }))
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setIsLoading(true)
            } catch (error) {
                console.error('Error fetching images:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchImages()
    }, [])

    useEffect(() => {
        const isFormChanged =
            JSON.stringify(formData) !== JSON.stringify(initialData)
        setIsChanged(isFormChanged)
    }, [formData, initialData])

    return (
        <div className="mx-4 w-full px-4">
            {isLoading ? (
                <div className="py-4">
                    <Skeleton className="mb-7 h-7 w-3/12" />
                    <Skeleton className="mb-7 h-10 w-4/12 lg:w-3/12" />

                    <Skeleton className="mb-2 h-5 w-4/12 lg:w-2/12" />
                    <Skeleton className="mb-7 h-10 w-full" />

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
                <div className="mb-7 pb-4">
                    <form
                        className="relative h-max space-y-4 md:space-y-6"
                        action="#"
                        onSubmit={handleSubmit}
                    >
                        <div className="sticky top-0 z-20 flex items-center justify-between bg-white py-4">
                            <h1 className="mb-4 text-3xl font-bold">Widgets</h1>

                            <Button
                                text={'Save'}
                                btnType={'submit'}
                                disabled={!isChanged}
                                isSubmitting={isSubmitting}
                            />
                        </div>
                        <div className="space-y-7">
                            <Input
                                handleChange={(e) =>
                                    setAnnouncementBarValue(e.target.value)
                                }
                                id="announcementBar"
                                labelText="Announcement Bar"
                                value={announcementBarValue}
                                btnOnClick={handleAddAnnouncementBarItems}
                                btnText={'Add'}
                                btnDisabled={
                                    formData.announcementBarItems.length === 3
                                }
                            />
                            <div className="overflow-x-auto">
                                {formData.announcementBarItems.length > 0 && (
                                    <table className="min-w-full bg-white">
                                        <thead className="whitespace-nowrap bg-gray-100">
                                            <tr className="">
                                                <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                                    Announcement Bar Items
                                                </th>
                                                <th className="w-[1%] p-4 text-end text-xs font-semibold text-gray-800">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="max-h-40 overflow-auto whitespace-nowrap">
                                            {formData.announcementBarItems.map(
                                                (
                                                    announcementBarItem,
                                                    index
                                                ) => (
                                                    <tr
                                                        className="hover:bg-gray-50"
                                                        key={index}
                                                    >
                                                        <td className="p-4 text-xs text-gray-800">
                                                            {
                                                                announcementBarItem
                                                            }
                                                        </td>
                                                        <td className="w-[1%] p-4 text-xs">
                                                            <div className="inline-flex w-full items-center justify-end gap-4 text-xs">
                                                                <Button
                                                                    iconName={
                                                                        'trash'
                                                                    }
                                                                    type={
                                                                        'link'
                                                                    }
                                                                    onClick={() =>
                                                                        handleDeleteAnnouncementBarItem(
                                                                            announcementBarItem,
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Widgets
