import { useSelector } from "react-redux";

const Counter = () => {
  const types = useSelector((state) => state.types);
  console.log(types);
  return (
    <>
      {Object.keys(types).map((key) => (
        <div
          id={key}
          className={`mb-1 mr-2 h-fit rounded-xl px-2 py-1 text-xs bg-${types[key].color}-50 text-${types[key].color}-800  tracking-wider`}
        >
          {key} {types[key].count} 
        </div>
      ))}
    </>
  );
};
export default Counter;
