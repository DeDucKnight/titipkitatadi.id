const Skeleton = ({
  className = "h-full w-full",
  items = 1,
  classContainer = "",
  style,
}) => {
  return (
    <div className="animate-pulse" style={style}>
      <div className={classContainer}>
        {(() => {
          const elements = [];
          for (let i = 0; i < items; i++) {
            elements.push(
              <div key={i} className={`${className} bg-gray-400`}></div>,
            );
          }
          return elements;
        })()}
      </div>
    </div>
  );
};

export default Skeleton;
