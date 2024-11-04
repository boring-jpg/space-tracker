import {useState, useEffect} from "react";
import getLaunchData from "../api/lldev_calls";

function LaunchDetails() {
  const [launchData, setLaunchData] = useState([]);

  useEffect(() => {
    const fetchLaunchData = async () => {
      const launchId = window.location.pathname.split("/")[2];
      console.log(launchId);
      const data = await getLaunchData(launchId);
      console.log(data);
      setLaunchData(data);
    };
    fetchLaunchData();
  }, []);
  return (
    <div>
      <h1>{launchData.name}</h1>
      <p>Date: {launchData.net}</p>
      <p>Description: {launchData.description}</p>
    </div>

    // TODO:
    // ADD MORE HTML
    // STYLE IT
  );
}

export default LaunchDetails;
