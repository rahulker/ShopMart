import { Link, useRouteLoaderData } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import Card from "../Custom/Card";
const Home = () => {
  const data = useRouteLoaderData("root");
  return (
    <section className="mt-10">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Feature Products</h2>
          <Link
            to="/product"
            className="flex items-center  gap-1.5 hover:font-semibold transition-all"
          >
            View More
            <FaLongArrowAltRight />
          </Link>
        </div>
        <div className="grid grid-cols-[300px_300px_300px_300px] gap-10 justify-between justify-items-center grid-rows-2 mt-5">
          {data.slice(0, 8).map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
