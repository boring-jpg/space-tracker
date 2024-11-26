import { getFavLaunch } from "./lldev_calls.js";


const backendURL = "http://localhost:10000/api";

export const isAuth = async () => {
  try {
    const response = await fetch(`${backendURL}/auth/check`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      return true;
    }

    return false;
  } catch (err) {
    console.error(err.message);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${backendURL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
};

export const register = async (name, email, password) => {
  try{
    const response = await fetch(`${backendURL}/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message)
  }
};

export const logout = async () => {
  try{
    const response = await fetch(`${backendURL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if(!response.ok){
      console.error("something went wrong")
    }

    const data = await response.json()
    return data;
    
  } catch(e){
    console.error(e.message);
  }
}

export const addLaunchFav = async (launchID) => {
  try{
    const response = await fetch(`${backendURL}/launch/addFavorite`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        launchID: launchID
      })
    });

    const data = await response.json();
    return data;
  } catch (e){
    console.error(e.message);
  };
};

export const removeLaunchFav = async (launchID) => {
  try{
    const response = await fetch(`${backendURL}/launch/removeFavorite`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        launchID: launchID
      })
    });

    const data = await response.json();
    return data;
  } catch (e){
    console.error(e.message);
  };
};

export const getUsersFavLaunch = async () => {
  try {
    const response = await fetch(`${backendURL}/launch/favorites`, {
      method: 'GET',
      credentials: 'include',
    });

    const backendData = await response.json();

    if(backendData.error){
      throw new Error(`${backendData.error}`)
    }

    console.log(backendData)

    let favLaunches = []
    backendData.data.forEach(launch => {
      if(launch.launchID){
        favLaunches.push(launch.launchID);
      };
    });

    if (favLaunches === undefined){
      throw new Error("No favorites found.")
    };

    const apiCall = await getFavLaunch(favLaunches);

    return apiCall;

  } catch(e){
    console.error(e.message);
  }
};