

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Table from "layouts/table"

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Таблица",
    key: "table",
    icon: <Icon fontSize="small">table</Icon>,
    route: "/table",
    component: <Table />,
  },
  {
    type: "collapse",
    name: "Рандомная шняга",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  }
];

export default routes;
