const SVG = ({
    style = {},
    width = '24',
    height = '24',
    className = '',
    strokeWidth = '2',
    viewBox = '0 0 24 24',
}) => (
    <svg
        width={width}
        style={style}
        height={width}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`svg-icon ${className || ''}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="geometricPrecision"
    >
        <path d="M6 9l6 6 6-6"></path>
    </svg>
)

export default SVG
