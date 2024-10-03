import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SearchItem = ({ item, dispacth, handleShowModal }) => {
  return (
    <NavLink
      to={`/product/₹{item.id}`}
      key={item.id}
      onClick={() => dispacth(handleShowModal())}
      className="lg:mt-5 mt-2 border-black border py-2 px-4 rounded-lg grid sm:grid-cols-[10%_auto] md:grid-cols-[10%_auto] grid-cols-1 gap-5 hover:shadow-lg hover:transition-shadow"
    >
      <img
        src={item.image}
        alt={item.title}
        className=" object-contain w-32 h-32 mx-auto md:w-auto md:h-auto"
      />
      <div>
        <h2 className="des md:text-md text-sm ">{item.title}</h2>
        <p className="md:text-md text-sm"> category: {item.category}</p>
        <p className="md:text-md text-sm"> price: ₹{item.price}</p>
      </div>
    </NavLink>
  );
};

export default SearchItem;
SearchItem.propTypes = {
  item: PropTypes.object,
  dispacth: PropTypes.func,
  handleShowModal: PropTypes.func,
};
