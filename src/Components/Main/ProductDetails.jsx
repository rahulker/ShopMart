import { useEffect, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router";
import { handleSingleFetch } from "../../constant/http";
import { handleAddToCart } from "../../Store/Store";
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
          {suggest.slice(0, 4).map((item) => {
            return <Card item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
