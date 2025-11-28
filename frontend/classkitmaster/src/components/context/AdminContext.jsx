import { createContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")) || null);
  const [loading, setLoading] = useState(false);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, loading, setLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
