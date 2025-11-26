import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../../components/context/AdminContext";

const AdminRoute = () => {
  const { isAdmin, loading } = useAdmin();

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <Navigate to="/login" />; // redirect if not admin

  return <Outlet />; // render nested routes if admin
};

export default AdminRoute;
