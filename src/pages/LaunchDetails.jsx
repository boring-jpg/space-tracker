import {useState, useEffect} from "react";
import getLaunchData from "../api/lldev_calls.js";
import Countdown from "./LaunchCards/Countdown.jsx";
import Loading from "./loading.jsx";

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

  if (isLoading) return <Loading />;

  return (
    <main className="launch-detail">
      <section className="launch-detail-info">
        {launchDetail?.image?.thumbnail_url ? (
          <img
            src={launchDetail.image.thumbnail_url}
            alt={launchDetail.image.name || "Launch Image"}
            className="launch-detail-info-image"
          />
        ) : (
          <p>No image available</p>
        )}
        <div className="launch-detail-info-text">
          <h1>{launchDetail?.name.split("|")[0]}</h1>
          <Countdown net={launchDetail.net} />
          <p className="launch-detail-info-text-wiki">
            <a href={launchDetail.pad.wiki_url} >Pad {launchDetail.pad.name}</a>
          </p>
          <p>{launchDetail.pad.location.name}</p>
        </div>
        <div className="launch-detail-info-location">
          <a href={launchDetail.pad.map_url} target="_blank">
            <img
              src={launchDetail.pad.map_image}
              alt={"map of" + launchDetail.pad.location.name}
              className="launch-detail-info-location-image"
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
            <p>{launch.launch_service_provider.name}</p>
          </div>
        ))}
      </section>      
    </main>
  );
}

export default LaunchDetails;
