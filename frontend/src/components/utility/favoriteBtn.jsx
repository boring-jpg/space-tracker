import React from "react";
import { useState } from "react";
import { addLaunchFav, removeLaunchFav } from "../../api/backend_calls";
import { useNavigate } from "react-router-dom";

export const FavoriteButton = ({launchID}) => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleUnFav = async () => {
        try{
            const response = await removeLaunchFav(launchID /* send is clicked?*/);
            console.log(response);
            if(response.error){
                return navigate('/login');
            }
            return setIsClicked(false);

            
        } catch (err){
            console.error(err.message);
        };
    };
    
    const handleFav = async () => {
        try{
            const response = await addLaunchFav(launchID /* send is clicked?*/);
            console.log(response);
            if(response.error){
                return navigate('/login');
            }
            return setIsClicked(true);

            
        } catch (err){
            console.error(err.message);
        };
    };

    
    /* 
    TODO: Figure out how to keep the clicked state persistant even after a reload.
    
    Store state in cookie / local storage?
    make API path and store in mongo?
    */


    return (
        isClicked ? 
        <a className="card-fav-btn" onClick={() => handleUnFav()}>&#9829;</a> :
        <a className="card-fav-btn" onClick={() => handleFav()}>&#9825;</a>
        
    );
};