import React, { useEffect } from "react";
import { useState } from "react";
import { addLaunchFav, removeLaunchFav } from "../../api/backend_calls";
import { useNavigate } from "react-router-dom";

export const FavoriteButton = ({launchID, favoriteList}) => {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleUnFav = async () => {
        try{
            const response = await removeLaunchFav(launchID /* send is clicked?*/);
            console.log(response);
            if(response.error){
                return navigate('/login');
            }
            setIsClicked(false);
            return navigate(0);
             
        } catch (err){
            console.error(err.message);
        };
    };
    
    const handleFav = async () => {
        try{
            const response = await addLaunchFav(launchID /* send is clicked?*/);
            if(response.error){
                return navigate('/login');
            }
            setIsClicked(true);
            
        } catch (err){
            console.error(err.message);
        };
    };

    useEffect(()=>{
        
        favoriteList?.forEach(launch => {
            if(launchID === launch.id){
                setIsClicked(true);
            };
        });
    },[])



    return (
        
        isClicked ? 
        <a className="card-fav-btn" onClick={() => handleUnFav()}>&#9829;</a> :
        <a className="card-fav-btn" onClick={() => handleFav()}>&#9825;</a>
        
    );
};