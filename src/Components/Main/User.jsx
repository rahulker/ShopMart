import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const User = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  return <div>User</div>;
};

export default User;
