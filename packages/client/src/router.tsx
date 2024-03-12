import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { manufacturerAuthLoader, shopAuthLoader } from './loader';
import HomePage from './pages';
import ManufacturerHomePage from './pages/manufacturer';
import ManufacturerLayout from './pages/manufacturer/layout';
import ManufacturerLoginPage from './pages/manufacturer/login';
import ManufacturerOrderPage from './pages/manufacturer/order';
import ManufacturerOrderListPage from './pages/manufacturer/orders';
import ManufacturerProductListPage from './pages/manufacturer/products';
import ShopHomePage from './pages/shop';
import ShopLayout from './pages/shop/layout';
import ShopLoginPage from './pages/shop/login';
import ManufacturerDetails from './pages/shop/manufacturerDetails';
import ManufacturerList from './pages/shop/manufacturerList';
import OrderPage from './pages/shop/order';
import OrderCompanyPage from './pages/shop/orderCompany';
('./pages/shop/manufacturerDetails');

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    element: <ManufacturerLayout />,
    children: [
      { path: '/manufacturer', element: <ManufacturerHomePage />, loader: manufacturerAuthLoader },
      { path: '/manufacturer/products', element: <ManufacturerProductListPage />, loader: manufacturerAuthLoader },
      { path: '/manufacturer/orders', element: <ManufacturerOrderListPage />, loader: manufacturerAuthLoader },
      { path: '/manufacturer/orders/:orderId', element: <ManufacturerOrderPage />, loader: manufacturerAuthLoader },
      { path: '/manufacturer/login', element: <ManufacturerLoginPage /> },
    ],
  },
  {
    element: <ShopLayout />,
    children: [
      { path: '/shop', element: <ShopHomePage />, loader: shopAuthLoader },
      { path: '/shop/manufacturers', element: <ManufacturerList />, loader: shopAuthLoader }, // ここに追加
      { path: '/shop/orders', element: <OrderPage />, loader: shopAuthLoader }, // ここに追加
      { path: '/shop/manufacturers/:name', element: <ManufacturerDetails />, loader: shopAuthLoader },
      { path: '/shop/orders/:productName', element: <OrderCompanyPage />, loader: shopAuthLoader },
      { path: '/shop/login', element: <ShopLoginPage /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
