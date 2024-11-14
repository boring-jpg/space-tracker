import {useState, useEffect} from "react";
import PropTypes from "prop-types";

function Countdown(props) {
  const [time, setTime] = useState(new Date());

  const countdownDate = new Date(props.net);
  const difference = countdownDate - time;

  // Update time every second
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Stop updating time
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const padZero = (number) => {
    return (number < 10 ? "0" : "") + number;
  };

  return difference > 0 ? (
    <p className="card-countdown">
      {" "}
      {days > 0 ? `${days} Days` : ""} T-{padZero(hours)}:{padZero(minutes)}:
      {padZero(seconds)}{" "}
    </p>
  ) : (
    <p className="card-countdown">Launched on {countdownDate.toLocaleDateString()}</p>
  );
}

Countdown.propTypes = {
  net: PropTypes.string,
};

export default Countdown;
