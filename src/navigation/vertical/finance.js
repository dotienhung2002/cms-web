import { AlignLeft, Circle, FileText, Package,Gift } from "react-feather";

export default [
  {
    header: "Bán hàng",
  },

  {
    id: "promotion",
    title: "Khuyến mại",
    icon: <Package size={20} />,
    roles: ["1"],

    children: [
      {
        id: "promotion-product",
        title: "Sản phẩm",
        icon: <AlignLeft size={12} />,
        navLink: "/cms/promotion/product",
        roles: ["1"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/promotion/product/list",
            roles: ["1"],
          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/promotion/product/add",
            roles: ["1"],
          },
        ],
      },
      {
        id: "promotion-category",
        title: "Loại sản phẩm",
        icon: <AlignLeft size={12} />,
        navLink: "/cms/promotion/category",
        roles: ["1"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/promotion/category/list",
            roles: ["1"],
          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/promotion/category/add",
            roles: ["1"],
          },
        ],
      },
    ],
  },
  {
    id: "voucher",
    title: "Phiếu giảm giá",
    icon: <Gift size={20} />,
    navLink: "/cms/voucher",
    roles: ["1"],

    children: [
      {
        id: "list",
        title: "Danh sách",
        icon: <Circle size={12} />,
        navLink: "/cms/voucher/list",
        roles: ["1"],
      },
      {
        id: "add",
        title: "Thêm",
        icon: <Circle size={12} />,
        navLink: "/cms/voucher/add",
        roles: ["1"],
      },
    ],
   
  },
];
