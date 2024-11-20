import React from "react";
import { useState } from "react";
import { addLaunchFav } from "../../api/backend_calls";
import { useNavigate } from "react-router-dom";

export const FavoriteButton = ({launchID}, isLoggedin) => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleUnFav = () => {

        
        // try{
        //     const response = addLaunchFav(launch.id);
        //     console.log(response);
        //     if(response.error === "Unauthorized: Please log in."){
        //         nav('/login');
        //     };
        // } catch (err){
        //     console.error(err.message);
        // };
    };
    const handleFav = async () => {
        try{
            const response = await addLaunchFav(launchID);
            console.log(response);
            if(response.error){
                return navigate('/login');
            }
            return setIsClicked(true);

            
        } catch (err){
            console.error(err.message);
        };
    };
    


    return (
        isClicked ? 
        <a className="card-fav-btn" onClick={() => handleUnFav()}>&#9829;</a> :
        <a className="card-fav-btn" onClick={() => handleFav()}>&#9825;</a>
        
    );
}