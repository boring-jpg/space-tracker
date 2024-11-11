import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Countdown from "./utility/Countdown.jsx";
import getLaunchData from "../api/lldev_calls.js";
import Loading from "./utility/loading.jsx";
import {changeTitle} from "./utility/changeTitle.js";
import Pagination from "./utility/Pagination.jsx";

function LaunchCards() {
  const [launchData, setLaunchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);

  // Launch cards on initial mount.
  useEffect(() => {
    const fetchLaunchData = async () => {
      try {
        changeTitle("Space-Tracker" + " | " + "Loading...");
        const data = await getLaunchData("upcoming");
        setLaunchData(data);
        changeTitle("Space-Tracker");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLaunchData();
  }, []);

  if (isLoading) return <Loading />;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = launchData.slice(firstPostIndex,lastPostIndex);

  return (
    <>
      <main className="launches">
      <Pagination
      totalPosts={launchData.length}
      postPerPage={postPerPage}
      setCurrentPage={setCurrentPage}
      />
        <section className="card-container">
          {currentPosts.map((launch) => (
            <Link to={`/launch/${launch.id}/`} key={launch.id} className="card">
              <img
                src={launch.image.thumbnail_url}
                alt={launch.name}
                className="card-image"
              ></img>
              <h2 className="card-title">{launch.rocket.configuration.full_name}</h2>
              <p className="card-company card-text">{launch.launch_service_provider.name}</p>
              <div className="card-text">
                <Countdown net={launch.net} />
              </div>
              <p className="card-location">
                <Link to={launch.pad.wiki_url}>{launch.pad.location.name}</Link>
              </p>
            </Link>
          ))}
        </section>
        <Pagination
      totalPosts={launchData.length}
      postPerPage={postPerPage}
      setCurrentPage={setCurrentPage}
      />
      </main>
      
    </>
  );
}

export default LaunchCards;
