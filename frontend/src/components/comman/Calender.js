// import classes from "./comman.module.css";
import {
  add,
  sub,
  differenceInDays,
  endOfMonth,
  startOfMonth,
  format,
  setDate,
} from "date-fns";
import Cell from "./Cell.js";

const Calender = ({ changeCurrentDate, currentDate = new Date() }) => {
  const StartDay = startOfMonth(currentDate);
  const EndDay = endOfMonth(currentDate);
  const noOfDays = differenceInDays(EndDay, StartDay) + 1;

  const prefixDays = StartDay.getDay();
  const suffixDays = 6 - EndDay.getDay();
  const preMonth = () => {
    changeCurrentDate(sub(currentDate, { months: 1 }));
  };
  const nextMonth = () => {
    changeCurrentDate(add(currentDate, { months: 1 }));
  };
  const preYear = () => {
    changeCurrentDate(sub(currentDate, { years: 1 }));
  };
  const nextYear = () => {
    changeCurrentDate(add(currentDate, { years: 1 }));
  };

  const setCurrentDate = (date) => {
    const newdate = setDate(currentDate, date);
    changeCurrentDate(newdate);
  };
  const daysofweeks = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  return (
    < >
      <h1> Calender</h1>
      <div>{format(currentDate, "dd LLLL yyyy")}</div>
      <div class="h-5/6 w-5/6 border-l border-t  border-black bg-slate-100 text-black">
        <div className="grid h-full w-full grid-cols-7">
          <Cell onClick={preYear}>{"<<"}</Cell>
          <Cell onClick={preMonth}>{"<"}</Cell>
          <Cell className="col-span-3">{format(currentDate, "LLLL yyyy")}</Cell>
          <Cell onClick={nextMonth}>{">"}</Cell>
          <Cell onClick={nextYear}>{">>"}</Cell>
          {daysofweeks.map((day) => {
            return <Cell>{day}</Cell>;
          })}
          {Array.from({ length: prefixDays }).map((_, index) => {
            return <Cell key={index}></Cell>;
          })}
          {Array.from({ length: noOfDays }).map((_, index) => {
            const date = index + 1;
            const isActive = currentDate.getDate() === date;
            return (
              <Cell isActive={isActive} onClick={() => setCurrentDate(date)}>
                {date}
              </Cell>
            );
          })}

          {Array.from({ length: suffixDays }).map((_, index) => {
            return <Cell key={index}></Cell>;
          })}
        </div>
      </div>
</>
  );
};

export default Calender;
