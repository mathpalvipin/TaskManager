const Cell = ({ children, className, onClick,isActive=false }) => {

  return (
    <div
      onClick={onClick}
      className={`${className ? className : ""}
      ${!!onClick && !isActive ?"hover:bg-blue-200":"" }
      ${isActive ?"bg-blue-400 text-white":"" }
       flex h-auto items-center justify-center border-b border-r border-black text-sm md:text-2xl xl:text-3xl `}
    >
      {children}
    </div>
  );
};
export default Cell;
