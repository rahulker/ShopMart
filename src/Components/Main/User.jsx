import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { RxAvatar } from "react-icons/rx";

const User = () => {
  const userData = useSelector((state) => state.userData.userDetail);
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  return (
    <section className="mt-10 flex items-center flex-col">
      <div className="flex items-center flex-col gap-1.5">
        <RxAvatar size={60} />
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {userData.name}</h2>
        </div>
      </div>
    </section>
  );
};

export default User;
