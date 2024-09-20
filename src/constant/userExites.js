import { handleGetUser } from "./http";
import {
  handleUserAlreadyLogIn,
  handleUserData,
  handleLogin,
  handleCreateUser,
} from "../Store/Store";
export async function handleUserExites(id, userData, dispatch, navigate) {
  try {
    const allUsers = await handleGetUser();
    const currentUser = allUsers.filter(
      (item) => item.email === userData.email
    );
    if (currentUser.length > 0) {
      if (id === "login") {
        if (currentUser[0].email === userData.email) {
          console.log("Dispatch and Navigate called");
          dispatch(handleUserData(currentUser[0]));
          dispatch(handleLogin());
          navigate("/user");
          return;
        } else {
          dispatch(handleCreateUser());
          return true;
        }
      }
      if (id === "signin") {
        if (currentUser[0].email === userData.email) {
          console.log("Dispatch and Navigate called:", id);
          dispatch(handleUserAlreadyLogIn());
          console.log("hello");
          return true;
        } else {
          console.log("Dispatch and Navigate called");
          dispatch(handleCreateUser());
          return false;
        }
      }
    } else {
      console.log("Dispatch and Navigate called");
      dispatch(handleCreateUser());
      return;
    }
  } catch (error) {
    console.error("Error in handleUserExites:", error);
  }
}
