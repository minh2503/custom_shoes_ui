import ScrollToTop from '@/hooks/scroll-to-top';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
const SystemLayout = lazy(() => import('@/components/layout/layout'));
const HomePage = lazy(() => import('@/pages/Home/index'));
const ShopPage = lazy(() => import('@/pages/ShopPage/index'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail/index'));
const CheckOutPay = lazy(() => import('@/pages/Checkout/Pay/index'));
const CartPage = lazy(() => import('@/pages/CartPage/index'));
const CustomizePage = lazy(() => import('@/pages/Customize/index'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/index'));
const LoginPage = lazy(() => import('@/pages/AuthPage/Login/index'));
const RegisterPage = lazy(() => import('@/pages/AuthPage/Register/index'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const systemRoute = [
    {
      path: '/',
      element: (
        <SystemLayout>
          <Suspense>
            <ScrollToTop />
            <Outlet />
          </Suspense>
        </SystemLayout>
      ),
      children: [
        {
          element: <HomePage />,
          index: true
        },
        {
          path: '/shop',
          element: <ShopPage />
        },
        {
          path: '/product/:id',
          element: (
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          )
        },
        {
          path: '/checkout-pay/:orderId',
          element: (
            <ProtectedRoute>
              <CheckOutPay />
            </ProtectedRoute>
          )
        },
        {
          path: '/cart',
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          )
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/register',
          element: <RegisterPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '/customize/:productId/:id',
      element: <CustomizePage />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...systemRoute, ...publicRoutes]);

  return routes;
}
