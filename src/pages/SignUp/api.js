import { BASE_LOCAL_URL } from "../../constants";


const registerUser = async (name, email, password) => {
  // Set headers with dynamic token
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Set the body with dynamic data (name, email, password)
  const raw = JSON.stringify({
    name: name,
    email: email,
    password: password
  });

  // Configure request options
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    // Send request and handle the response
    const response = await fetch(`${BASE_LOCAL_URL}/user/register`, requestOptions);
    const result = await response.json()

    if (response.status === 201) {
      result.isSuccess = true;
    } else {
      result.isSuccess = false;
    }
    return result;
  } catch (error) {
    console.error('Error: ', error);
    return { isSuccess: false, message: error.message };
  }
};


export default registerUser;