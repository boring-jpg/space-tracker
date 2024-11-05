import {useState, useEffect} from "react";
import getLaunchData from "../api/lldev_calls";
import Countdown from "./LaunchCards/Countdown.jsx";

function LaunchDetails() {
  const [launchDetail, setLaunchDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLaunchData = async () => {
      try {
        const launchId = window.location.pathname.split("/")[2];
        const data = await getLaunchData(launchId);
        console.log(data);
        setLaunchDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaunchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="launch-detail-container">
      <section className="lauch-info">
        {launchDetail?.image?.thumbnail_url ? (
          <img
            src={launchDetail.image.thumbnail_url}
            alt={launchDetail.image.name || "Launch Image"}
          />
        ) : (
          <p>No image available</p>
        )}
        <h1>{launchDetail?.name.split("|")[0]}</h1>
        <p>
          Date: <Countdown net={launchDetail.net} />
        </p>
      </section>
      <section className="launch-mission">
        <h2>Mission: {launchDetail.mission.name}</h2>
        <p>{launchDetail.mission.description || "No mission info provided"}</p>
        {launchDetail.mission.agencies.map((agency, index) => (
          <div className="launch-agency" key={index}>
            <img
              src={agency.logo?.image_url || "No logo image provided"}
              alt={agency.logo?.name || "logo image"}
            ></img>
            <p>
              <a href={agency.url}>Name: {agency.name}</a>
            </p>
            <p>{agency.description}</p>
            <p></p>
          </div>
        ))}
      </section>

      <section className="launch-video">
        {/* Display's firsy available youtube video to ensure an embedded video */}
        {launchDetail.vid_urls
          .filter((url) => url.url.includes("youtube.com"))
          .slice(0, 1)
          .map((url) => (
            <div key={url.url}>
              <h3>{url.title}</h3>
              <p>{url.description}</p>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${url.url.split("v=")[1]}`}
                title={url.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}

        {/* Displays Official Video if available */}
        {launchDetail.vid_urls
          .filter((url) => url.type.name.startsWith("Official"))
          .map((url) => (
            <div key={url.url}>
              <h3>{url.title}</h3>
              <p>{url.description}</p>
              <a href={url.url} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          ))}
      </section>
    </div>
  );
}

export default LaunchDetails;
