import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { handleSingleFetch, handleProductData } from "../../constant/http";
import { handleAddToCart } from "../../Store/Store";
import Button from "../Custom/Button";
import { useDispatch } from "react-redux";
import Card from "../Custom/Card";
const ProductDetails = () => {
  const { id } = useParams();
  const dispactch = useDispatch();
  const [singleData, setSingleData] = useState({});
  const [suggest, setSuggest] = useState([]);
  useEffect(() => {
    async function handleSuggest() {
      let res = await handleProductData(4);
      setSuggest(res);
    }
    handleSuggest();
  }, []);

  useEffect(() => {
    async function fetchedData() {
      let respone = await handleSingleFetch(id);
      setSingleData(respone);
    }
    fetchedData();
  }, [id]);
  function handleAddToCartItem(data) {
    dispactch(handleAddToCart(data));
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-[20%_40%] gap-14 items-center justify-center">
        <div>
          <img src={singleData?.image} alt={singleData?.title} />
        </div>
        <div>
          <h2 className="text-2xl font-medium">{singleData?.title}</h2>
          <div className="flex items-center gap-20">
            <p className="mt-5 text-xl">Category: {singleData?.category}</p>
            <p className="mt-5 text-xl">price: ${singleData?.price}</p>
          </div>
          <div className="mt-5">
            <p className="text-base max-w-[600px]">{singleData?.description}</p>
          </div>
          <div className="mt-10">
            <Button
              text="Buy Now"
              className="w-1/3"
              onClick={() => handleAddToCartItem(singleData)}
            />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-4xl font-semibold">Suggested product</h2>
        <div className="grid grid-cols-[300px_300px_300px_300px] gap-10 justify-between justify-items-center  mt-5">
          {suggest.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
