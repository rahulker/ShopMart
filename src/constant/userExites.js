import { handleGetUser } from "./http";
import {
  handleUserAlreadyLogIn,
  handleUserData,
  handleLogin,
} from "../Store/Store";

export async function handleUserExites(userData, dispacth, navigate) {
  let responce = await handleGetUser();
  if (responce !== null) {
    let currentUser = responce?.filter((data) => data.email === userData.email);
    if (currentUser[0].email === userData.email) {
      dispacth(handleUserAlreadyLogIn());
      dispacth(handleUserData(currentUser[0]));
      dispacth(handleLogin());
      navigate("/");
      console.log(currentUser);
    } else {
      console.log("need to create user");
    }
  }
}
