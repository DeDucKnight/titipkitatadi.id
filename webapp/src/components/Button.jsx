import Icon from './Icons'
import { Link } from 'react-router-dom'

const Button = ({
    isLink,
    type = 'primary',
    text,
    urlTarget = '#',
    iconName,
    iconWidth = 20,
    onClick,
    btnWidth = 'w-auto',
    isPill,
    className = '',
    btnTextClass = '',
    style,
    openNewTab,
    disabled,
    children,
    onMouseEnter,
    onMouseLeave,
    btnType,
    isSubmitting = false,
}) => {
    let btnStyle = `relative flex gap-2 items-center justify-center text-center text-sm font-medium transition-all ease-linear focus-visible:ring-offset-0 ${btnWidth} `
    switch (type) {
        case 'primary':
            btnStyle += `${disabled || isSubmitting ? '!bg-gray-100 pointer-events-none !text-gray-400' : ''} px-5 py-2.5 bg-primary-500 text-white hover:bg-gray-700 focus:outline-none `
            break
        case 'outline':
            btnStyle += `${disabled || isSubmitting ? '!bg-gray-100 pointer-events-none !text-gray-400' : ''} px-5 py-2.5 hover:bg-gray-300 border border-primary-500 text-primary-500 `
            break
        case 'link':
            btnStyle += `${disabled || isSubmitting ? 'pointer-events-none !text-gray-400' : 'text-primary-500'} btn-link`
            break
    }

    if (isPill) btnStyle += 'rounded-full '

    btnStyle += ` ${className}`

    const handleLinkClick = (e) => {
        const overlayElement = document.getElementById('drawer_overlay')
        if (overlayElement) {
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            })
            overlayElement.dispatchEvent(event)
        }
    }

    return (
        <>
            {isLink ? (
                <Link
                    to={urlTarget}
                    className={btnStyle}
                    style={style}
                    target={openNewTab ? '_blank' : ''}
                    onClick={handleLinkClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {iconName && (
                        <span>
                            <Icon name={iconName} width={iconWidth} />
                        </span>
                    )}
                    {text && (
                        <span
                            className={`btn-text tracking-widest focus-visible:ring-offset-0 ${btnTextClass}`}
                        >
                            {text}
                        </span>
                    )}
                    {children}
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className={btnStyle}
                    style={style}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    type={btnType}
                >
                    {isSubmitting && (
                        <div className="pointer-events-none absolute inset-0 top-0 flex items-center justify-center bg-opacity-30">
                            {' '}
                            <div className="spinner-loader !w-6 !p-1"></div>
                        </div>
                    )}
                    {iconName && (
                        <span className={`${isSubmitting ? 'opacity-0' : ''}`}>
                            <Icon name={iconName} width={iconWidth} />
                        </span>
                    )}
                    {text && (
                        <span
                            className={`${isSubmitting ? 'opacity-0' : ''} ${
                                type === 'link'
                                    ? `btn-text tracking-widest focus-visible:ring-offset-0 ${btnTextClass}`
                                    : 'tracking-wider'
                            }`}
                        >
                            {text}
                        </span>
                    )}
                    {children}
                </button>
            )}
        </>
    )
}

export default Button
