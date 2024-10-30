import {useState, useEffect} from "react";
import Countdown from "./Countdown.jsx";

function LaunchCards() {
  const lldevAPI = "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/";
  const [launchData, setLaunchData] = useState([]);

  const getLaunchData = async () => {
    try {
      const call = await fetch(lldevAPI);
      if (!call.ok) {
        throw new Error("Error");
      }

      const result = await call.json();
      return result.results;
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  // Launch cards on initial mount.
  useEffect(() => {
    const fetchLaunchData = async () => {
      const data = await getLaunchData();
      setLaunchData(data);
    };
    fetchLaunchData();
  }, []);

  return (
    <div className="card-container">
      {launchData.map((launch) => (
        <div key={launch.id} className="card">
          <img
            src={launch.image.thumbnail_url}
            alt={launch.name}
            className="card-image"
          ></img>
          <h2 className="card-title card-text">{launch.rocket.configuration.full_name}</h2>
          <p className="card-company card-text">{launch.launch_service_provider.name}</p>
          <div className="card-info-container card-text">
            <Countdown net={launch.net} />
          </div>
          <p className="card-location">
            <a href={launch.pad.wiki_url}>{launch.pad.location.name}</a>
          </p>
        </div>
      ))}
    </div>
  );
}

export default LaunchCards;
