import PropTypes from "prop-types";

const BuyNowData = ({ item }) => {
  return (
    <div className="p-1.5 px-5 border border-black rounded-md grid grid-cols-[25%_auto]  items-center gap-10">
      <div>
        <img
          src={item?.image}
          alt={item?.title}
          className="h-64 w-64 object-contain"
        />
      </div>
      <div className="flex flex-col items-start gap-2.5">
        <h2 className="text-2xl">{item?.title}</h2>
        <div className="flex items-center gap-5">
          <p className="text-xl">
            Category:
            <span className="text-lg capitalize"> {item?.category}</span>
          </p>
          <p className="text-xl">
            Price:
            <span className="text-lg capitalize"> ₹{item?.price}</span>
          </p>
        </div>
        <p className="text-xl des max-w-[600px]">{item?.description}</p>
        <p className="text-xl mt-2">
          Quantity:{" "}
          <span className="py-1.5  px-4 rounded-xl w-12 text-center border border-black ">
            {item.quantity ? item.quantity : 1}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BuyNowData;

BuyNowData.propTypes = {
  item: PropTypes.object,
};
