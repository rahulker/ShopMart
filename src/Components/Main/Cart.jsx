import { useSelector } from "react-redux";
import CartItem from "../Custom/CartItem";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.items);
  let total = 0;
  cartData.map((item) => (total += item.price * item.quantity));

  return (
    <section className="mt-10">
      <h2 className="lg:text-4xl text-lg sm:text-xl  font-semibold">
        Your Cart
      </h2>
      <div className="mt-10">
        {cartData.length <= 0 ? (
          <p className="text-center text-gray-500 text-xl">
            Your Cart is Empty
          </p>
        ) : (
          <>
            <div className="flex items-start gap-5 flex-col">
              {cartData.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </div>
            <div className="mt-10 border-t text-right pt-4 pr-4">
              <p>
                <span className="text-gray-600">Total Price: ${total}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
