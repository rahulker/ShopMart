import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  LogIn,
  Product,
  ProductDetails,
  Cart,
  User,
} from "./Components/Main";
import { handleProductData as loaderHomeData } from "./constant/http";
import Root from "./Components/Main/Root";
import SignIn from "./Components/Main/SignIn";
const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: () => loaderHomeData(8),
        },
        {
          path: "/product",
          element: <Product />,
          loader: () => loaderHomeData(),
        },
        {
          path: "/login",
          element: <LogIn />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
