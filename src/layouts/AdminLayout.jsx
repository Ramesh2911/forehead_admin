import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
