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
        console.log("Dispatch and Navigate called");
        dispatch(handleLogin());
        dispatch(handleUserData(userData));
        return navigate("/");
      } else if (id === "signin") {
        dispatch(handleUserAlreadyLogIn());
        console.log(currentUser);
        return;
      } else {
        dispatch(handleCreateUser());
        console.log(currentUser);
        return;
      }
    } else {
      dispatch(handleCreateUser());
      return;
    }
  } catch (error) {
    console.error("Error in handleUserExites:", error);
  }
}
