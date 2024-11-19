const backendURL = "http://localhost:3001/api";

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
      credentials: 'include',
    })

    const data = await response.json()
    return data;
  } catch(e){
    console.error(e.message);
  }
}
  