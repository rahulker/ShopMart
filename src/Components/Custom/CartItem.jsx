import { useDispatch } from "react-redux";
import { handleAddToCart, handleRemoveFromCart } from "../../Store/Store";
import PropTypes from "prop-types";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  function handleAddAndDelete(identifier, data) {
    if (identifier === "Add") {
      dispatch(handleAddToCart(data));
    }
    if (identifier === "Rmv") {
      dispatch(handleRemoveFromCart(data));
    }
  }
  return (
    <div className="grid grid-cols-4 items-center   mx-auto gap-52 border border-black px-8 py-5 rounded-lg shadow-sm">
      <img
        src={item.image}
        alt={item.title}
        className="w-40 h-40 object-contain"
      />
      <div className="flex items-start gap-4 flex-col col-span-2">
        <h2 className="text-3xl font-semibold">{item.title}</h2>
        <div className="flex items-center gap-5 ">
          <p className="text-xl font-medium">category: {item.category}</p>
          <p className="text-xl font-medium">price: ${item.price}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => handleAddAndDelete("Add", item)}
          className="px-4 py-2 bg-black rounded-full text-white hover:bg-white hover:text-black border border-black transition-colors"
        >
          +
        </button>
        <p className="py-2 px-3 rounded-xl w-12 text-center border border-black ">
          {item.quantity}
        </p>

        <button
          type="button"
          onClick={() => handleAddAndDelete("Rmv", item)}
          className="px-4 py-2 bg-black rounded-full text-white hover:bg-white hover:text-black border border-black transition-colors"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.object,
};
