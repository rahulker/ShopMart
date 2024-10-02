import { handleGetUser, handleSendData } from "./http";
import { handleUserData, handleLogin } from "../Store/Store";
export async function handleUserExites(id, userData, dispatch, navigate) {
  try {
    const allUsers = await handleGetUser();
    const currentUser =
      allUsers == null
        ? 0
        : allUsers.filter((item) => item.email === userData.email);

    if (currentUser.length > 0) {
      if (id === "login") {
        if (currentUser[0].email === userData.email) {
          dispatch(handleUserData(currentUser[0]));
          dispatch(handleLogin());
          navigate("/user");
          return false;
        } else {
          console.log("hello fail log in");
          return true;
        }
      }
    } else {
      if (id === "signin") {
        if (currentUser.length <= 0 || currentUser.email === userData.email) {
          console.log("hello fail sign up");
          return true;
        } else {
          handleSendData(userData);
          dispatch(handleUserData(userData));
          dispatch(handleLogin());
          navigate("/");
          console.log("hello sign up");
        }
      }
    }
    return true;
  } catch (error) {
    console.error("Error in handleUserExites:", error);
  }
}
