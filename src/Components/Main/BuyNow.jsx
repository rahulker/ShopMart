import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BuyNowData from "../Custom/BuyNowData";

const BuyNow = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const buyNowData = useSelector((state) => state.buyNowData);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate, isLogin]);
  const data = Array.isArray(buyNowData);
  let content;
  if (data) {
    // content = buyNowData.map((item) => {});
  } else {
    content = <BuyNowData />;
  }
  return <section className="mt-10">{content}</section>;
};

export default BuyNow;
