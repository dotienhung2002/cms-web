import { Circle, Users } from "react-feather";

export default [
  {
    header: "Tài khoản",
  },
  {
    id: "employee",
    title: "Nhân viên",
    icon: <Users size={20} />,
    navLink: "/cms/employee",
    roles: ["1"],
    children: [
      {
        id: "list",
        title: "Danh sách",
        icon: <Circle size={12} />,
        navLink: "/cms/employee/list",
    roles: ["1"],

      },
      {
        id: "add",
        title: "Thêm",
        icon: <Circle size={12} />,
        navLink: "/cms/employee/add",
    roles: ["1"],

      },
    ],
  },
  {
    id: "customer",
    title: "Khách hàng",
    icon: <Users size={20} />,
    roles: ["0","1"],

    children: [
      {
        id: "list",
        title: "Danh sách",
        icon: <Circle size={12} />,
        navLink: "/cms/customer/list",
    roles: ["0","1"],

      },
    ],
  },
];
