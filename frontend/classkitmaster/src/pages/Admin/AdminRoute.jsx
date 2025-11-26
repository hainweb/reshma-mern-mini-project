import { Navigate } from "react-router-dom";
import { useAdmin } from "../../components/context/AdminContext";

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAdmin();

  if (loading) return <p>Loading...</p>;

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default AdminRoute;
