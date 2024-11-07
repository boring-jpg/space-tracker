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
    <main className="launch-detail-container">
      <section className="lauch-detail-info">
        {launchDetail?.image?.thumbnail_url ? (
          <img
            src={launchDetail.image.thumbnail_url}
            alt={launchDetail.image.name || "Launch Image"}
            className="launch-detail-image"
          />
        ) : (
          <p>No image available</p>
        )}
        <div className="launch-detail-info-text">
          <h1>{launchDetail?.name.split("|")[0]}</h1>
          <Countdown net={launchDetail.net} />
          <p>
            <a href={launchDetail.pad.wiki_url}>{launchDetail.pad.name}</a>
          </p>
          <p>{launchDetail.pad.location.name}</p>
        </div>
        <div className="launch-detail-info-location">
          <a href={launchDetail.pad.map_url} target="_blank">
            <img
              src={launchDetail.pad.map_image}
              alt={"map of" + launchDetail.pad.location.name}
              className="launch-details-map-image"
            ></img>
          </a>
        </div>
      </section>

      {launchDetail.vid_urls
        .filter((url) => url.url.includes("youtube.com"))
        .slice(0, 1)
        .map((url) => (
          <section className="launch-detail-video" key={url.url}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${url.url.split("v=")[1]}`}
              title={url.title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </section>
        ))}

      <section className="launch-detail-mission">
        <h2>Mission: {launchDetail.mission.name}</h2>
        <p>{launchDetail.mission.description || "No mission info provided"}</p>
        {launchDetail.mission.agencies.map((agency, index) => (
          <div className="launch-detail-agency" key={index}>
            <a href={agency.wiki_url}>
              <img
                src={agency.logo?.image_url || "No logo image provided"}
                alt={agency.logo?.name || "logo image"}
                className="launch-detail-agency-logo"
              ></img>
            </a>
          </div>
        ))}
      </section>

      
      <section className="launch-detail-update-container">
        {launchDetail.updates.map((update) => (
          <article className="launch-detail-update" key={update.id}>
            <img
              className="launch-detail-update-image"
              src={update.profile_image}
              alt={"Photo of" + update.created_by}
            ></img>
            <div className="launch-detail-update-text">
              <p>{update.comment}</p>
              <p>
                {update.created_by} | {update.created_on}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default LaunchDetails;
