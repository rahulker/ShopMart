import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router";
import { handleSingleFetch } from "../../constant/http";
import {
  handleAddToCart,
  handleAlertMessage,
  handleMakeAlert,
} from "../../Store/Store";
import Button from "../Custom/Button";
import { useDispatch } from "react-redux";
import Card from "../Custom/Card";
const ProductDetails = () => {
  const { id } = useParams();
  const dispactch = useDispatch();
  let res = useRouteLoaderData("root");
  const [singleData, setSingleData] = useState({});
  const [suggest, setSuggest] = useState([]);
  useEffect(() => {
    function handleSuggest() {
      let shuffledRes = res
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setSuggest(shuffledRes);
    }
    handleSuggest();
  }, [singleData, res]);

  useEffect(() => {
    async function fetchedData() {
      let respone = await handleSingleFetch(id);
      setSingleData(respone);
    }
    fetchedData();
  }, [id]);
  function handleAddToCartItem(data) {
    dispactch(handleAddToCart(data));
    dispactch(handleMakeAlert());
    dispactch(handleAlertMessage("Successfuly add to cart"));
  }
  return (
    <div className="mt-10">
      <div className="grid xl:grid-cols-[20%_40%] lg:grid-cols-[20%_60%] grid-cols-1 lg:gap-14 gap-4 items-center justify-center">
        <div>
          <img
            src={singleData?.image}
            alt={singleData?.title}
            className="w-1/2 sm:w-[40%] mx-auto lg:w-auto"
          />
        </div>
        <div>
          <h2 className="md:text-2xl text-lg font-medium">
            {singleData?.title}
          </h2>
          <div className="flex flex-col md:flex-row lg:items-start xl:items-center md:items-center lg:flex-col xl:flex-row lg:gap-2 xl:gap-20 md:mt-5 mt-2.5 gap-1.5 sm:gap-3.5 md:gap-4">
            <p className="md:text-xl">Category: {singleData?.category}</p>
            <p className="md:text-xl">price: ${singleData?.price}</p>
          </div>
          <div className="mt-5">
            <p className="md:text-base text-sm text-left w-auto ">
              {singleData?.description}
            </p>
          </div>
          <div className="lg:mt-10 mt-4">
            <Button
              text="Buy Now"
              onClick={() => handleAddToCartItem(singleData)}
            />
          </div>
        </div>
      </div>
      <div className="md:mt-20 mt-5">
        <h2 className="lg:text-4xl text-lg sm:text-xl  font-semibold">
          Suggested product
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 justify-between justify-items-center mt-5 ">
          {suggest.slice(0, 4).map((item) => {
            return <Card item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
