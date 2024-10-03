import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Custom/CartItem";
import Button from "../Custom/Button";
import { handleCartBuyNow } from "../../Store/Store";
const Cart = () => {
  const cartData = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  let total = 0;
  cartData.map((item) => (total += item.price * item.quantity), 0);
  function handleBuyNow(data) {
    dispatch(handleCartBuyNow(data));
  }

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
            <div className="mt-10 border-t  pt-4 pr-4 flex items-center justify-end gap-5">
              <Button
                text="Buy Now"
                className="py-2"
                isLinks
                otherLink
                link="/buy-now"
                onClick={() => handleBuyNow(cartData)}
              />
              <p>
                <span className="text-gray-600">
                  Total Price: ₹{total.toFixed(2)}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
