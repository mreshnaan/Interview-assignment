import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth-check';
interface AuthenticatedRouteProps {
    children: React.ReactNode;
    redirectPath?: string;
}

const AuthenticatedRoute : React.FC<AuthenticatedRouteProps> = ({ children }) => {
    if (isAuthenticated()) {
        return <Navigate to="/products" replace />; 
    }

    return <>{children}</>;
};

export default AuthenticatedRoute;
