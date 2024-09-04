const SVG = ({
  style = {},
  fill = "#202225",
  width = "24",
  height = "24",
  className = "",
  strokeWidth = "2",
  viewBox = "0 0 24 24",
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
    stroke={fill}
    fill="none"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export default SVG;
