import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/Login'
import ProductListPage from './pages/ProductList'
import ProductPage from './pages/Product'
import AuthenticatedLayout from './components/layouts/authenticated'
import { useAuth } from './contexts/AuthContext'

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const AuthenticatedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? element : <Navigate to="/products" />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoute element={<LoginPage />} />,
    },
    {
      path: "/products",
      element: (
        <ProtectedRoute element={<AuthenticatedLayout />} />
      ),
      children: [
        {
          path: "",
          element: <ProductListPage />,
        },
        {
          path: "product-view/:productId",
          element: <ProductPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
