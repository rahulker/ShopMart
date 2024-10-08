import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router";
import Card from "../Custom/Card";
import { getAllCatagory } from "../../constant/http";
import { FaAngleDown } from "react-icons/fa6";

const Product = () => {
  let newData = [];
  const data = useRouteLoaderData("root");
  const [allCategory, setAllCategory] = useState({
    category: "All",
    getCatagorys: [],
  });
  useEffect(() => {
    async function getCatagorys() {
      let data = await getAllCatagory();
      setAllCategory((state) => ({ ...state, getCatagorys: data }));
    }
    getCatagorys();
  }, []);

  function handleCategoryChange(e) {
    setAllCategory((state) => ({ ...state, category: e.target.value }));
  }
  if (allCategory.category != "All") {
    newData = data.filter((item) => item.category === allCategory.category);
  }

  return (
    <section className="mt-10 lg:mx-[50px] mx-[20px]">
      <div className="flex sm:items-center flex-col sm:flex-row gap-4 md:gap-0 justify-between">
        <h2 className="text-3xl font-semibold">Product</h2>
        <div className="border px-2 gap-2 py-2 border-black rounded-lg md:w-auto flex items-center w-fit">
          <select onChange={handleCategoryChange} className="w-full">
            <option>All</option>
            {allCategory.getCatagorys.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <FaAngleDown />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-10 gap-4 md:gap-4 justify-between justify-items-center grid-rows-2 mt-5 ">
        {newData.length > 0
          ? newData.map((item) => <Card item={item} key={item.id} />)
          : data.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </section>
  );
};

export default Product;
