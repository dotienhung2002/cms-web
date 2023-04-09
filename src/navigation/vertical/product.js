import { AlignLeft, Circle, Grid, List, ShoppingBag } from "react-feather";

export default [
  {
    header: "Sản phẩm",
  },
  {
    id: "classify-product",
    title: "Danh mục sản phẩm",
    icon: <List size={20} />,
    roles: ["1"],

    children: [
      {
        id: "product-set",
        title: "Tập sản phẩm",
        icon: <AlignLeft size={12} />,
        navLink: "/cms/classify/product-set/list",
        roles: ["1"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/classify/product-set/list",
            roles: ["1"],
          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/classify/product-set/add",
            roles: ["1"],
          },
        ],
      },
      {
        id: "brand",
        title: "Thương hiệu",
        icon: <AlignLeft size={12} />,
        navLink: "/cms/classify/brand/list",
        roles: ["1"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/classify/brand/list",
            roles: ["1"],
          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/classify/brand/add",
            roles: ["1"],
          },
        ],
      },

      {
        id: "category",
        title: "Loại sản phẩm",
        icon: <AlignLeft size={12} />,
        navLink: "/cms/classify/category/list",
    roles: ["1"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/classify/category/list",
    roles: ["1"],

          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/classify/category/add",
    roles: ["1"],

          },
        ],
      },
    ],
  },
  {
    id: "property-product",
    title: "Thuộc tính sản phẩm",
    icon: <Grid size={20} />,
    navLink: "/cms/property/made-in/list",
    roles: ["1","0"],

    children: [
      {
        id: "madein",
        title: "Xuất xứ",
        icon: <AlignLeft size={12} />,
    roles: ["1","0"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/property/made-in/list",
    roles: ["1","0"],

          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/property/made-in/add",
    roles: ["1","0"],

          },
        ],
      },

      {
        id: "size",
        title: "Kích thước",
        icon: <AlignLeft size={12} />,
    roles: ["1","0"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/property/size/list",
            roles: ["1","0"],

          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/property/size/add",
    roles: ["1","0"],

          },
        ],
      },

      {
        id: "color",
        title: "Màu sắc",
        icon: <AlignLeft size={12} />,
    roles: ["1","0"],

        children: [
          {
            id: "list",
            title: "Danh sách",
            icon: <Circle size={12} />,
            navLink: "/cms/property/color/list",
    roles: ["1","0"],

          },
          {
            id: "add",
            title: "Thêm",
            icon: <Circle size={12} />,
            navLink: "/cms/property/color/add",
    roles: ["1","0"],

          },
        ],
      },
    ],
  },
 
];
