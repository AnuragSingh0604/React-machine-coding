const Event = ({ event }) => {
  function timeToNumber(time) {
    const [h, m] = time.split(":").map(Number);
    return h + m / 60;
  }

  const start = timeToNumber(event.start);
  const end = timeToNumber(event.end);

  const top = start * 5;
  const height = (end - start) * 5;

  return (
    <div
      className="event"
      style={{
        position: "absolute",
        top: `${top}rem`,
        height: `${height}rem`,
        backgroundColor: "lightblue"
      }}
    >
      <div className="timeContainer">
        <span>{event.start}</span> - <span>{event.end}</span>
      </div>
      <span>{event.title}</span>
    </div>
  );
};
export default Event;