const Cell = ({ children, className, onClick,isActive=false }) => {

  return (
    <div
      onClick={onClick}
      className={`${className ? className : ""}
      ${!!onClick && !isActive ?"hover:bg-slate-300":"" }
      ${isActive ?"bg-blue-400 text-white":"" }
       flex h-auto items-center justify-center border-b border-r border-black `}
    >
      {children}
    </div>
  );
};
export default Cell;
