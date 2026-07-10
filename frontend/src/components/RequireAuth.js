import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth';

// adminOnly=true e ndalon edhe perdoruesin e kycur qe nuk eshte admin.
// Kjo eshte vetem per UI-ne; kufizimi i vertete behet ne backend (requireAdmin).
export default function RequireAuth({ adminOnly = false, children }) {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
