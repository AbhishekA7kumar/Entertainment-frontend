import { BASE_LOCAL_URL } from "../../constants";
import { tokens } from "../../store/localstorage";

const logoutUserApi = async () => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tokens.entertainmentAppToken}`);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    // Send request and handle the response

    const response = await fetch(`${BASE_LOCAL_URL}/user/logout`, requestOptions)
    const result = await response.json();

    if (response.status === 200) {
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

export default logoutUserApi;