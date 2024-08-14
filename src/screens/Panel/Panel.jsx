import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar/Sidebar";

function Panel() {
  return (
    <div className=" flex items-start justify-between h-[100vh] bg-gray-300">
      <Sidebar />
      <div className="w-3/4 h-[100vh] pt-10 pl-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Panel;
