import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Countdown from "../utility/Countdown.jsx";
import getLaunchData from "../../api/lldev_calls.js";
import Loading from "../loading.jsx";

function LaunchCards() {
  const [launchData, setLaunchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Launch cards on initial mount.
  useEffect(() => {
    const fetchLaunchData = async () => {
      try {
        const data = await getLaunchData("upcoming");
        setLaunchData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLaunchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <main className="card-container">
      {launchData.map((launch) => (
        <Link to={`/launch/${launch.id}/`} key={launch.id} className="card">
          <img
            src={launch.image.thumbnail_url}
            alt={launch.name}
            className="card-image"
          ></img>
          <h2 className="card-text">{launch.rocket.configuration.full_name}</h2>
          <p className="card-company card-text">{launch.launch_service_provider.name}</p>
          <div className="card-text">
            <Countdown net={launch.net} />
          </div>
          <p className="card-location">
            <Link to={launch.pad.wiki_url}>{launch.pad.location.name}</Link>
          </p>
        </Link>
      ))}
    </main>
  );
}

export default LaunchCards;
