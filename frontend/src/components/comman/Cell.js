const Cell = ({ children, className, onClick,isActive=false }) => {

  return (
    <div
      onClick={onClick}
      className={`${className ? className : ""}
      ${!!onClick && !isActive ?"hover:bg-primary-200":"" }
      ${isActive ?"bg-primary-500 text-white":"" }
     w-auto h-auto flex items-center justify-center rounded-full m-3 text-md `}
    >
      {children}
    </div>
  );
};
export default Cell;
