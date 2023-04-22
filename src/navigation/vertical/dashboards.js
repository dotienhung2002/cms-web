import { Home, Circle, FileText, ShoppingBag } from "react-feather";

export default [
  {
    id: "statistical",
    title: "Thống kê",
    icon: <Home size={20} />,
    badge: "light-warning",
    roles: ["1"],
    navLink: "/dashboard/statistical",
  },
  {
    id: "invoice",
    title: "Đơn hàng",
    icon: <FileText size={20} />,
    navLink: "/cms/invoice",
    roles: ["1", "0"],

    children: [
      {
        id: "list",
        title: "Danh sách",
        icon: <Circle size={12} />,
        navLink: "/cms/invoice/list",
        roles: ["1", "0"],
      },
    ],
  },
  {
    id: "product",
    title: "Sản phẩm",
    icon: <ShoppingBag size={20} />,
    navLink: "/cms/product/list",
    roles: ["1", "0"],

    children: [
      {
        id: "list",
        title: "Danh sách",
        icon: <Circle size={12} />,
        navLink: "/cms/product/list",
        roles: ["1", "0"],
      },
      {
        id: "add",
        title: "Thêm",
        icon: <Circle size={12} />,
        navLink: "/cms/product/add",
        roles: ["1", "0"],
      },
    ],
  },
];
