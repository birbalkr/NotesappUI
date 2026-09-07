import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import LoginForm from '../components/auth/LoginForm'
import ForgotPage from '../components/auth/ForgotPage'
import MainpageLayout from '../layout/MainpageLayout'
import AppPageLayout from '../layout/AppPageLayout'
import NotesPage from '../notes/page/NotesPage'
import ProtectedRoute from './ProtectedRoute'
import RegisterForm from '../components/auth/RegisterForm'


const AuthRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth/login" replace />,
    },
    {
        path: '/auth',
        element: <MainpageLayout />,
        children: [
            {
                path: 'login',
                element: <LoginForm />
            },
            {
                path: 'register',
                element: <RegisterForm />
            },
            {
                path: 'forgot',
                element: <ForgotPage />
            },
        ]
    },
    {
        path: "/notes",
        element: <ProtectedRoute element={<AppPageLayout />} />,
        children: [
            {
                path: "",
                element:<NotesPage/>
            }
        ]
    },

])

function AuthRoutesApp() {
    return <RouterProvider router={AuthRoutes} />;
}
export default AuthRoutesApp;