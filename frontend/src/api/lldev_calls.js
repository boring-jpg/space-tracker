const lldevLaunches = "https://lldev.thespacedevs.com/2.3.0/launches";

export const getLaunchData = async (input) => {
  const lldevAPI = `${lldevLaunches}/${input}/?limit=41`;
  try {
    const call = await fetch(lldevAPI);
    if (!call.ok) {
      throw new Error(`error making request to ${lldevAPI}`);
    }
    const result = await call.json();

    let results;
    input === "upcoming" ? (results = result.results) : (results = result);
    return results;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const getFavLaunch = async (...items) => {
  console.log(items);
  if (items[0].length === 0) {
    const data = {};
    data.results = [];
    return data;
  }

  try {
    const lldevAPI = `${lldevLaunches}/?id=${items.join(",")}`;
    const response = await fetch(lldevAPI);

    if (!response.ok) {
      throw new Error(`Error making request to ${lldevAPI}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
