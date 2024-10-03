import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BuyNowData from "../Custom/BuyNowData";
import Button from "../Custom/Button";

const BuyNow = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const userData = useSelector((state) => state.userData.userDetail);
  const navigate = useNavigate();
  const buyNowData = useSelector((state) => state.buyNowData);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate, isLogin]);
  const data = Array.isArray(buyNowData);
  let content;
  let totalPrize = data
    ? buyNowData.reduce((total, item) => (total = item.price * item.quantity))
    : buyNowData.price;
  if (data) {
    // content = buyNowData.map((item) => {});
  } else {
    content = <BuyNowData item={buyNowData} />;
  }
  return (
    <section className="mt-10 grid grid-cols-[60%_auto] gap-5">
      <div>{content}</div>
      <div>
        <h2 className="text-2xl">Deliver To:</h2>
        <div className="ml-4 mt-4">
          <p className="text-xl capitalize">Name: {userData.name}</p>
          <p className="text-xl capitalize mt-2">
            Phone number: {userData.phoneNum}
          </p>
          <p className="text-xl mt-2">Email: {userData.email}</p>
          <p className="text-xl mt-2">Address: {userData.address}</p>
        </div>
        <div className="flex items-center  gap-5 ml-4 mt-8">
          <p>Total Price: ₹{totalPrize}</p>
          <Button text="Pay Now" />
        </div>
      </div>
    </section>
  );
};

export default BuyNow;
