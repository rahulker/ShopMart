import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, LogIn, Product, ProductDetails, Cart } from "./Components/Main";
import { handleProductData as loaderHomeData } from "./constant/http";
import Root from "./Components/Main/Root";
import SignIn from "./Components/Main/SignIn";
const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: () => loaderHomeData(),
      id: "root",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/product",
          element: <Product />,
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
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/user",
          element: <Cart />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
