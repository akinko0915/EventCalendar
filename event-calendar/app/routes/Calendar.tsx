import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import CalendarModal from "./calendar-modal";

export type CalendarEvent = {
  title: {
    name: string;
  };
  category: {
    color: string;
  };
  startAt: string;
  endAt: string;
  place: string;
  fee: number;
  description: string;
  imageUrl: string;
};

type CalendarProps = {
  events: CalendarEvent[];
};

const Calendar: React.FC<CalendarProps> = forwardRef(({ events }, ref) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

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

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();

      calendarApi.setOption("eventClick", function (info) {
        setSelectedEvent(info.event.extendedProps as CalendarEvent);
      });
    }
  }, []);

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        height="auto"
        plugins={[interactionPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={events.map((event) => ({
          title: event.title.name,
          date: event.startAt,
          color: event.category.color,
          extendedProps: event,
        }))}
        eventTextColor="#FFFFF"
      />
      {selectedEvent && (
        <CalendarModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
});

export default Calendar;
