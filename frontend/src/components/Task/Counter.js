import { useSelector } from "react-redux";
const colorVariants = {
  blue: 'bg-blue-50 text-blue-800',
  red: 'bg-red-50 text-red-800',
  green: 'bg-green-50 text-green-800',
  yellow: 'bg-yellow-50 text-yellow-800',
  purple: 'bg-purple-50 text-purple-800',

}
const Counter = () => {
  const types = useSelector((state) => state.types);
  // console.log(types);
  return (
    <>
      {Object.keys(types).map((key) => (
        <div
          id={key}
          className={`mb-1 mr-2 h-fit rounded-xl px-2 py-1 text-xs  ${colorVariants[types[key].color]}   tracking-wider`}
        >
          {key} {types[key].count} 
        </div>
      ))}
    </>
  );
};
export default Counter;
