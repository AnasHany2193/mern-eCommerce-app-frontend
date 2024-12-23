import {
  BadgeCheck,
  ShoppingBasket,
  LayoutDashboard,
  Shirt,
  CloudLightning,
  Baby,
  Watch,
  Umbrella,
  WashingMachine,
  Airplay,
  Images,
  Heater,
} from "lucide-react";

export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const adminMenuItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "products",
    icon: ShoppingBasket,
  },
  {
    title: "Orders",
    url: "orders",
    icon: BadgeCheck,
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
    placeholder: "Select category",
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi's", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
    placeholder: "Select brand",
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock quantity",
  },
];

export const shoppingMenuItems = [
  { id: "home", label: "Home", path: "/shopping/home" },
  { id: "products", label: "Products", path: "/shopping/listing" },
  { id: "men", label: "Men", path: "/shopping/listing" },
  { id: "women", label: "Women", path: "/shopping/listing" },
  { id: "kids", label: "Kids", path: "/shopping/listing" },
  { id: "footwear", label: "Footwear", path: "/shopping/listing" },
  { id: "accessories", label: "Accessories", path: "/shopping/listing" },
  { id: "search", label: "Search", path: "/shopping/search" },
];

export const filterOptions = {
  Category: [
    { id: "men", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: Baby },
    { id: "accessories", label: "Accessories", icon: Watch },
    { id: "footwear", label: "Footwear", icon: Umbrella },
  ],
  Brand: [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "PinCode",
    name: "pinCode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pinCode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Note",
    name: "note",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const orderStatusFormControls = [
  {
    label: "Order Status",
    name: "status",
    componentType: "select",
    options: [
      { id: "inProcess", label: "In Process" },
      { id: "inShipping", label: "In Shipping" },
      { id: "cancelled", label: "Cancelled" },
      { id: "pending", label: "Pending" },
      { id: "delivered", label: "Delivered" },
    ],
    placeholder: "Select Order Status",
  },
];

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "long", // 'Monday'
    year: "numeric", // '2024'
    month: "long", // 'December'
    day: "numeric", // '19'
    hour: "2-digit", // '03'
    minute: "2-digit", // '00'
    second: "2-digit", // '30'
  });
};

export const getBadgeClass = (status) => {
  const statusClassMap = {
    inProcess: "bg-yellow-500",
    inShipping: "bg-blue-500",
    cancelled: "bg-red-500",
    pending: "bg-gray-500",
    delivered: "bg-green-500",
  };

  return "px-3 py-1 rounded-full", statusClassMap[status] || "bg-black";
};
