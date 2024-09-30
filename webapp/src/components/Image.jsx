import { Link } from 'react-router-dom'
import Button from './Button'

const Image = ({
    ratio = 'aspect-16x9',
    imgSrc,
    objectFit = 'object-cover',
    className = '',
    handleClickDelete,
    imgCdnId,
    isLoading = false,
    isDeleting = false,
    isPlaceholder,
}) => {
    return (
        <div className="group relative">
            <img
                className={`relative ${objectFit} ${ratio} ${className}`}
                src={imgSrc}
            />
            {!isPlaceholder && (
                <div
                    className={`absolute inset-0 flex items-end justify-center gap-4 bg-black bg-opacity-50 pb-7 opacity-0 transition-opacity group-hover:opacity-100 ${objectFit} ${ratio} ${className}`}
                >
                    <Button
                        iconName={'trash'}
                        className="!bg-white !text-primary-500"
                        onClick={(e) => handleClickDelete(e, imgCdnId)}
                        iconWidth={'20'}
                    />
                </div>
            )}
            {(isLoading || isDeleting) && (
                <div className="pointer-events-none absolute inset-0 top-0 flex items-center justify-center bg-black bg-opacity-30">
                    {' '}
                    <div className="spinner-loader"></div>
                </div>
            )}
        </div>
    )
}

export default Image
