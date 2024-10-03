import Button from "./Button";
import PropTypes from "prop-types";

const Card = ({ item }) => {
  return (
    <div className="flex flex-col shadow-lg justify-between py-4 items-start border border-black rounded-lg ">
      <img
        src={item.image}
        alt={item.title}
        className="mx-auto  w-[200px] h-[200px] object-contain"
      />
      <div className="flex flex-col px-3 py-2 items-start gap-2.5">
        <h2 className="md:text-xl w-[260px] sm:w-auto text-lg des leading-[30px] ">
          {item.title}
        </h2>
        <div className="flex items-start flex-col gap-1">
          <p>Category: {item.category}</p>
          <p>Price: ₹{item.price}</p>
        </div>
        <p className="des text-sm w-[260px] sm:w-auto leading-[18px]">
          {item.description}
        </p>
        <Button isLinks id={item.id} text="View More" className=" w-full" />
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  item: PropTypes.object,
};
