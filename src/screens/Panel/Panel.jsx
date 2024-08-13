import { Outlet } from "react-router-dom";
import Layout from "../../Layout/Layout";

function Panel() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default Panel;
