import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SearchItem = ({ item, dispacth, handleShowModal }) => {
  return (
    <NavLink
      to={`/product/${item.id}`}
      key={item.id}
      onClick={() => dispacth(handleShowModal())}
      className="mt-5 border-black border py-2 px-4 rounded-lg grid grid-cols-[10%_auto] gap-5 hover:shadow-lg hover:transition-shadow"
    >
      <img src={item.image} alt={item.title} className=" object-contain" />
      <div>
        <h2 className="text-md">{item.title}</h2>
        <p className="text-md"> category: {item.category}</p>
        <p className="text-md"> price: ${item.price}</p>
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
