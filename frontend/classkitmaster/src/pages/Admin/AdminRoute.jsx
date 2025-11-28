import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../../components/context/userAdmin";

const AdminRoute = () => {
  const { admin, loading } = useAdmin();
  const isAdmin = !!admin;

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/login" />;

  return <Outlet />;
};

export default AdminRoute;
