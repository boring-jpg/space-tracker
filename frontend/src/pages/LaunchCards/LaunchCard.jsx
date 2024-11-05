import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Countdown from "./Countdown.jsx";
import getLaunchData from "../../api/lldev_calls.js";

function LaunchCards() {
  const [launchData, setLaunchData] = useState([]);

  // Launch cards on initial mount.
  useEffect(() => {
    const fetchLaunchData = async () => {
      const data = await getLaunchData("upcoming");
      setLaunchData(data);
    };
    fetchLaunchData();
  }, []);

  return (
    <div className="card-container">
      {launchData.map((launch) => (
        <Link to={`/launch/${launch.id}/`} key={launch.id} className="card">
          <img
            src={launch.image.thumbnail_url}
            alt={launch.name}
            className="card-image"
          ></img>
          <h2 className="card-title card-text">
            {launch.rocket.configuration.full_name}
          </h2>
          <p className="card-company card-text">{launch.launch_service_provider.name}</p>
          <div className="card-info-container card-text">
            <Countdown net={launch.net} />
          </div>
          <p className="card-location">
            <Link to={launch.pad.wiki_url}>{launch.pad.location.name}</Link>
          </p>
        </Link>
      ))}
    </div>
  );
}

export default LaunchCards;
