import React, { useState, useRef, useEffect } from "react";
import Calendar from "./Calendar";
import Month from "./Month.js";
import CalendarModal from "./calendar-modal.js";

export default function Main({ events }) {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [preMonth, setPreMonth] = useState(0);
  const [nextMonth, setNextMonth] = useState(0);

  const updateAdjustMonths = () => {
    const newPreMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const newNextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    setPreMonth(newPreMonth);
    setNextMonth(newNextMonth);
  };

  useEffect(() => {
    updateAdjustMonths();
  }, [currentMonth]);

  const handleNextMonth = () => {
    calendarRef.current.next();

    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    calendarRef.current.prev();

    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handlePrevYear = () => {
    calendarRef.current.prevYear();
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    calendarRef.current.nextYear();
    setCurrentYear(currentYear + 1);
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <Month
        year={currentYear}
        month={currentMonth}
        onNext={handleNextMonth}
        onPrev={handlePrevMonth}
        onNextY={handleNextYear}
        onPrevY={handlePrevYear}
        preMonth={preMonth}
        nextMonth={nextMonth}
      />
      <Calendar events={events} ref={calendarRef} />
      <CalendarModal />
    </div>
  );
}
