import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Countdown from "./utility/Countdown.jsx";
import {getLaunchData} from "../api/lldev_calls.js";
import Loading from "./utility/loading.jsx";
import {changeTitle} from "./utility/changeTitle.js";
import Pagination from "./utility/Pagination.jsx";
import React from "react";
import { FavoriteButton } from "./utility/favoriteBtn.jsx";
import { getUsersFavLaunch} from "../api/backend_calls.js";

function LaunchCards({favorites}) {
  const [launchData, setLaunchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);

  // Launch cards on initial mount.
  useEffect(() => {
    const fetchLaunchData = async () => {
      try {
        setIsLoading(true);
        setPostPerPage(6);
        changeTitle("Space-Tracker" + " | " + "Loading...");
        if(favorites===true){
          const data = await getUsersFavLaunch();

          setLaunchData(data.results);
        }else{
          const data = await getLaunchData("upcoming");
          setLaunchData(data);
        }
        
        changeTitle("Space-Tracker");
      } catch (err) {
        console.error(err);
        return <h1>Nothig ever works</h1>;
        
      } finally {
        setIsLoading(false);
      }
    };
    fetchLaunchData();
  }, [favorites]);

  if (isLoading) return <Loading />;
  console.log(launchData);

  

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = launchData.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <main className="launches">
        <Pagination
          totalPosts={launchData.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        <section className="card-container">
          {currentPosts.map((launch) => (
            <div className="card" key={launch.id}>
                            <h2 className="card-title">{launch.rocket.configuration.full_name}</h2>
              <Link to={`/launch/${launch.id}/`} >
                <img
                  src={launch.image?.thumbnail_url}
                  alt={launch.name}
                  className="card-image"
                ></img>
              </Link>
              <FavoriteButton launchID={launch.id}/>
              <div className="card-text">
                <p className="card-company card-text">
                  {launch.launch_service_provider.name}
                </p>
                  <Countdown net={launch.net} />
                
                <p className="card-location">
                  <Link to={launch.pad.wiki_url}>{launch.pad.location.name}</Link>
                </p>
              </div>
              
            </div>
          ))}
        </section>
        <Pagination
          totalPosts={launchData.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </main>
    </>
  );
}

export default LaunchCards;
