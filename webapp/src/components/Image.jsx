import { Link } from 'react-router-dom'
import Button from './Button'

const Image = ({
    ratio = 'aspect-16x9',
    imgSrc,
    objectFit = 'object-cover',
    className = '',
    handleClickDelete,
    imgSource,
}) => {
    return (
        <div className="group relative">
            <img
                className={`relative ${objectFit} ${ratio} ${className}`}
                src={imgSrc}
            />
            <div
                className={`absolute inset-0 flex items-end justify-center gap-4 bg-black bg-opacity-50 pb-7 opacity-0 transition-opacity group-hover:opacity-100 ${objectFit} ${ratio} ${className}`}
            >
                <Button
                    iconName={'trash'}
                    className="!bg-white !text-primary-500"
                    onClick={(e) => handleClickDelete(e, imgSource)}
                    iconWidth={'20'}
                />
            </div>
        </div>
    )
}

export default Image
