import { createBrowserRouter, Navigate, Outlet, RouterProvider, useParams } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Blogs } from './pages/Blogs'
import { InsightArticle } from './pages/InsightArticle'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Careers } from './pages/Careers'
import { Technology } from './pages/Technology'
import { ProtectedRoute } from './admin/components/ProtectedRoute'
import { AdminLayout } from './admin/layouts/AdminLayout'
import { AdminLogin } from './admin/pages/AdminLogin'
import { AdminDashboard } from './admin/pages/AdminDashboard'
import { AdminBlogs } from './admin/pages/AdminBlogs'
import { AdminEditor } from './admin/pages/AdminEditor'
import { AdminPreview } from './admin/pages/AdminPreview'
import { AdminMedia } from './admin/pages/AdminMedia'
import { AdminSettings } from './admin/pages/AdminSettings'

function InsightsSlugRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/blogs/${slug}`} replace />
}

function Root() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </AuthProvider>
  )
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/admin/login', element: <AdminLogin /> },
      {
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'blogs', element: <AdminBlogs /> },
          { path: 'blogs/new', element: <AdminEditor /> },
          { path: 'blogs/edit/:id', element: <AdminEditor /> },
          { path: 'blogs/preview/:id', element: <AdminPreview /> },
          { path: 'media', element: <AdminMedia /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },
      {
        element: <Layout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/products', element: <Products /> },
          { path: '/products/:slug', element: <ProductDetail /> },
          { path: '/about', element: <About /> },
          { path: '/careers', element: <Careers /> },
          { path: '/technology', element: <Technology /> },
          { path: '/blogs', element: <Blogs /> },
          { path: '/blogs/:slug', element: <InsightArticle /> },
          { path: '/insights', element: <Navigate to="/blogs" replace /> },
          { path: '/insights/:slug', element: <InsightsSlugRedirect /> },
          { path: '/contact', element: <Contact /> },
          { path: '/systems', element: <Navigate to="/products" replace /> },
          { path: '/capabilities', element: <Navigate to="/products" replace /> },
          { path: '/process', element: <Navigate to="/technology" replace /> },
          { path: '/services', element: <Navigate to="/products" replace /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
], { basename })

export default function App() {
  return <RouterProvider router={router} />
}
