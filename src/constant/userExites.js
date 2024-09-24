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
        if (
          currentUser[0].email === userData.email &&
          currentUser[0].pass === userData.pass
        ) {
          dispatch(handleUserData(currentUser[0]));
          dispatch(handleLogin());
          navigate("/user");
        } else {
          return true;
        }
      }
      if (id === "signin") {
        if (currentUser[0].email === userData.email) {
          return true;
        } else {
          handleSendData(userData);
          dispatch(handleUserData(userData));
          dispatch(handleLogin());
          navigate("/");
          return;
        }
      }
    } else {
      console.log(currentUser.length);
      handleSendData(userData);
      dispatch(handleUserData(userData));
      dispatch(handleLogin());
      navigate("/");
      return;
    }
  } catch (error) {
    console.error("Error in handleUserExites:", error);
  }
}
