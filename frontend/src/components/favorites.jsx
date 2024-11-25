import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Countdown from "./utility/Countdown.jsx";
import Loading from "./utility/loading.jsx";
import {changeTitle} from "./utility/changeTitle.js";
import Pagination from "./utility/Pagination.jsx";

import React from "react";
import { FavoriteButton } from "./utility/favoriteBtn.jsx";
import { getUsersFavLaunch} from "../api/backend_calls.js";

function Favorites() {
  const [launchData, setLaunchData] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);

  useEffect(() => {
    const getFavorites = async () => {
      try{
        const data = await getUsersFavLaunch();
        return data;
      }catch(e){
        console.error(e);
      }
    };

    const fetchLaunchData = async () => {
      try {
        setIsLoading(true);
        const favoriteList = await getFavorites();
        setPostPerPage(6);
        changeTitle("Space-Tracker" + " | " + "Loading...");
        setFavoriteList(favoriteList?.results || favoriteList);
        setLaunchData(favoriteList?.results || favoriteList);
        changeTitle("Space-Tracker | Favorites");
      } catch (err) {
        console.error(err);
        if(err === "No ID's were provided."){
            setNoFavorites(true);
        };
      } finally {
        setIsLoading(false);
      }
    };
    fetchLaunchData();
  }, []);

  if (isLoading) return <Loading />;


  console.log(launchData)
 
  if(launchData.length === 0) {
    return (
      <main className="no-favorites">
        <h1 >No Favorites Found</h1>
      </main>
  );
  }

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = launchData.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <main className="launches">
        {launchData.length > postPerPage && (
          <Pagination
            totalPosts={launchData.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}


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
              <FavoriteButton launchID={launch.id} favoriteList={favoriteList} />
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
        {launchData.length > postPerPage && (
          <Pagination
            totalPosts={launchData.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}

      </main>
    </>
  );
}

export default Favorites;
