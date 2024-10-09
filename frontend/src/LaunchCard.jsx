import React, {useState, useEffect} from 'react';

function LaunchCards(){
    
    const lldevAPI = "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/"
    const [launchData, setLaunchData] = useState([]);
    
    const getLaunchData = async () => {
        try{
            const call = await fetch(lldevAPI);
            if(!call.ok){
                throw new Error("Error")
            };

            const result = await call.json()
            return result.results;

        } catch (error) {
            console.error(`Error: ${error}`);
        };
    };

    useEffect(() => {
        const fetchLaunchData = async () => {
            const data = await getLaunchData();
            setLaunchData(data);
        };
        fetchLaunchData();
    }, []);

    return (

        <div>
            {launchData.map((launch) => (
                <div key = {launch.id} className="card">
                    <img src={launch.image.image_url} alt={launch.name} className="card-image"></img>
                    <h2 className="card-title">{launch.name}</h2>
                </div>
            ))}
        
        </div>
        
    );
}

export default LaunchCards