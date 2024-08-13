import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";

function Panel() {
  return (
    <div className=" flex items-start justify-between h-[100vh]">
      <Sidebar />
      <div className="w-3/4 my-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Panel;
