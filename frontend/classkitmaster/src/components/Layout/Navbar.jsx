import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-purple-700 text-white p-4 shadow flex justify-between">
      <Link to="/" className="font-bold text-xl">
        ClassKit Master
      </Link>

      <div className="flex gap-4">
        <Link to="/products">Products</Link>

        <Link to="/cart" className="relative">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
              {cart.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
