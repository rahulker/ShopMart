import { handleGetUser, handleSendData } from "./http";
import {
  handleUserAlreadyLogIn,
  handleUserData,
  handleLogin,
  handleCreateUser,
} from "../Store/Store";
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
        } else {
          dispatch(handleCreateUser());
          return true;
        }
      }
      if (id === "signin") {
        if (currentUser[0].email === userData.email) {
          dispatch(handleUserAlreadyLogIn());
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
      dispatch(handleCreateUser());
      return;
    }
  } catch (error) {
    console.error("Error in handleUserExites:", error);
  }
}
