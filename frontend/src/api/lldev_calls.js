const getLaunchData = async (input) => {
  const lldevAPI = `https://lldev.thespacedevs.com/2.3.0/launches/${input}/?limit=41`;
  try {
    const call = await fetch(lldevAPI);
    if (!call.ok) {
      throw new Error("Error");
    }

    const result = await call.json();

    let results;
    input === "upcoming" ? (results = result.results) : (results = result);
    return results;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default getLaunchData;
