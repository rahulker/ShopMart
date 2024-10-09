import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BuyNowData from "../Custom/BuyNowData";
import Button from "../Custom/Button";
import {
  handleRemoveCartDataBuy,
  handleRemoveSingleBuyItem,
} from "../../Store/Store";

const BuyNow = () => {
  const isLogin = useSelector((state) => state.isLogin);
  const userData = useSelector((state) => state.userData.userDetail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyNowData = useSelector((state) => state.buyNowData);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate, isLogin]);
  const isArray = Array.isArray(buyNowData);
  let totalPrize = isArray
    ? buyNowData.reduce((total, item) => total + item.price * item.quantity, 0)
    : buyNowData.price;
  let content = isArray ? (
    buyNowData.map((item) => (
      <BuyNowData item={item} key={item.id} data={isArray} />
    ))
  ) : (
    <BuyNowData item={buyNowData} data={isArray} />
  );
  function buyCart() {
    alert("Payment successful");
    dispatch(handleRemoveCartDataBuy());
    navigate("/");
  }

  function handleBuySingleItem(data) {
    alert("Payment successful");
    dispatch(handleRemoveSingleBuyItem(data));
    navigate("/");
  }

  return (
    <>
      <section className="mt-10 hidden lg:block lg:mx-[50px] mx-[20px]">
        <div className="grid grid-cols-[60%_auto] gap-5">
          <div>
            {isArray && <h2 className="mb-2 text-xl">List of product</h2>}
            <div className="flex items-center flex-col gap-4 max-h-[600px] overflow-y-scroll">
              {content}
            </div>
          </div>
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
            <div className="flex items-center gap-5 ml-4 mt-8">
              <p>Total Price: ₹{totalPrize.toFixed(2)}</p>
              <Button
                text="Pay Now"
                onClick={
                  isArray
                    ? () => {
                        buyCart();
                      }
                    : () => {
                        handleBuySingleItem(buyNowData);
                      }
                }
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 lg:hidden lg:mx-[50px] mx-[20px]">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <h2 className="text-2xl">Deliver To:</h2>
            <div className="mt-4">
              <p className="text-lg capitalize">Name: {userData.name}</p>
              <p className="text-lg capitalize mt-2">
                Phone number: {userData.phoneNum}
              </p>
              <p className="text-lg mt-2">Email: {userData.email}</p>
              <p className="text-lg mt-2">Address: {userData.address}</p>
            </div>
            <div className="flex sm:items-center items-start flex-col sm:flex-row gap-2.5 sm:gap-5 sm:mt-4 mt-2 md:mt-8">
              <p>Total Price: ₹{totalPrize.toFixed(2)}</p>
              <Button
                text="Pay Now"
                onClick={
                  isArray
                    ? () => {
                        buyCart();
                      }
                    : () => {
                        handleBuySingleItem(buyNowData);
                      }
                }
              />
            </div>
          </div>
          <div>
            {isArray && <h2 className="mb-2 text-xl">List of product</h2>}
            <div
              className={`grid items-center grid-cols-1 ${
                isArray ? "sm:grid-cols-2" : ""
              }  gap-4 max-h-[600px] overflow-y-scroll`}
            >
              {content}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BuyNow;
