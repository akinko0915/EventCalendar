import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";

const CalendarMonth = ({
  year,
  month,
  preMonth,
  nextMonth,
  onNext,
  onPrev,
  onNextY,
  onPrevY,
}) => {
  const boxMonth = {
    width: "300px",
  };
  const selectedMonth = {
    fontWeight: "bold",
    fontSize: "40px",
    textAlign: "center",
  };

  const otherMonth = {
    fontWeight: "bold",
    fontSize: "30px",
    textAlign: "center",
    opacity: "0.7",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  };

  const buttonStyle = {
    color: "#fff",
    fontSize: "30px",
    marginRight: "1rem",
    marginLeft: "1rem",
  };

  const yearStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={boxMonth}>
      <div style={yearStyle}>
        <button style={buttonStyle} onClick={onPrevY}>
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        <p style={selectedMonth}>{year}</p>
        <button style={buttonStyle} onClick={onNextY}>
          <FontAwesomeIcon icon={faRightLong} />
        </button>
      </div>
      <button style={otherMonth} onClick={onPrev}>
        {preMonth}
      </button>
      <h2 style={selectedMonth}>{month}</h2>
      <button style={otherMonth} onClick={onNext}>
        {nextMonth}
      </button>
    </div>
  );
};

export default CalendarMonth;
