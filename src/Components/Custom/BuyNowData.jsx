import PropTypes from "prop-types";

const BuyNowData = ({ item, data }) => {
  return (
    <div className="sm:p-1.5 py-4 px-2.5 md:px-5 border border-black rounded-md grid  grid-cols-1 lg:grid-cols-[25%_auto]  items-center gap-10">
      <div>
        <img
          src={item?.image}
          alt={item?.title}
          className={
            data
              ? `h-48 w-48 object-contain mx-auto`
              : `h-64 w-64 object-contain mx-auto`
          }
        />
      </div>
      <div className="flex flex-col items-start gap-2.5">
        <h2 className="sm:text-xl text-lg md:text-2xl">{item?.title}</h2>
        <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-1">
          <p className="sm:text-base text-sm md:text-lg">
            Category:
            <span className="text-base capitalize"> {item?.category}</span>
          </p>
          <p className="sm:text-base text-sm md:text-lg">
            Price:
            <span className="text-base capitalize"> ₹{item?.price}</span>
          </p>
        </div>
        <p className="sm:text-base text-sm md:text-lg des max-w-[600px]">
          {item?.description}
        </p>
        <p className="sm:text-base text-sm md:text-lg sm:mt-2 mt-1">
          Quantity:{" "}
          <span className="py-1.5 text-base  px-4 rounded-xl w-12 text-center border border-black ">
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
  data: PropTypes.bool,
};
