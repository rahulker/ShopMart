import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import Card from "../Custom/Card";
import { getAllCatagory } from "../../constant/http";
import { FaAngleDown } from "react-icons/fa6";

const Product = () => {
  let newData = [];
  const data = useLoaderData();
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
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Product</h2>
        <div className="border px-2 gap-2 py-2 border-black rounded-lg w-auto flex items-center">
          <select onChange={handleCategoryChange} className="w-full">
            <option>All</option>
            {allCategory.getCatagorys.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <FaAngleDown />
        </div>
      </div>
      <div className="grid grid-cols-[300px_300px_300px_300px] gap-10 justify-between justify-items-center grid-rows-2 mt-5 2xl:grid-cols-5">
        {newData.length > 0
          ? newData.map((item) => <Card item={item} key={item.id} />)
          : data.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </section>
  );
};

export default Product;
