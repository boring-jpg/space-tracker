import {useState, useEffect} from "react";
import {getLaunchData} from "../api/lldev_calls.js";
import Countdown from "./utility/Countdown.jsx";
import Loading from "./utility/loading.jsx";
import {changeTitle} from "./utility/changeTitle.js";
import React from "react";

function LaunchDetails() {
  const [launchDetail, setLaunchDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLaunchData = async () => {
      try {
        changeTitle("Space-Tracker" + " | " + "Loading...");
        const launchId = window.location.pathname.split("/")[2];
        const data = await getLaunchData(launchId);
        setLaunchDetails(data);
        changeTitle("Space-Tracker" + " | " + data.name);
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
        <div className="launch-detail-info-text">
          {launchDetail?.image?.thumbnail_url ? (
            <img
              src={launchDetail.image.thumbnail_url}
              alt={launchDetail.image.name || "Launch Image"}
              className="launch-detail-info-text-image"
            />
          ) : (
            <p>No image available</p>
          )}
          <h1>{launchDetail?.name.split("|")[0]}</h1>
          <Countdown net={launchDetail.net} />
          <a href={launchDetail.pad.map_url} target="_blank">
            <img
              src={launchDetail.pad.map_image}
              alt={"map of " + launchDetail.pad.location.name}
              className="launch-detail-info-location-image"
            ></img>
          </a>
          <span>
            <p className="launch-detail-info-text-wiki">
              <a href={launchDetail.pad.wiki_url}>Pad {launchDetail.pad.name}</a>
            </p>
            <p className="launch-detail-info-text-location">
              {launchDetail.pad.location.name}
            </p>
          </span>
        </div>

        {launchDetail.vid_urls
          .filter((url) => url.url.includes("youtube.com"))
          .slice(0, 1)
          .map((url) => (
            <div className="launch-detail-video" key={url.url}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${url.url.split("v=")[1]}`}
                title={url.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}

        <div className="launch-detail-mission">
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
        </div>
      </section>
    </main>
  );
}

export default LaunchDetails;
