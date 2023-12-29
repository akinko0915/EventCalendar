import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useRef, forwardRef, useImperativeHandle } from "react";

type Event = {
  title: {
    name: string;
  };
  startAt: string;
  category: {
    color: string;
  };
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth(); // Months are 0-based in JavaScript Date, but 1-based in FullCalendar
  const year = date.getFullYear();

  // Format: YYYY-MM-DD
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

type CalendarProps = {
  events: Event[];
};

// Use `forwardRef` to provide a ref from the parent component.
const Calendar: React.FC<CalendarProps> = forwardRef(({ events }, ref) => {
  const calendarRef = useRef<FullCalendar>(null); // Specify the type for useRef, which should match the FullCalendar instance.

  // useImperativeHandle customizes the instance value that is exposed when using ref.
  useImperativeHandle(ref, () => ({
    next() {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.next();
      }
    },
    prev() {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.prev();
      }
    },
    nextYear() {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.nextYear();
      }
    },
    prevYear() {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.prevYear();
      }
    },
  }));

  return (
    <FullCalendar
      ref={calendarRef}
      height="auto"
      plugins={[interactionPlugin, dayGridPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      events={events.map((event) => ({
        title: event.title.name,
        date: formatDate(event.startAt),
        color: event.category.color,
      }))}
      eventTextColor="#FFFFF"
    />
  );
});

export default Calendar;
